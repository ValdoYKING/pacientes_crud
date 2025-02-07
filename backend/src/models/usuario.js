// src/models/usuario.js
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, default: "user" }
}, { timestamps: true });

// ENcriptacion de contraseña antes de guardar en la base de datos
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Usuario = model("Usuario", usuarioSchema);
export default Usuario;
