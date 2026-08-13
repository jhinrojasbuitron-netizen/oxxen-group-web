export default function WhatsappButton() {
  const numero = "51999999999";
  const mensaje = "Hola, quisiera mas informacion sobre sus servicios.";

  return (
    <a href={"https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje)} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.86 14.15c-.25.7-1.44 1.34-1.98 1.4-.51.06-1.03.28-3.46-.72-2.94-1.21-4.83-4.17-4.98-4.37-.14-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.14 1.02-2.44.27-.29.6-.36.8-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.35 1.45.29.15.46.12.63-.08.17-.2.72-.84.92-1.13.2-.29.4-.24.66-.15.27.1 1.72.81 2.02.96.29.15.49.22.56.35.07.13.07.75-.18 1.45z" />
      </svg>
    </a>
  );
}