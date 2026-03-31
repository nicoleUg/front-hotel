import { useState, useEffect } from 'react';
import { Phone, Loader2 } from 'lucide-react';

export default function Servicios() {
  const [servicios, setServicios] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const res = await fetch('http://localhost:3000/servicios');
        const data = await res.json();
        setServicios(data);
      } catch (error) {
        console.error("Error al cargar servicios", error);
      } finally {
        setCargando(false);
      }
    };
    cargarServicios();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Directorio de Servicios</h2>
        <p className="text-sm text-gray-500 mt-1">Contactos internos para atención al huésped.</p>
      </div>
      
      <div className="p-0">
        {cargando ? (
          <div className="flex justify-center items-center p-10 text-hotel-accent">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs tracking-wider uppercase">
                <th className="py-4 px-6 font-medium">Servicio</th>
                <th className="py-4 px-6 font-medium">Encargado</th>
                <th className="py-4 px-6 font-medium text-right">Teléfono</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {servicios.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{s.nombreServicio}</td>
                  <td className="py-4 px-6">{s.encargado}</td>
                  <td className="py-4 px-6 text-right flex justify-end items-center gap-2">
                    <Phone size={16} className="text-gray-400" /> 
                    <span className="font-mono text-hotel-accent font-semibold">{s.telefono}</span>
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