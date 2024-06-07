import express, { Router } from "express";
import { register , verifyEmail } from "../controllers/authController";
const router: Router = express.Router();

router.post("/register", register);
router.get("/verify-email/:userId", verifyEmail);
export default router;


