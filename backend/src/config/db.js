import mongoose from 'mongoose';
export const connectDb = async () =>{
    try{
     const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully : ${connection.connection.host}`);
    }catch(err){
        console.error('Error connecting to MongoDB:', err.message);
         process.exit(1);
    }
}