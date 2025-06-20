import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) => {
   
    console.log(req.body);   // For Debugging , if we want we can have it otherwise no
    const { username, password, email }=req.body;

  
   
    /*if (!username || !email || !password || username === '' || password ==='' || email === '') {
        return res.status(400).json({ message: "All fields are required" });
    }*/
        if (!username || !email || !password) {
             return next(errorHandler(400, 'All fields are required'));
        }

     const hashedPassword = bcryptjs.hashSync( password , 10 ) ;

    const newUser = new User({
       username,
       email,
       password  : hashedPassword, 
    });

    try{
        await newUser.save();
        res.json( "Signup successfull");
        
    } catch(error){
       next(error);
    }

   
}


 //For sign In
export const signin = async( req, res, next) => {
    const { email, password } = req.body;

    if ( !email || !password || email === '' || password === ''){
        next(errorHandler(400,'All fields are required'));
    }

    try{
        const validUser= await User.findOne({ email });
        if(!validUser){
            return next(errorHandler(404,'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(404,'Invalid Password'));
        }
        const token = jwt.sign({ id : validUser._id, isAdmin :validUser.isAdmin}, process.env.JWT_SECRET);

        const {password :pass, ...rest}= validUser._doc;
        res .status(200).cookie('access_token', token ,
            {
                httpOnly : true,
            }
          )
          .json(rest);

    } catch(error){
        next(error);
    }

}
//For Google FIrebase sign in
export const google = async (req, res, next) => {
  const {email, name, googlephotoUrl} = req.body;
  try{
       const user = await User.findOne({email});
       if(user){
        const token = jwt.sign({id:user._id , isAdmin : user.isAdmin}, process.env.JWT_SECRET);
        const {password, ...rest} = user._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly : true,
        }).json(rest);
       }
       else {
        const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword =bcryptjs.hashSync(generatePassword, 10);
        const newUser = new User({
            username :name.toLowerCase().split(' ').join(' ') + Math.random().toString(9).slice(-4),
            email,
            password : hashedPassword,
            profilePicture : googlephotoUrl,

        });
         await newUser.save();
         const token = jwt.sign({id:user._id , isAdmin : newUser.isAdmin}, process.env.JWT_SECRET);
        const {password,...rest} = user._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly : true,
        }).json(rest);
           }
  } catch (error){
       next(error);
  }
}

