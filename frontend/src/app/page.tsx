"use client"; // Necesario porque usaremos hooks

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/autenticacion/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // Guardar el token
        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Iniciar Sesión
          </h1>
          <button
            onClick={() => router.push("/autenticacion")}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
          >
            Registrarme
          </button>
        </div>
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 w-full mb-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full mb-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded-md"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
