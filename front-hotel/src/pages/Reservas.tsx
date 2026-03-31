import { useState, useEffect } from 'react';
import { AlertCircle, Plus, Loader2, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Reservas() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarReservas = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/reservas');
      const datos = await respuesta.json();
      setReservas(datos);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const handleCancelar = async (id: number) => {
    if (!window.confirm(`¿Estás segura de que deseas cancelar la reserva #${id}?`)) return;
    try {
      const respuesta = await fetch('http://localhost:3000/reservas/cancelar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservaId: id }),
      });
      const resultado = await respuesta.json();
      if (respuesta.ok) {
        let mensaje = `Reserva #${id} cancelada exitosamente.`;
        if (resultado.moraAplicada) mensaje += `Se aplicó una mora de $${resultado.montoMora}.`;
        alert(mensaje);
        cargarReservas(); 
      } else {
        alert(`Error: ${resultado.message}`);
      }
    } catch (error) {
      alert("Ocurrió un error al intentar cancelar.");
    }
  };

  const handleCheckIn = async (id: number) => {
    if (!window.confirm(`¿Registrar la llegada del huésped para la reserva #${id}?`)) return;
    try {
      const respuesta = await fetch(`http://localhost:3000/reservas/${id}/checkin`, {
        method: 'PATCH',
      });
      if (respuesta.ok) {
        alert('Check-in registrado exitosamente.');
        cargarReservas(); 
      } else {
        const resultado = await respuesta.json();
        alert(`Error: ${resultado.message}`);
      }
    } catch (error) {
      alert("Ocurrió un error al registrar el check-in.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Reservas</h1>
          <p className="text-gray-500">Administra las estadías, check-ins y cancelaciones.</p>
        </div>
        <button 
          onClick={() => navigate('/nueva-reserva')}
          className="bg-hotel-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-hotel-800 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={20} /> Nueva Reserva
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {cargando ? (
          <div className="flex justify-center items-center p-10 text-hotel-accent">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : reservas.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No hay reservas registradas.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm tracking-wider">
                <th className="py-4 px-6 font-medium">ID</th>
                <th className="py-4 px-6 font-medium">TITULAR</th>
                <th className="py-4 px-6 font-medium">HABITACIÓN</th>
                <th className="py-4 px-6 font-medium">INGRESO</th>
                <th className="py-4 px-6 font-medium">ESTADO</th>
                <th className="py-4 px-6 font-medium text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {reservas.map((reserva) => (
                <tr key={reserva.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium">#{reserva.id}</td>
                  <td className="py-4 px-6 truncate max-w-[150px]">{reserva.titular?.nombre || 'Desconocido'}</td>
                  <td className="py-4 px-6">{reserva.habitacion?.tipoHabitacionNombre} ({reserva.habitacion?.numero})</td>
                  <td className="py-4 px-6">{new Date(reserva.fechaReservaInicio).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      reserva.estado === 'Confirmada' ? 'bg-green-100 text-green-700' :
                      reserva.estado === 'Cancelada' ? 'bg-red-100 text-red-700' :
                      reserva.estado === 'Check In' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    {reserva.estado === 'Confirmada' && (
                      <>
                        <button onClick={() => handleCheckIn(reserva.id)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors inline-flex items-center gap-1 font-medium">
                          <CheckSquare size={16} /> Check-in
                        </button>
                        <button onClick={() => handleCancelar(reserva.id)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-md transition-colors inline-flex items-center gap-1 font-medium">
                          <AlertCircle size={16} /> Cancelar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}