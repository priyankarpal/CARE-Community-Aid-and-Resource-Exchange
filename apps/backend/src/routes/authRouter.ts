import express, { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  verifyOTP,
} from "../controllers/authController";
const router: Router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify-email/:userId", verifyEmail);
router.get("/verify-otp/:userId", verifyOTP);
export default router;
