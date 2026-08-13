const servicios = [
  {
    titulo: "Venta de equipos",
    detalle: "Laptops, desktops y equipos ensamblados a tu medida, con asesoria incluida.",
  },
  {
    titulo: "Soporte tecnico",
    detalle: "Instalacion, configuracion y mantenimiento preventivo y correctivo.",
  },
  {
    titulo: "Asesoria tecnologica",
    detalle: "Te ayudamos a elegir el equipo correcto segun tu presupuesto y necesidad.",
  },
];

const publicos = [
  "PYMES",
  "Estudios contables",
  "Oficinas administrativas",
  "Instituciones educativas",
  "Profesionales independientes",
  "Comercios",
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#0B1220] text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
          <p className="text-[#38BDF8] font-semibold text-sm tracking-wide uppercase mb-4">
            Tecnologia para empresas en Peru
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
            Equipos y soporte tecnico en los que tu empresa puede confiar
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mt-6">
            Vendemos, instalamos y mantenemos la tecnologia que tu negocio
            necesita para operar sin contratiempos.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="/cotizacion"
              className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0B1220] font-semibold px-7 py-3.5 rounded-md transition-colors"
            >
              Solicitar cotizacion
            </a>
            <a
              href="/servicios"
              className="border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-md transition-colors"
            >
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-[#0B1220] mb-2">
          Lo que hacemos
        </h2>
        <p className="text-slate-500 mb-12 max-w-xl">
          Tres frentes de trabajo, un mismo objetivo: que tu tecnologia nunca
          sea un problema.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicios.map((s, i) => (
            <div
              key={s.titulo}
              className="border border-slate-200 rounded-xl p-7 hover:border-[#38BDF8] hover:shadow-lg transition-all"
            >
              <span className="text-[#38BDF8] font-bold text-sm">
                0{i + 1}
              </span>
              <h3 className="font-semibold text-lg text-[#0B1220] mt-3 mb-2">
                {s.titulo}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {s.detalle}
              </p>
              {s.titulo === "Venta de equipos" && (
                <a
                  href="/arma-tu-pc"
                  className="inline-block text-[#38BDF8] text-sm font-semibold mt-4 hover:underline"
                >
                  Arma tu PC →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Publico objetivo */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-[#0B1220] mb-8 text-center">
            Trabajamos con
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {publicos.map((p) => (
              <span
                key={p}
                className="bg-white border border-slate-200 text-slate-600 text-sm font-medium px-4 py-2 rounded-full"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#0B1220] mb-4">
          ¿Listo para cotizar?
        </h2>
        <p className="text-slate-500 mb-8 max-w-xl mx-auto">
          Cuentanos que necesitas y te enviamos una propuesta a tu medida.
        </p>
        <a
          href="/cotizacion"
          className="inline-block bg-[#0B1220] hover:bg-[#1E293B] text-white font-semibold px-8 py-4 rounded-md transition-colors"
        >
          Solicitar cotizacion
        </a>
      </section>
    </div>
  );
}