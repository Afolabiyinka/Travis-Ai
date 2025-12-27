import { configDotenv } from "dotenv";
import { connectDb } from "./config/db";
import { AuthRouter } from "./routes/auth";
import cors from "cors";
import express from "express";
import { UserRouter } from "./routes/user";

configDotenv();

const port = process.env.PORT || "";
const app = express();
app.use(express.json());
app.use(cors());

//Doing the routing stuff
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

//Connection to the db
connectDb();
