import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, ArrowLeft, Info } from 'lucide-react';

export default function NuevaReserva() {
  const navigate = useNavigate();
  const [huespedes, setHuespedes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  const [formulario, setFormulario] = useState({
    titularId: '',
    habitacionId: '',
    fechaReservaInicio: '',
    fechaReservaSalida: '',
    cantidadPersonas: 1
  });

  const habitacionesDisponibles = [
    { id: 100, numero: '901', tipo: 'Suite', capacidad: 2 },
    { id: 101, numero: '902', tipo: 'Suite', capacidad: 2 },
    { id: 102, numero: '903', tipo: 'Simple', capacidad: 1 },
    { id: 103, numero: '904', tipo: 'Doble matrimonial', capacidad: 2 },
  ];

  useEffect(() => {
    fetch('http://localhost:3000/huespedes')
      .then(res => res.json())
      .then(data => setHuespedes(data))
      .catch(err => console.error("Error cargando huéspedes:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const respuesta = await fetch('http://localhost:3000/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titularId: Number(formulario.titularId),
          habitacionId: Number(formulario.habitacionId),
          fechaReservaInicio: formulario.fechaReservaInicio,
          fechaReservaSalida: formulario.fechaReservaSalida,
          cantidadPersonas: Number(formulario.cantidadPersonas)
        }),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert('¡Reserva creada exitosamente!');
        navigate('/reservas'); 
      } else {
        alert(`No se pudo crear: ${resultado.message}`);
      }
    } catch (error) {
      alert('Error de conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/reservas')}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Registrar Nueva Reserva</h1>
          <p className="text-gray-500">Asigna estadías comprobando disponibilidad y capacidad.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titular de la Reserva *</label>
            <select 
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-hotel-accent outline-none"
              value={formulario.titularId}
              onChange={e => setFormulario({...formulario, titularId: e.target.value})}
            >
              <option value="" disabled>Seleccione un huésped...</option>
              {huespedes.map(h => (
                <option key={h.id} value={h.id}>{h.nombre} ({h.numeroDocumento})</option>
              ))}
            </select>
            {huespedes.length === 0 && (
              <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                <Info size={12}/> Registre huéspedes primero.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Habitación *</label>
            <select 
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-hotel-accent outline-none"
              value={formulario.habitacionId}
              onChange={e => setFormulario({...formulario, habitacionId: e.target.value})}
            >
              <option value="" disabled>Seleccione una habitación...</option>
              {habitacionesDisponibles.map(hab => (
                <option key={hab.id} value={hab.id}>
                  Nro {hab.numero} - {hab.tipo} (Máx: {hab.capacidad} pers.)
                </option>
              ))}
            </select>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Ingreso *</label>
            <input 
              required
              type="date" 
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-hotel-accent outline-none"
              value={formulario.fechaReservaInicio}
              onChange={e => setFormulario({...formulario, fechaReservaInicio: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Salida *</label>
            <input 
              required
              type="date" 
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-hotel-accent outline-none"
              value={formulario.fechaReservaSalida}
              onChange={e => setFormulario({...formulario, fechaReservaSalida: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cantidad de Personas *</label>
            <input 
              required
              type="number" 
              min="1"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-hotel-accent outline-none"
              value={formulario.cantidadPersonas}
              onChange={e => setFormulario({...formulario, cantidadPersonas: Number(e.target.value)})}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={cargando}
            className="bg-hotel-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-hotel-800 transition-colors flex items-center gap-2 disabled:bg-gray-400"
          >
            {cargando ? 'Procesando...' : <><CalendarPlus size={20} /> Confirmar Reserva</>}
          </button>
        </div>
      </form>
    </div>
  );
}