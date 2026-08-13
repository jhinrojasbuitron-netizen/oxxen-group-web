"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type Opcion = {
  id: string;
  nombre: string;
  spec: string;
  precio: number;
};

type Categoria = {
  id: string;
  nombre: string;
  opciones: Opcion[];
};

const categorias: Categoria[] = [
  {
    id: "procesador",
    nombre: "Procesador",
    opciones: [
      { id: "i3", nombre: "Intel Core i3-12100F", spec: "4 nucleos, 4.3GHz", precio: 450 },
      { id: "i5", nombre: "Intel Core i5-12400F", spec: "6 nucleos, 4.4GHz", precio: 630 },
      { id: "i7", nombre: "Intel Core i7-12700F", spec: "12 nucleos, 4.9GHz", precio: 1200 },
      { id: "ryzen5", nombre: "AMD Ryzen 5 5600", spec: "6 nucleos, 4.4GHz", precio: 580 },
    ],
  },
  {
    id: "placa",
    nombre: "Placa madre",
    opciones: [
      { id: "h610", nombre: "Placa H610M", spec: "DDR4, mATX", precio: 320 },
      { id: "b660", nombre: "Placa B660M", spec: "DDR4, mATX, overclock RAM", precio: 480 },
      { id: "b550", nombre: "Placa B550M (AMD)", spec: "DDR4, mATX", precio: 420 },
    ],
  },
  {
    id: "ram",
    nombre: "Memoria RAM",
    opciones: [
      { id: "ram8", nombre: "8GB DDR4 3200MHz", spec: "1 modulo", precio: 130 },
      { id: "ram16", nombre: "16GB DDR4 3200MHz", spec: "2 modulos de 8GB", precio: 240 },
      { id: "ram32", nombre: "32GB DDR4 3200MHz", spec: "2 modulos de 16GB", precio: 460 },
    ],
  },
  {
    id: "almacenamiento",
    nombre: "Almacenamiento",
    opciones: [
      { id: "ssd256", nombre: "SSD 256GB NVMe", spec: "Lectura hasta 3000MB/s", precio: 150 },
      { id: "ssd512", nombre: "SSD 512GB NVMe", spec: "Lectura hasta 3000MB/s", precio: 230 },
      { id: "ssd1tb", nombre: "SSD 1TB NVMe", spec: "Lectura hasta 3000MB/s", precio: 390 },
    ],
  },
  {
    id: "gpu",
    nombre: "Tarjeta grafica",
    opciones: [
      { id: "integrada", nombre: "Grafica integrada", spec: "Incluida en el procesador", precio: 0 },
      { id: "gtx1650", nombre: "GTX 1650 4GB", spec: "Uso oficina / diseño basico", precio: 650 },
      { id: "rtx3050", nombre: "RTX 3050 8GB", spec: "Diseño y edicion", precio: 1150 },
    ],
  },
  {
    id: "gabinete",
    nombre: "Gabinete y fuente",
    opciones: [
      { id: "basico", nombre: "Gabinete basico + fuente 500W", spec: "Uso oficina", precio: 220 },
      { id: "silencioso", nombre: "Gabinete con panel + fuente 600W", spec: "Mejor flujo de aire", precio: 380 },
    ],
  },
];

export default function ArmaTuPC() {
  const [seleccion, setSeleccion] = useState<Record<string, string>>({});
  const router = useRouter();

  function elegir(categoriaId: string, opcionId: string) {
    setSeleccion((prev) => ({ ...prev, [categoriaId]: opcionId }));
  }

  const itemsElegidos = useMemo(() => {
    return categorias.map((cat) => {
      const opcionId = seleccion[cat.id];
      const opcion = cat.opciones.find((o) => o.id === opcionId);
      return { categoria: cat.nombre, opcion };
    });
  }, [seleccion]);

  const total = itemsElegidos.reduce(
    (acc, item) => acc + (item.opcion?.precio ?? 0),
    0
  );

  const completo = categorias.every((cat) => seleccion[cat.id]);

  function solicitarCotizacion() {
    const resumen = itemsElegidos
      .filter((i) => i.opcion)
      .map((i) => `${i.categoria}: ${i.opcion!.nombre}`)
      .join("\n");

    const mensaje = `Quiero cotizar un equipo ensamblado con esta configuracion:\n\n${resumen}\n\nTotal referencial: S/ ${total.toFixed(2)}`;

    sessionStorage.setItem("armado_mensaje", mensaje);
    router.push("/cotizacion");
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#0B1220] text-white py-16 px-4 text-center">
        <p className="text-[#38BDF8] font-semibold text-sm tracking-wide uppercase mb-3">
          Equipo a tu medida
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">Arma tu PC</h1>
        <p className="text-slate-400 mt-3 max-w-xl mx-auto">
          Elige cada componente y te enviamos una cotizacion con precios
          reales para tu equipo.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        {/* Selector por categorias */}
        <div className="flex flex-col gap-10">
          {categorias.map((cat) => (
            <div key={cat.id}>
              <h2 className="text-[#0B1220] font-semibold text-lg mb-4">
                {cat.nombre}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.opciones.map((op) => {
                  const activo = seleccion[cat.id] === op.id;
                  return (
                    <button
                      key={op.id}
                      onClick={() => elegir(cat.id, op.id)}
                      className={`text-left border rounded-xl p-4 transition-colors ${
                        activo
                          ? "border-[#38BDF8] bg-[#38BDF8]/5 ring-1 ring-[#38BDF8]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-[#0B1220] text-sm">
                            {op.nombre}
                          </p>
                          <p className="text-slate-400 text-xs mt-1">
                            {op.spec}
                          </p>
                        </div>
                        <span
                          className={`w-4 h-4 rounded-full border-2 shrink-0 mt-1 ${
                            activo
                              ? "border-[#38BDF8] bg-[#38BDF8]"
                              : "border-slate-300"
                          }`}
                        />
                      </div>
                      <p className="text-[#0B1220] font-semibold text-sm mt-3">
                        {op.precio === 0 ? "Incluido" : `S/ ${op.precio.toFixed(2)}`}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <aside className="h-fit lg:sticky lg:top-24 border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold text-[#0B1220] mb-4">Resumen</h3>
          <div className="flex flex-col gap-2 mb-4">
            {itemsElegidos.map((item) => (
              <div
                key={item.categoria}
                className="flex justify-between text-sm gap-2"
              >
                <span className="text-slate-500">{item.categoria}</span>
                <span className="text-[#0B1220] text-right">
                  {item.opcion
                    ? item.opcion.precio === 0
                      ? "Incluido"
                      : `S/ ${item.opcion.precio.toFixed(2)}`
                    : "-"}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4 flex justify-between items-center mb-6">
            <span className="font-semibold text-[#0B1220]">Total referencial</span>
            <span className="font-bold text-lg text-[#0B1220]">
              S/ {total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={solicitarCotizacion}
            disabled={!completo}
            className="w-full bg-[#38BDF8] hover:bg-[#0EA5E9] disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1220] font-semibold px-6 py-3.5 rounded-lg transition-colors"
          >
            {completo ? "Solicitar cotizacion" : "Completa todas las categorias"}
          </button>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Precios referenciales. El precio final se confirma en tu
            cotizacion.
          </p>
        </aside>
      </section>
    </div>
  );
}