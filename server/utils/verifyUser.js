import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
// to get cookie we need to install a package named as cookie parser in backend as npm i cookie-parser and initialize it in index.js
export const verifyToken = (req,res,next) => {
   const token = req.cookies.access_token; // we have used access_token as a cookie name in authController.js

   if(!token){
    return next(errorHandler(401, 'unauthorized'));
   }
   jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
    if(err){
        return next(errorHandler(401, 'unauthorized'));
    }
    
    req.user = user;
   
    next();// In our case next goes to updateUser function

   } );
};

