import { mongoose } from "mongoose";
import "dotenv/config";
import { app } from "../app.js";

const { PORT, DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => console.log("☑️  Connected to DB"));
db.on("error", (error) => console.log("❌  DB Error", error));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
