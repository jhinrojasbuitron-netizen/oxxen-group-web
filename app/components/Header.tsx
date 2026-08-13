export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <img src="/images/logo.png" alt="OXXEN GROUP" className="h-10" />
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/">Inicio</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/productos">Productos</a>
          <a href="/servicios">Servicios</a>
          <a href="/cotizacion">Cotización</a>
          <a href="/blog">Blog</a>
          <a href="/contacto">Contacto</a>
        </nav>
      </div>
    </header>
  );
}