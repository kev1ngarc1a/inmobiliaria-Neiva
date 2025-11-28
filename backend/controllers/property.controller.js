// backend/controllers/property.controller.js
import Property from "../models/Property.js";

// Obtener todas
export const getAll = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo propiedades", error });
    }
};

// Obtener una por ID
export const getById = async (req, res) => {
    try {
        const prop = await Property.findById(req.params.id);
        if (!prop) return res.status(404).json({ message: "No encontrada" });
        res.json(prop);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo propiedad", error });
    }
};

// Crear propiedad
export const create = async (req, res) => {
    try {
        const newProp = new Property(req.body);
        await newProp.save();
        res.status(201).json(newProp);
    } catch (error) {
        res.status(500).json({ message: "Error creando propiedad", error });
    }
};

// Editar propiedad
export const update = async (req, res) => {
    try {
        const updated = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error actualizando propiedad", error });
    }
};

// Eliminar propiedad
export const remove = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: "Propiedad eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando propiedad", error });
    }
};

