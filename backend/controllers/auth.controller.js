import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const register = async (req, res) => {
    try {
    const { username, email, phone, rol, password } = req.body;

    // Verificar si ya existe
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: "El correo ya existe" });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = new User({
        username,
        email,
        phone,
        rol,
        password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "Usuario registrado ✔️" });
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error en el registro" });
    }
};

export const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, userFound.password);
    if (!match) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Crear token
    const token = jwt.sign({ id: userFound._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
        message: "Login correcto",
        token,
        user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        rol: userFound.rol
        }
    });
    } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
    }
};
