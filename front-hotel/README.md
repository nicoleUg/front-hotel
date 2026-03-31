# FrontHotel - Interfaz de Recepción

Prototipo frontend (MVP) para el sistema de reservas de un hotel pequeño. Construido para consumir la API REST de BackHotel y cubrir las interacciones de usuario desde la **HU-01** hasta la **HU-07**.

## 🚀 Tecnologías Utilizadas

* **React 18** + **TypeScript**
* **Vite** (Empaquetador y servidor de desarrollo ultrarrápido)
* **Tailwind CSS** (Estilos y diseño responsivo)
* **React Router DOM** (Enrutamiento de pantallas)
* **Lucide React** (Iconografía elegante)

## 📋 Requisitos Previos

Para que este proyecto funcione, necesitas tener el backend corriendo:
1. Asegúrate de tener clonado e iniciado el proyecto **BackHotel (NestJS)** en el puerto `3000`.
2. Node.js (versión 18 o superior) instalado en tu computadora.

## ⚙️ Instalación y Ejecución

1. Instalar las dependencias del proyecto:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

3. Abrir en el navegador el enlace proporcionado por la terminal (usualmente `http://localhost:5173`).

## 📁 Estructura del Proyecto

```text
front-hotel/
├── src/
│   ├── layouts/
│   │   └── DashboardLayout.tsx  # Esqueleto principal (Sidebar + Header)
│   ├── pages/
│   │   ├── Home.tsx             # Panel de métricas en tiempo real
│   │   ├── Huespedes.tsx        # Módulo HU-01
│   │   ├── Reservas.tsx         # Módulo HU-03, HU-04 y HU-07
│   │   ├── NuevaReserva.tsx     # Módulo HU-02
│   │   └── Servicios.tsx        # Módulo HU-06
│   ├── App.tsx                  # Configuración de React Router
│   ├── index.css                # Directivas de Tailwind
│   └── main.tsx                 # Punto de entrada de la aplicación
```

## 🎯 Historias de Usuario (Alcance del MVP)

Este prototipo cubre las siguientes funcionalidades exigidas en el documento de requerimientos:

* **HU-01 (Registrar huésped):** Pantalla de gestión con formulario a la izquierda y directorio en tiempo real a la derecha. Maneja errores de duplicación de documentos provenientes de la API.
* **HU-02 (Crear reserva):** Formulario dinámico de reserva de habitaciones. Interactúa con el backend para disparar las validaciones de capacidad y solapamiento de fechas.
* **HU-03 (Consultar reservas):** Tabla principal donde se listan todas las reservas activas, futuras y canceladas del hotel, ordenadas cronológicamente.
* **HU-04 (Registrar check-in):** Acción de un solo clic en la tabla de reservas para cambiar el estado de la estadía a "Check In", bloqueando posteriores ediciones.
* **HU-06 (Visualizar servicios):** Pantalla dedicada a listar los contactos de apoyo del hotel (Limpieza, Mantenimiento, etc.).
* **HU-07 (Cancelar con mora - Asignación Individual):** Botón de acción crítica en la tabla de reservas. Solicita confirmación y muestra una alerta detallada en caso de que el backend haya aplicado el cobro por cancelación tardía ($50.00).

*(Nota: La HU-05 correspondiente al Patrón Factory se maneja exclusivamente a nivel de lógica de backend durante la creación de reservas).*
