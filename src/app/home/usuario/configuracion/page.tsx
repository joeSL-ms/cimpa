"use client";
import { useState } from "react";

export default function EditUserForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/usuarios/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellido, correo }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al actualizar usuario");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Editar Usuario</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label>
          Apellido
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label>
          Correo
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
        {error && (
          <p className="text-red-600 mt-2 font-semibold">Error: {error}</p>
        )}
        {success && (
          <p className="text-green-600 mt-2 font-semibold">
            Usuario actualizado correctamente.
          </p>
        )}
      </form>
    </section>
  );
}
