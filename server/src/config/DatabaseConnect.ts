

import mongoose from "mongoose";


const connectDB = async() =>{
    try{
    await mongoose.connect(process.env.DB_URL as string);
    console.log("connected with db")
    }catch(err:unknown){
         if(err instanceof Error){
             console.log(err.message);
         }

    }
   

}

export default connectDB
