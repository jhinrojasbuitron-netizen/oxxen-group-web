import { prisma } from "@/lib/prisma";
import MarcarAtendido from "./MarcarAtendido";

export const dynamic = "force-dynamic";

export default async function AdminPanel() {
  const cotizaciones = await prisma.cotizacion.findMany({
    orderBy: { creadoEn: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#0B1220]">
          Solicitudes de cotizacion
        </h1>
        <form action="/api/admin/logout" method="POST">
          <button className="text-sm text-slate-500 hover:text-[#0B1220]">
            Cerrar sesion
          </button>
        </form>
      </div>

      {cotizaciones.length === 0 ? (
        <p className="text-slate-500">Todavia no hay solicitudes.</p>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Servicios</th>
                <th className="px-4 py-3">Mensaje</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.map((c) => (
                <tr key={c.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                    {new Date(c.creadoEn).toLocaleDateString("es-PE", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#0B1220]">
                    {c.nombre}
                  </td>
                  <td className="px-4 py-3">{c.empresa || "-"}</td>
                  <td className="px-4 py-3">
                    <div>{c.telefono}</div>
                    <div className="text-slate-500">{c.email}</div>
                  </td>
                  <td className="px-4 py-3 max-w-[220px]">{c.servicios}</td>
                  <td className="px-4 py-3 max-w-[220px] text-slate-500">
                    {c.mensaje || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <MarcarAtendido id={c.id} atendido={c.atendido} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}