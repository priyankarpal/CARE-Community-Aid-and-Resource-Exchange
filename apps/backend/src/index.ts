import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config/config";
import corsOptions from "./lib/corsConfig";
import limiter from "./lib/rateLimitConfig";
import CheckError from "./lib/checkError";
import errorHandler from "./middleware/errorMiddleware";
import authRoutes from "./routes/authRouter";

const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(config.DEV_ENV === "PROD" ? cors(corsOptions) : cors());
app.use(limiter);

app.use("/api/v0.1/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`[⚡] Server Is Running on http://localhost:${config.PORT}`);
});
