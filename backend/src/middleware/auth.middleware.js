import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //Uzima JWT TOken iz cookia
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET); //proverava da li je token validan, da li je istekao
    //jwt.sign({ userId }, secret) ovako je token napravljen. Na user Id se ubacuje token - payload
    // Token sadrzi id ali ne kao obican JSON vec enkriptovan
    // secret sluzi da se token ne moze promeniti od strane hackera ili nekog drugog

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findById(decoded.userId).select("-password"); // trazi korisinika u bazi , token mozda postoji ali je user obrisan
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; //!!!! middleware dodaje usera u request objekat
    //sad svaki controller ima pristup
    next(); //sve je ok idi na sledecu funkciju - bez ovoga stabio bi na protectRoute i ne bi isao na update Profile
    //router.put("/update-profile", protectRoute, updateProfile); - next samo nastavlja do update profile.
  } catch (error) {
    console.log("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* 
1. Iz cookia izvlacimo token.
2. jwt.verify uzima id od tog tokena zbog jwt.sign({ userId }, secret) , ovako je token napravljen
3. preko findById proveravamo da li taj user postoji u bazi , posto moze biti obrisan a token da vazi
4. req.user - stavio sam loginovanog usera u req, sada controlleru mogu da radi req.body
protectRoute pozivaš na svim rutama koje sme da koristi samo loginovan korisnik 🔐

Middleware:
uzme token
verify token
izvuče userId
nađe usera u bazi
ubaci usera u req.user

Token već sadrži userId, verify() ga izvlači i proverava validnost tokena, zatim se preko tog
 userId pronalazi korisnik u bazi i stavlja u req.user kako bi controlleri imali pristup loginovanom korisniku.
*/
