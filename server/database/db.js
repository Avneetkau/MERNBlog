/*import mongoose from "mongoose";

const Connection = async (USERNAME, PASSWORD) => {
    const URL =` mongodb+srv://${USERNAME}:${PASSWORD}@mern-blog.i6rur.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog`;
    
    try {
        await mongoose.connect(URL);
        console.log("Database is connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default Connection;*/
import mongoose from "mongoose";
  const Connection = async (USERNAME,PASSWORD) => {
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@mern-blog.i6rur.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog`
    try{
        await mongoose.connect(URL);
        console.log("Database is connected");
    } catch(error){
        console.log("Error while connecting." ,error);
    }
 }
 export default Connection;