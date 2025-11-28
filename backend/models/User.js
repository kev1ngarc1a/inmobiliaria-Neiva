import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    phone:    { type: String },
    rol:      { type: String, default: "usuario" },
    password: { type: String, required: true }
});

export default mongoose.model("User", userSchema);