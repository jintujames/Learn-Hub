import express from "express";
import dbConnect from "../Connection/connection";
import 'dotenv/config'
import { adminRouter } from "./Routes/adminRouter/adminRouter";
import { studentRouter } from "./Routes/studentRouter/studentRouter";
import env from "dotenv";
import session, { SessionOptions,MemoryStore,SessionData } from "express-session";
import cors from "cors"
import path from "path";
import tutorRouter from "./Routes/tutorRouter/tutorRouter";
import morgan from "morgan"
env.config()
 

const app = express();
const port: number = Number(process.env.PORT);

const store = new MemoryStore();
declare module 'express-session' {
  
  interface Session {
   snotp:number,
   userEmail:string | undefined
  } 
  
   
}
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 60 * 1000,
      
    },
    store: store,
  } as SessionOptions)
);

app.use(express.static(path.join(__dirname, "./public/images")));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)
 
app.use("/api/v1/student",studentRouter)
app.use("/api/v1/tutor", tutorRouter);
app.use("/api/v1/admin", adminRouter);
dbConnect.connect()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });