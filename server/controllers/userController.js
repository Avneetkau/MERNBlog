/*import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import  User  from "../models/User.js";

export const test = (req,res) => {
   res.json({ message :'API is Working'});
};

// For updating data in profile section

export const updateUser = async (req,res,next) => {
  console.log(req.user);
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403,'You are not allowed to update this user'));
    
  }
  

  if(req.body.password){
    if(req.body.password.length < 6){
      return next(errorHandler(400, 'Password must not be less than 6 characters'));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length > 20){
      return next(errorHandler(400, 'Username must be between 7 to 20 characters'));
    }
    if(req.body.username.includes(' ')){
      return next(errorHandler(400, 'Username cannot have spaces in it'));
    }
    if(req.body.username !== req.body.username.toLowerCase()){
      return next(errorHandler(400,'Username must be lowercase'));
    }
    if(!req.body.username.match(/^[a-zA-z0-9]+$/)){
      return next(errorHandler(400,'Username can only contain letters and numbers'));
    
  }
  };

    try{
     const updateUser = await User.findByIdAndUpdate( req.params.userId,{
      $set:{// Here, we are only sending few information otherwise user can send many information or make themself an admin
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        profilePicture : req.body.profilePicture,
      },
     },{ new : true }
    );
    const { password , ...rest} = updateUser._doc;
    res.status(200).json(rest);
    } catch(error){
      next(errorHandler(500, 'Internal Server Error'));
    }
  

};


//For deleting account
 export const deleteUser = async ( req, res, next) => {
   
  if(!req.user.isAdmin && req.user.id !== req.params.userId){
    return next(errorHandler('You are not allowed to delete account')); 
  }
  console.log("req.cookies:", req.cookies);
  console.log("req.user:", req.user);
  console.log("req.params.userId:", req.params.userId);
  try{
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  }catch(error){
    next(error);
  }
 };

 //For Sign out
 export const signOut =( req, res, next) => {
      try{
        res.clearCookie( 'access_token');
        res.status(200).json(' User has been SignOut');
      }
      catch(error){
        next(error);
      }
 };

 //For showing users to Admin
 export const getUsers =async ( req,res,next) => {
      if (!req.user.isAdmin){
        return next(errorHandler( 403, 'You are not allowed to see all the users'));
      }
       try{
        const  startIndex= parseInt(req.query.startIndex) || 0;
        const limit =  parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1 ;

        const users = await  User.find()
           .sort({ createdAt : sortDirection })
           .skip(startIndex)
           .limit(limit);

           const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
           });

           const totalUsers = await User.countDocuments();

           const now = new Date();

           const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
           );

           const lastMonthUsers = await User.countDocuments({
            createdAt : {  $gte : oneMonthAgo },
           });

           res.status(200).json(
            {
              users : usersWithoutPassword,
              totalUsers,
              lastMonthUsers,
            }
           );


       } catch(error){
        next(error);
       }
 };

 //For comment based on userId
 export const getUser = async ( req, res, next )=>{
    try{
      const user = await User.findById(req.params.userId);
      if (!user){
        return next(errorHandler(404, 'User not found'));
      }
      const {password,...rest} = user._doc;
      res.status(200).json(rest);
    }
    catch(error){
      next(error);
    }
 };