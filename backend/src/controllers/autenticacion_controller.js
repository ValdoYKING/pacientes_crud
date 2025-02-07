// src/controllers/autenticacion_controller.js
import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generarToken = (Usuario) => {
    return jwt.sign({ id: Usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El usuario ya existe" });
        } else {
            const nuevoUsuario = new Usuario({ nombre, email, password });
            await nuevoUsuario.save();

            res.status(201).json({ message: "Usuario registrado con exito" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error });
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: "Credenciales no validas" });
        }
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ message: "Credenciales no validas" });
        }
        const token = generarToken(usuario);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar secion", error });
    }
};