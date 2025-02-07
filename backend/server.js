// //backend/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import pacienteRoutes from "./src/routes/paciente_routes.js";
import autenticacionRoutes from "./src/routes/autenticacion_routes.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/autenticacion", autenticacionRoutes);

app.get("/", (req,res) =>{
    res.send("API de pacientes");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});