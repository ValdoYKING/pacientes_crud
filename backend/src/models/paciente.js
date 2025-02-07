// src/models/paciente.js
import {Schema, model} from "mongoose";

const pacienteSchema = new Schema({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    edad: {type: Number, required:true},
    sexo: {type: String, enum:["M","F"] }
}, {timestamps: true});

const Paciente = model("Paciente", pacienteSchema);
export default Paciente;