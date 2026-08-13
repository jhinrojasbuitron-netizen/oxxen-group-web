export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-slate-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="text-white font-bold text-xl tracking-tight">
            OXXEN<span className="text-[#38BDF8]">GROUP</span>
          </span>
          <p className="text-sm mt-3 max-w-sm text-slate-400">
            Equipos, soporte tecnico y asesoria especializada para que tu
            empresa crezca con la tecnologia correcta.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            Enlaces
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/nosotros" className="hover:text-white">Nosotros</a></li>
            <li><a href="/servicios" className="hover:text-white">Servicios</a></li>
            <li><a href="/cotizacion" className="hover:text-white">Solicitar cotizacion</a></li>
            <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            Contacto
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Lima, Peru</li>
            <li>+51 999 999 999</li>
            <li>contacto@oxxengroup.pe</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs py-5 text-slate-500">
        © {new Date().getFullYear()} OXXEN GROUP S.A.C. Todos los derechos reservados.
      </div>
    </footer>
  );
}