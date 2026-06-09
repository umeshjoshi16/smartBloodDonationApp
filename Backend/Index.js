import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './Config/db.js';
import routes from './Routes/userRoutes.js'

dotenv.config();
const app=express();

app.use(
  cors({
    origin: "http://192.168.100.11:6500",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());


connectDB();

app.use("/api/auth",routes);


app.get("/", (req, res) => {
  res.send("Server Working");
});
app.listen(process.env.PORT,()=>{
  console.log('Server is running!!!')
})