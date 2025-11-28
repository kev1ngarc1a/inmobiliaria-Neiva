import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  getMine
} from "../controllers/property.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// RUTAS PÚBLICAS
router.get("/", getAll);

// RUTA PROTEGIDA PERSONAL 
router.get("/mine", authMiddleware, getMine);

// RUTA POR ID 
router.get("/:id", getById);

//  CREAR PROPIEDAD CON IMÁGENES
router.post(
  "/",
  authMiddleware,
  upload.array("images", 6),
  create
);

//  EDITAR PROPIEDAD CON IMÁGENES
router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 5),
  update
);

//  ELIMINAR PROPIEDAD
router.delete("/:id", authMiddleware, remove);

export default router;
