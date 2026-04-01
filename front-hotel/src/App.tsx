import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Reservas from './pages/Reservas';
import Servicios from './pages/Servicios';
import Huespedes from './pages/Huespedes';
import NuevaReserva from './pages/NuevaReserva';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="huespedes" element={<Huespedes />} />
          <Route path="nueva-reserva" element={<NuevaReserva />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;