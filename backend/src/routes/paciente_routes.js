// src/routes/paciente_routes.js
import express from "express";
import * as pacientesController from "../controllers/paciente_controller.js";
import { verificarToken } from "../middlewares/autenticacion.js";

const router = express.Router();

//obtener todos los pacientes
/* router.get("/", pacientesController.obtenerPacientes); */
/* router.get("/", verificarToken, pacientesController.obtenerPacientes); */

//obtener un paciente por su id
router.get("/:id", verificarToken, pacientesController.obtenerPacientePorId);

//crear un nuevo paciente
router.post("/", verificarToken, pacientesController.crearPaciente);

//actualizar paciente por su id
router.put("/:id", verificarToken, pacientesController.actualizarPaciente);

//eliminar paciente por su id
router.delete("/:id", verificarToken, pacientesController.eliminarPaciente);

export default router;