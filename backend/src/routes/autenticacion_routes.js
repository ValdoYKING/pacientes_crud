// src/routes/autenticacion_routes.js
import express from "express";
import { registrar, login } from "../controllers/autenticacion_controller.js";

const router = express.Router();
router.post("/registrar", registrar);
router.post("/login", login);

export default router;