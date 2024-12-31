import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("hey......");
});

app.listen(8000, () => {
    console.log("listening...");
});
