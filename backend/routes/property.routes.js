// backend/routes/property.routes.js
import express from "express";
import {
    getAll,
    getById,
    create,
    update,
    remove
} from "../controllers/property.controller.js";

const router = express.Router();

// CRUD
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;

