import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import validator from "validator";
import { Prisma, PrismaClient } from "@prisma/client";
import { sendEmail } from "../lib/emailService";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { createToken } from "../lib/tokenConfig";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields must be filled" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is not valid" });
  }
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: { name, email, password: hash, phone },
      });

      const token = createToken(newUser.id);
      return { user: newUser, token };
    });
    await sendEmail(user.user.id);
    return res
      .status(200)
      .json({ success: true, message: "Verification email sent" });
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: error.message, success: false });
    } else {
      return res
        .status(500)
        .json({ message: "Registration failed.", success: false });
    }
  }
};
