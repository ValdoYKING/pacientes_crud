"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Paciente {
  _id: string;
  nombre: string;
  apellidos: string;
  edad: number;
  sexo: string;
}

export default function Dashboard() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState<number | "">("");
  const [sexo, setSexo] = useState<string | "">("");

  const router = useRouter();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/");
          return;
        }

        const res = await fetch("http://localhost:5000/api/pacientes", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error al obtener los pacientes: ${res.statusText}`);
        }

        const data: Paciente[] = await res.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        setError(
          "No se pudieron cargar los pacientes. Intenta de nuevo más tarde."
        );
      }
    };

    setTimeout(fetchPacientes, 500);
  }, [router]);

  const handleAgregarPaciente = async () => {
    if (!nombre || !apellidos || !edad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/pacientes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellidos, edad: Number(edad), sexo }),
      });

      if (!res.ok) {
        throw new Error("Error al agregar paciente");
      }

      const newPaciente: Paciente = await res.json();
      setPacientes([...pacientes, newPaciente]);
      setIsModalOpen(false);
      setNombre("");
      setApellidos("");
      setEdad("");
      setSexo("");
    } catch (error) {
      console.error("Error al agregar paciente:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pacientes Registrados</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setIsModalOpen(true)}
        >
          Agregar paciente
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {pacientes.length > 0 ? (
          pacientes.map((p) => (
            <li
              key={p._id}
              className="border p-2 mb-2 flex justify-between items-center"
            >
              <span>
                {p.nombre} {p.apellidos} - {p.edad} años -{" "}
                {p.sexo === "M" ? "Masculino" : "Femenino"}
              </span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => router.push(`/paciente/${p._id}`)}
              >
                Ver detalles
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No hay pacientes registrados.</p>
        )}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Agregar Paciente</h2>

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 w-full mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              placeholder="Apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="border p-2 w-full mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <input
              type="number"
              placeholder="Edad"
              value={edad}
              onChange={(e) =>
                setEdad(e.target.value ? Number(e.target.value) : "")
              }
              className="border p-2 w-full mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              className="border p-2 w-full mb-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Selecciona el sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>

            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAgregarPaciente}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
