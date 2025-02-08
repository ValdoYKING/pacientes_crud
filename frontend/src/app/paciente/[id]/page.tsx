"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Paciente {
  nombre: string;
  apellidos: string;
  edad: number;
  sexo: string;
}

export default function DetallePaciente() {
  const { id } = useParams();
  const router = useRouter();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState<Paciente>({
    nombre: "",
    apellidos: "",
    edad: 0,
    sexo: "",
  });
  const [errorEdad, setErrorEdad] = useState<string | null>(null);

  useEffect(() => {
    const obtenerPaciente = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("No autorizado");

      const res = await fetch(`http://localhost:5000/api/pacientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return alert("Error al obtener datos");

      const data = await res.json();
      setPaciente(data);
      setFormData(data);
    };

    obtenerPaciente();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "edad") {
      const edad = parseInt(value);
      if (isNaN(edad) || edad < 0 || edad > 120) {
        setErrorEdad("Edad inválida");
      } else {
        setErrorEdad(null);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Peticion para actualizar datos */
  const handleActualizar = async () => {
    if (errorEdad) {
      alert("Corrige los errores antes de actualizar.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No autorizado");

      const res = await fetch(`http://localhost:5000/api/pacientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("No se pudo actualizar");

      alert("Paciente actualizado con éxito");
      setEditando(false);
      setPaciente(formData);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

    /* Peticion para eliminar paciente */
  const handleEliminar = async () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este paciente?"
    );
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No autorizado");

      const res = await fetch(`http://localhost:5000/api/pacientes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("No se pudo eliminar");

      alert("Paciente eliminado con éxito");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  const handleCancelar = () => {
    setEditando(false);
    setFormData(paciente as Paciente); // Volver a los datos originales
    setErrorEdad(null);
  };

  if (!paciente) return <p>Cargando datos...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Detalles del Paciente</h2>

      {/* SVG dependiendo el sexo */}
      <div className="flex justify-center mb-4">
        {paciente.sexo === "M" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 16v5" />
            <path d="M14 16v5" />
            <path d="M9 9h6l-1 7h-4z" />
            <path d="M5 11c1.333 -1.333 2.667 -2 4 -2" />
            <path d="M19 11c-1.333 -1.333 -2.667 -2 -4 -2" />
            <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-pink-500"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 16v5" />
            <path d="M14 16v5" />
            <path d="M8 16h8l-2 -7h-4z" />
            <path d="M5 11c1.667 -1.333 3.333 -2 5 -2" />
            <path d="M19 11c-1.667 -1.333 -3.333 -2 -5 -2" />
            <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          </svg>
        )}
      </div>

      <label className="block mb-2 text-gray-900 dark:text-gray-100">
        Nombre:
      </label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        readOnly={!editando}
      />

      <label className="block mb-2 text-gray-900 dark:text-gray-100">
        Apellidos:
      </label>
      <input
        type="text"
        name="apellidos"
        value={formData.apellidos}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        readOnly={!editando}
      />

      <label className="block mb-2 text-gray-900 dark:text-gray-100">
        Edad:
      </label>
      <input
        type="number"
        name="edad"
        value={formData.edad}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        readOnly={!editando}
      />
      {errorEdad && <p className="text-red-500">{errorEdad}</p>}

      <label className="block mb-2 text-gray-900 dark:text-gray-100">
        Sexo:
      </label>
      {editando ? (
        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      ) : (
        <input
          type="text"
          name="sexo"
          value={formData.sexo === "M" ? "Masculino" : "Femenino"}
          className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          readOnly
        />
      )}

      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded text-white ${
            editando ? "bg-green-500" : "bg-yellow-500"
          }`}
          onClick={() => (editando ? handleActualizar() : setEditando(true))}
        >
          {editando ? "Actualizar" : "Editar"}
        </button>

        {editando ? (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        ) : (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
