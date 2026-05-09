import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection); // glabalni middle ware
// sve ispod ovog mora da prodje ovaj uslov.

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get(
  "/check",
  protectRoute,
  (
    req,
    res, //react nakon refresha izgubi state , ali browser jos ima cookie, front end
  ) =>
    // pita da li ovaj cookie pripada validnom korisniku?
    res.status(200).json(req.user),
);

export default router;
