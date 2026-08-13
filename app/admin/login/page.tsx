"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Clave incorrecta");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-slate-200 rounded-xl p-8"
      >
        <h1 className="text-xl font-bold text-[#0B1220] mb-6 text-center">
          Panel de administracion
        </h1>

        <label className="block text-sm font-medium text-[#0B1220] mb-1.5">
          Clave de acceso
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-slate-300 rounded-md px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
        />

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#0B1220] hover:bg-[#1E293B] text-white font-semibold py-3 rounded-md transition-colors"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}