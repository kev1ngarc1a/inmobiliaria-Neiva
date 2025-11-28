import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(">>> DB conectada correctamente");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error.message);
    }
};

export default connectDB;
