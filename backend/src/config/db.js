// src/config/db.js
import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connect succesfull");
    } catch(error){
        console.error("MongoDB failed connection");
        process.exit(1);
    }
};

export default connectDB;