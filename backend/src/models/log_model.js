// src/models/log_model.js
import { Schema, model } from "mongoose";

const logSchema = new Schema({
    usuario: { type: String, required: true },
    accion: { type: String, required: true }, // endpoint
    entidad: { type: String, required: true }, //Paciente, usuario
    entidad_id: { type: String, required: true },
    cambios: { type: Object, default: {} },
    fecha: { type: Date, default: Date.now }
});

const Log = model("Log", logSchema);
export default Log;