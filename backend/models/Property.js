import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    price: { type: Number, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },

    type: {
      type: String,
      enum: ["arriendo", "venta"],
      default: "arriendo",
    },

    images: [
      {
        type: String, // ruta del archivo
      },
    ],

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt automáticos
  }
);

export default mongoose.model("Property", PropertySchema);
