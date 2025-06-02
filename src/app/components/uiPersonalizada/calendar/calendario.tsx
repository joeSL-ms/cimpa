// EmpresaCalendar.tsx
"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface DataInterface {
  titulo_anotacion: string;
  fecha_anotacion: string;
}

const EmpresaCalendar = ({ data }: { data?: DataInterface[] }) => {
  const eventos = data && data.length > 0
    ? data.map(({ titulo_anotacion, fecha_anotacion }) => ({
        title: titulo_anotacion,
        start: fecha_anotacion}))
    : []; // Sin eventos, pero calendario visible

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold mb-4">Calendario de la Empresa</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        dateClick={(info) => alert(`Día seleccionado: ${info.dateStr}`)}
        height="auto"
      />
    </div>
  );
};

export default EmpresaCalendar;
