import { mongoose } from "mongoose";
import "dotenv/config";

const { MONGO_USER, MONGO_PASS } = process.env;

// const DB_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.sbibyre.mongodb.net/`;
const DB_URL = `mongodb+srv://seongkwan:123@simple-board-cluster.2uuyh4s.mongodb.net/
`;

mongoose.connect(DB_URL);

// const db = mongoose.connection;

mongoose.connection.on("open", () => console.log("☑️  Connected to DB"));
mongoose.connection.on("error", (error) => console.log("❌  DB Error", error));
