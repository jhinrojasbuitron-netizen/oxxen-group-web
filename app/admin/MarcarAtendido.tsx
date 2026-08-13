"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarcarAtendido({
  id,
  atendido,
}: {
  id: number;
  atendido: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    await fetch(`/api/admin/cotizaciones/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ atendido: !atendido }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
        atendido
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-amber-100 text-amber-700 hover:bg-amber-200"
      }`}
    >
      {atendido ? "Atendido" : "Pendiente"}
    </button>
  );
}