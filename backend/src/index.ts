import express, { Request, Response } from "express";
import "dotenv/config";
import { connectToDatabase } from "./config/db";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("hey......");
});

app.listen(port, async () => {
    await connectToDatabase();
    console.log(`server listening at ${port}`);
});
