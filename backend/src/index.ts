import express from "express";
import "dotenv/config";
import { connectToDatabase } from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import captainRouter from "./routes/captain.routes";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userRouter);
app.use("/api/v1/captain", captainRouter);

app.listen(port, async () => {
    await connectToDatabase();
    console.log(`server listening at ${port}`);
});
