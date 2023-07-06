import express from "express";
// import "dotenv/config"
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./src/routers/user-router.js";

// dotenv.config();

const app = express();

// 프론트에서 json 파일을 보내면, req.body에 자동으로 객체 형태로 데이터가 들어가도록 함.
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);

export { app };
