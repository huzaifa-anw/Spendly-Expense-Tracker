import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to databse successfully`);
    } catch (e) {
        console.log(`Error connecting to Database `, e);
        process.exit(1);
    }
}

export default connectDB;