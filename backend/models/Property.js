// backend/models/Property.js
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        price: Number,
        location: String,
        category: String,
        type: String,
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        // Nombre del archivo de imagen guardado
        image: { type: String, default: "" }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Property", PropertySchema);
