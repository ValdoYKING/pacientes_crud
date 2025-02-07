// src/controllers/paciente_controller.js
import Paciente from "../models/paciente.js";
import { registrarLog } from "../middlewares/logMiddleware.js";

//Obtener todos los pacientes
export const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pacientes", error });
    }
};

//Obtener un paciente por su id
export const obtenerPacientePorId = async (req, res) => {
    const { id } = req.params;

    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener al paciente", error });
    }
};

//Crear un nuevo paciente
export const crearPaciente = async (req, res) => {
    const { nombre, apellidos, edad, sexo } = req.body;
    const usuario = req.user.id;

    if (!nombre || !apellidos || !edad || !sexo) {
        return res.status(400).json({ message: "Faltan campos por completar" });
    }

    const nuevoPaciente = new Paciente({ nombre, apellidos, edad, sexo });

    try {
        const pacienteGuardado = await nuevoPaciente.save();
        await registrarLog(usuario, "CREAR", "PACIENTE", pacienteGuardado._id, pacienteGuardado);
        res.status(201).json(pacienteGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el paciente", error });
    }
};

//Actualizar un paciente por su ID
export const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, edad, sexo } = req.body;
    const usuario = req.user.id;

    try {
        const pacienteActualizado = await Paciente.findByIdAndUpdate(
            id,
            { nombre, apellidos, edad, sexo },
            { new: true }
        );
        if (!pacienteActualizado) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        await registrarLog(usuario, "ACTUALIZAR", "PACIENTE", pacienteActualizado._id, pacienteActualizado);
        res.json(pacienteActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el paciente", error });
    }
};

//Eliminar un paciente por ID
export const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const usuario = req.user.id;

    try {
        const pacienteEliminado = await Paciente.findByIdAndDelete(id);
        if (!pacienteEliminado) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        await registrarLog(usuario, "ELIMINAR", "PACIENTE", pacienteEliminado._id, pacienteEliminado);
        res.json({ message: "Paciente eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el paciente", error });
    }
};
