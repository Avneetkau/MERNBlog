import dotenv from "dotenv"; //for using .env file
dotenv.config();
import express from "express";
import cors from "cors";

import Connection from "./database/db.js"; //database connection

import userRoutes from "./routes/usersRoute.js"; //route for user
import authRoutes from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from './routes/commentRoute.js';
import emailRoute from './routes/emailRoute.js';
import cookieParser from "cookie-parser";





const app=express();

app.use(express.json());
app.use(cookieParser());


const allowedOrigins = ['http://localhost:5173', 'https://mern-blog-pq4q.vercel.app/'];
app.use(cors({ origin : allowedOrigins, credentials : true}));



const port=3000;

 app.get("/",(req,res) => {
    res.send("API is working");
 })
app.listen( port , () => {
    console.log(`Server is running on ${port}`);
});
app.use('/api/user' ,  userRoutes );
app.use('/api/auth' , authRoutes );

app.use('/api/post', postRoute);

app.use('/api/comment',commentRoute);

app.use('/api/email',emailRoute);


const USERNAME=process.env.DB_USERNAME;
const PASSWORD =process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);



//Middleware to handle error
app.use (( err, req, res, next ) => {
    const statusCode = err.statusCode || 500 ;
    const message =err.message || 'Internal Server error';
    res.status(statusCode).json({
        success :false,
        statusCode,
        message,
    });
});
