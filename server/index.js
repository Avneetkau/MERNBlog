<<<<<<< HEAD
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();
const app=express();
app.use(cors());
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended:true}));
app.use('/',Router);

const PORT=8000;





app.listen(PORT, () => console.log(`Server is listening on port number ${PORT}`));
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);
=======
/*import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import blogRoutes from "./routes/route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

const PORT = process.env.PORT || 3000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Database Connection
Connection(USERNAME, PASSWORD);

// API Routes
app.use("/api", blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/
import express from "express";
import cors from "cors";

import Connection from "./database/db.js"; //database connection
import dotenv from "dotenv"; //for using .env file
import userRoutes from "./routes/usersRoute.js"; //route for user
import authRoutes from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from './routes/commentRoute.js';
import emailRoute from './routes/emailRoute.js';
import cookieParser from "cookie-parser";




const app=express();

app.use(express.json());
app.use(cookieParser());


dotenv.config();

app.use(cors());



const port=3000;

 
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
>>>>>>> master
