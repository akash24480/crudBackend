import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoutes.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;
mongoose
  .connect(URL)
  .then((response) => {
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} : Unable to Connect to the Database`);
  });

app.use("/apis", route);
