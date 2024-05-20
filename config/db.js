import mongoose from "mongoose";
import colors from 'colors'

//Replace your MONGO_URL 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(
            `Conneted To Mongodb Databse ${mongoose.connection.host}`.bgMagenta.white
        );
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};
export default connectDB;