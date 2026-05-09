import jwt from "jsonwebtoken";
import { ENV } from "./env.js";
// generateToken(savedUser._id, res); - Ovo ide posle signupa odma
//savedUser je user koji je dodat u bazu nakon username emaila i enkripcije sifre.
export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting JavaScript NE može da pročita token
    sameSite: "strict", // CSRF attacks browser neće slati cookie sa drugih sajtova
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};

// http://localhost
// https://dsmakmk.com

/* 
trenutak kada user dobija token.
jwt.sign({ userId }, JWT_SECRET) pravi digitalno “potpisanu karticu identiteta”

*/
