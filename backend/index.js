// index.js
import express from "express";
import connectDB from "./database.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";

dotenv.config();
const app = express();

// Necesario para usar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Ruta para servir imágenes subidas
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api", authRoutes);
app.use("/api/properties", propertyRoutes);

// Servidor
app.listen(process.env.PORT || 4000, () => {
    console.log("Servidor corriendo en puerto", process.env.PORT || 4000);
});
