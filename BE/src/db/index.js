import { mongoose } from "mongoose";
import "dotenv/config";
import { app } from "../../app.js";

const { PORT, MONGO_USER, MONGO_PASS } = process.env;

const DB_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.sbibyre.mongodb.net/`;
// const DB_URL = `mongodb+srv://seongkwan:123@simple-board-cluster.2uuyh4s.mongodb.net/`;

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
