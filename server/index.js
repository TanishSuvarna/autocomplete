import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from "morgan";
import autoRouter from "./routes/autocomplete.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
dotenv.config();
app.use(autoRouter);
app.listen(process.env.PORT || 5000 , console.log("Listening"));