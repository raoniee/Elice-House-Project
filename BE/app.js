import express from 'express';
// import "dotenv/config"
import dotenv from "dotenv";
import { userRouter } from "./routers";

dotenv.config();

const app = express();
const port = process.env.PORT;

// 프론트에서 json 파일을 보내면, req.body에 자동으로 객체 형태로 데이터가 들어가도록 함.
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use('/api', userRouter);