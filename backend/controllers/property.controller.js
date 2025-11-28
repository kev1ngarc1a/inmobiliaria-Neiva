import Property from "../models/Property.js";

//  OBTENER TODAS LAS PROPIEDADES
export const getAll = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo propiedades",
      error: error.message,
    });
  }
};

//  OBTENER PROPIEDAD POR ID
export const getById = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);

    if (!prop) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    res.json(prop);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo propiedad",
      error: error.message,
    });
  }
};

//  CREAR PROPIEDAD CON MÚLTIPLES IMÁGENES
export const create = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      location,
      type = "arriendo", 
    } = req.body;

    //  Validación
    if (!title || !description || !price || !location || !category) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    //  Guardar múltiples imágenes correctamente
    const images =
      req.files && req.files.length > 0
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : [];

    const newProp = new Property({
      title,
      description,
      price,
      category,
      location,
      type,
      images,
      ownerId: req.user.id, 
    });

    await newProp.save();

    res.status(201).json(newProp);
  } catch (error) {
    console.error("❌ Error creando propiedad:", error);
    res.status(500).json({
      message: "Error creando propiedad",
      error: error.message,
    });
  }
};

//  ACTUALIZAR PROPIEDAD (SOLO SU DUEÑO)

export const update = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    //  Validar dueño
    if (property.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "No autorizado para editar esta propiedad",
      });
    }

    const images =
      req.files && req.files.length > 0
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : null;

    const updatedData = { ...req.body };

    //  Si hay nuevas imágenes, se reemplazan
    if (images) {
      updatedData.images = images;
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Error actualizando propiedad",
      error: error.message,
    });
  }
};

//  ELIMINAR PROPIEDAD (SOLO SU DUEÑO)
export const remove = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    if (property.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "No autorizado para eliminar esta propiedad",
      });
    }

    await property.deleteOne();

    res.json({ message: "Propiedad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error eliminando propiedad",
      error: error.message,
    });
  }
};

//  OBTENER SOLO LAS PROPIEDADES DEL USUARIO
export const getMine = async (req, res) => {
  try {
    const myProps = await Property.find({
      ownerId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(myProps);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo tus propiedades",
      error: error.message,
    });
  }
};
