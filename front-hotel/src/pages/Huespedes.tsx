import { useState, useEffect } from 'react';
import { Users, UserPlus, Loader2 } from 'lucide-react';

export default function Huespedes() {
  const [huespedes, setHuespedes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // Estado para el formulario
  const [formulario, setFormulario] = useState({
    tipoDocumento: 'CI',
    numeroDocumento: '',
    nombre: '',
    telefono: '',
    correo: ''
  });

  // Cargar huéspedes desde tu backend
  const cargarHuespedes = async () => {
    try {
      const res = await fetch('http://localhost:3000/huespedes');
      const data = await res.json();
      setHuespedes(data);
    } catch (error) {
      console.error("Error al cargar huéspedes", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarHuespedes();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/huespedes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Huésped registrado con éxito');
        setFormulario({ tipoDocumento: 'CI', numeroDocumento: '', nombre: '', telefono: '', correo: '' });
        cargarHuespedes(); 
      } else {
        alert(`Error: ${data.message || 'No se pudo registrar'}`);
      }
    } catch (error) {
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Huéspedes</h1>
        <p className="text-gray-500">Registra nuevos clientes y consulta el directorio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1 h-fit">
          <div className="flex items-center gap-2 mb-4 border-b pb-4">
            <UserPlus className="text-hotel-accent" />
            <h2 className="text-lg font-semibold text-gray-800">Nuevo Huésped</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Tipo</label>
                <select 
                  className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-hotel-accent focus:border-hotel-accent outline-none"
                  value={formulario.tipoDocumento}
                  onChange={e => setFormulario({...formulario, tipoDocumento: e.target.value})}
                >
                  <option value="CI">CI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="DNI">DNI</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Nro. Documento *</label>
                <input 
                  required
                  type="text" 
                  className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-hotel-accent focus:border-hotel-accent outline-none"
                  value={formulario.numeroDocumento}
                  onChange={e => setFormulario({...formulario, numeroDocumento: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nombre Completo *</label>
              <input 
                required
                type="text" 
                className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-hotel-accent focus:border-hotel-accent outline-none"
                value={formulario.nombre}
                onChange={e => setFormulario({...formulario, nombre: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Teléfono</label>
              <input 
                type="text" 
                className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-hotel-accent focus:border-hotel-accent outline-none"
                value={formulario.telefono}
                onChange={e => setFormulario({...formulario, telefono: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-hotel-accent focus:border-hotel-accent outline-none"
                value={formulario.correo}
                onChange={e => setFormulario({...formulario, correo: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full bg-hotel-900 text-white py-2.5 rounded-md font-medium hover:bg-hotel-800 transition-colors mt-2">
              Guardar Huésped
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2 overflow-hidden h-fit">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
            <Users className="text-gray-500" size={20} />
            <h2 className="font-semibold text-gray-700">Directorio Registrado</h2>
          </div>
          
          {cargando ? (
            <div className="flex justify-center items-center p-10 text-hotel-accent">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-xs tracking-wider uppercase">
                    <th className="py-3 px-4 font-medium">Documento</th>
                    <th className="py-3 px-4 font-medium">Nombre</th>
                    <th className="py-3 px-4 font-medium">Contacto</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {huespedes.map((h) => (
                    <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{h.tipoDocumento} {h.numeroDocumento}</td>
                      <td className="py-3 px-4 font-semibold">{h.nombre}</td>
                      <td className="py-3 px-4 text-gray-500">
                        <div>{h.telefono || 'Sin teléfono'}</div>
                        <div className="text-xs">{h.correo || 'Sin correo'}</div>
                      </td>
                    </tr>
                  ))}
                  {huespedes.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-400">No hay huéspedes registrados.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}