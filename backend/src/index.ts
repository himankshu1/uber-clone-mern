import express, { Request, Response } from "express";
import "dotenv/config";
import { connectToDatabase } from "./config/db";
import cors from "cors";
import userRouter from "./routes/user.route";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.listen(port, async () => {
    await connectToDatabase();
    console.log(`server listening at ${port}`);
});
