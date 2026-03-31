import { useState, useEffect } from 'react';
import { Users, Calendar, CheckCircle, Loader2 } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({
    reservasActivas: 0,
    checkIns: 0,
    totalHuespedes: 0
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        // Hacemos las dos peticiones al backend al mismo tiempo
        const [resReservas, resHuespedes] = await Promise.all([
          fetch('http://localhost:3000/reservas'),
          fetch('http://localhost:3000/huespedes')
        ]);

        const reservas = await resReservas.json();
        const huespedes = await resHuespedes.json();

        // Calculamos los números usando funciones de arreglos
        const activas = reservas.filter((r: any) => r.estado === 'Confirmada').length;
        const enCurso = reservas.filter((r: any) => r.estado === 'Check In').length;
        
        setStats({
          reservasActivas: activas,
          checkIns: enCurso,
          totalHuespedes: huespedes.length
        });

      } catch (error) {
        console.error("Error al cargar las estadísticas del Dashboard:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarEstadisticas();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Resumen del Día</h1>
        <p className="text-gray-500">Bienvenida al sistema operativo del hotel.</p>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center p-20 text-hotel-accent">
          <Loader2 className="animate-spin" size={40} />
          <span className="ml-3 font-medium text-lg">Calculando métricas...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1: Reservas Confirmadas */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-4 rounded-lg text-blue-600">
              <Calendar size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Reservas por Ingresar</p>
              <p className="text-3xl font-bold text-gray-800">{stats.reservasActivas}</p>
            </div>
          </div>

          {/* Tarjeta 2: Estadías en Curso */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-4 rounded-lg text-green-600">
              <CheckCircle size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Estadías en Curso</p>
              <p className="text-3xl font-bold text-gray-800">{stats.checkIns}</p>
            </div>
          </div>

          {/* Tarjeta 3: Total de Huéspedes */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 p-4 rounded-lg text-purple-600">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Huéspedes Registrados</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalHuespedes}</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}