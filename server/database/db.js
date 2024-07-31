import mongoose from "mongoose";
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
