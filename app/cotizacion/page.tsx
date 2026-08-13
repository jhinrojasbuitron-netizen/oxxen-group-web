"use client";

import { useState, useEffect } from "react";

const serviciosDisponibles = [
  "Venta de computadoras de escritorio",
  "Venta de laptops",
  "Equipos ensamblados a medida",
  "Accesorios y perifericos",
  "Instalacion y configuracion de Windows",
  "Soporte tecnico",
  "Mantenimiento preventivo o correctivo",
  "Asesoria para adquirir equipos",
];

export default function Cotizacion() {
  const [estado, setEstado] = useState("idle");
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [mensajePrevio, setMensajePrevio] = useState("");

  useEffect(() => {
    const guardado = sessionStorage.getItem("armado_mensaje");
    if (guardado) {
      setMensajePrevio(guardado);
      setSeleccionados(["Equipos ensamblados a medida"]);
      sessionStorage.removeItem("armado_mensaje");
    }
  }, []);

  function toggleServicio(s: string) {
    setSeleccionados((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      nombre: data.get("nombre"),
      empresa: data.get("empresa"),
      telefono: data.get("telefono"),
      email: data.get("email"),
      servicios: seleccionados,
      mensaje: data.get("mensaje"),
    };

    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error en el envio");

      setEstado("exito");
      form.reset();
      setSeleccionados([]);
    } catch (err) {
      setEstado("error");
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Encabezado */}
      <section className="bg-[#0B1220] text-white py-20 px-4 text-center">
        <p className="text-[#38BDF8] font-semibold text-sm tracking-wide uppercase mb-3">
          Sin compromiso
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Solicita tu cotizacion
        </h1>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto">
          Cuentanos que necesitas y te respondemos con una propuesta a tu
          medida en menos de 24 horas.
        </p>
      </section>

      {/* Formulario */}
      <section className="max-w-3xl mx-auto px-4 -mt-10 pb-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10 flex flex-col gap-8"
        >
          {/* Datos de contacto */}
          <div>
            <h2 className="text-[#0B1220] font-semibold text-base mb-4">
              Tus datos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Ej. Maria Torres"
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Ej. Contadores SAC"
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Telefono / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  required
                  placeholder="Ej. 987 654 321"
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Correo electronico *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h2 className="text-[#0B1220] font-semibold text-base mb-1">
              Que necesitas?
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              Puedes elegir varias opciones
            </p>
            <div className="flex flex-wrap gap-2">
              {serviciosDisponibles.map((s) => {
                const activo = seleccionados.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleServicio(s)}
                    className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                      activo
                        ? "bg-[#0B1220] border-[#0B1220] text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:border-[#38BDF8]"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Cuentanos mas detalles
            </label>
            <textarea
              name="mensaje"
              rows={mensajePrevio ? 8 : 4}
              defaultValue={mensajePrevio}
              placeholder="Cantidad de equipos, presupuesto referencial, plazos, etc."
              className="w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-3 text-[#0B1220] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] focus:bg-white transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={estado === "enviando"}
            className="bg-[#38BDF8] hover:bg-[#0EA5E9] disabled:opacity-60 text-[#0B1220] font-semibold px-7 py-4 rounded-lg transition-colors"
          >
            {estado === "enviando" ? "Enviando..." : "Enviar solicitud"}
          </button>

          {estado === "exito" && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-lg px-4 py-3">
              Listo! Recibimos tu solicitud, te contactaremos pronto.
            </div>
          )}
          {estado === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-lg px-4 py-3">
              Hubo un problema al enviar. Intenta de nuevo o escribenos por
              WhatsApp.
            </div>
          )}
        </form>
      </section>
    </div>
  );
}