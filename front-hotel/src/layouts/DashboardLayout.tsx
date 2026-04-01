import { NavLink, Outlet } from 'react-router-dom';
import { Home, Users, Calendar, PhoneCall } from 'lucide-react';

export default function DashboardLayout() {
  
  const clasesPestana = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-hotel-800 text-hotel-accent font-medium' 
        : 'text-gray-300 hover:bg-hotel-800 hover:text-white'
    }`;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      <aside className="w-64 bg-hotel-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-wider">HOTEL</h1>
          <p className="text-sm text-gray-400 mt-1">Recepción</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavLink to="/" end className={clasesPestana}>
            <Home size={20} /> Inicio
          </NavLink>
          
          <NavLink to="/huespedes" end className={clasesPestana}>
            <Users size={20} /> Huéspedes
          </NavLink>
          
          <NavLink to="/reservas" end className={clasesPestana}>
            <Calendar size={20} /> Reservas
          </NavLink>
          
          <NavLink to="/servicios" end className={clasesPestana}>
            <PhoneCall size={20} /> Servicios
          </NavLink>
        </nav>
      </aside>

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

        <div className="flex-1 overflow-auto p-8 bg-hotel-50">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}