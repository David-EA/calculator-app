import dotenv from "dotenv";
import express from "express";
import { logger } from "./utils/logger.js";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import calculatorRoutes from "./routes/calculator.route.js";


dotenv.config();

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 8000;

app.use("/", calculatorRoutes)


  app.listen(PORT, () => {
    connectDB();
    logger.info(`🚀 Server running at http://localhost:${PORT}`);
  });

