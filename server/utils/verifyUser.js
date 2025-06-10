import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
// to get cookie we need to install a package named as cookie parser in backend as npm i cookie-parser and initialize it in index.js
export const verifyToken = (req,res,next) => {
   console.log("Cookies:", req.cookies);  // <-- check cookies received
   const token = req.cookies.access_token; 

   if(!token){
    console.log("No access token cookie found");
    return next(errorHandler(401, 'unauthorized'));
   }
   jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
    if(err){
        console.log("Token verification failed:", err.message);
        return next(errorHandler(401, 'unauthorized'));
    }
    
    console.log("Verified user:", user);
    req.user = user;
   
    next();
   } );
};
