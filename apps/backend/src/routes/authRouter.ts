import express, { Router } from "express";
import { register , verifyEmail , login} from "../controllers/authController";
const router: Router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify-email/:userId", verifyEmail);
export default router;


