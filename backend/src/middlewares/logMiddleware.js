// src/middlewares/logMiddleware.js
import Log from "../models/log_model.js";

export const registrarLog = async (usuario, accion, entidad, entidad_id, cambios = {}) => {
    try {
        await Log.create({ usuario, accion, entidad, entidad_id, cambios });
    } catch (error) {
        console.error("Error al registrar el log", error);
    }
};