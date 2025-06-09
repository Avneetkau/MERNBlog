
/*import mongoose from "mongoose";
  const Connection = async (username,password) => {

    const URL=`mongodb://${username}:${password}.@ac-6tjvjly-shard-00-00.hmzqrho.mongodb.net:27017,ac-6tjvjly-shard-00-01.hmzqrho.mongodb.net:27017,ac-6tjvjly-shard-00-02.hmzqrho.mongodb.net:27017/?ssl=true&replicaSet=atlas-10mzfm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`
    try{
        await mongoose.createConnection(URL,{ useNewUrlParser: true});
        console.log("Database successfully connected");
    } catch(error){
        console.log("Database failed to connect...",error);
    }
};
export default Connection;
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
    //const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@mern-blog.i6rur.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog`
     //const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@mern-blog.i6rur.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog`
     const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@mern-blog.i6rur.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog`
    try{
        await mongoose.connect(URL);
        console.log("Database is connected");
    } catch(error){
        console.log("Error while connecting." ,error);
    }
 }
 export default Connection;

