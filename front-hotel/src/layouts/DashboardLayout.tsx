import { Link, Outlet } from 'react-router-dom';
import { Home, Users, Calendar, PhoneCall } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sidebar (Menú Lateral) */}
      <aside className="w-64 bg-hotel-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-wider">HOTEL<span className="text-hotel-accent">SYS</span></h1>
          <p className="text-sm text-gray-400 mt-1">Recepción</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hotel-800 transition-colors">
            <Home size={20} /> Inicio
          </Link>
          <Link to="/huespedes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hotel-800 transition-colors">
            <Users size={20} /> Huéspedes
          </Link>
          <Link to="/reservas" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-hotel-800 text-hotel-accent font-medium transition-colors">
            <Calendar size={20} /> Reservas
          </Link>
          <Link to="/servicios" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-hotel-800 transition-colors">
            <PhoneCall size={20} /> Servicios
          </Link>
        </nav>

        

      </aside>

      {/* Área Principal de Contenido */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Cabecera superior */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Panel de Control</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-hotel-accent flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-sm font-medium text-gray-700">Recepcionista</span>
          </div>
        </header>

        {/* Aquí se inyectarán tus páginas (HU-01 a HU-07) */}
        <div className="flex-1 overflow-auto p-8 bg-hotel-50">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}