import mongoose from "mongoose";
export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://shubshukla2332:Shubham123@cluster0.oa8b5xh.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}