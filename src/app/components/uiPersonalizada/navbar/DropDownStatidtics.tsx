import { useState } from "react";
import { JSX } from "react";

interface ComponenteType {
  id: string;
  label: string;
  component: () => JSX.Element;
}
interface component{
  componentes: ComponenteType[];
}
// Lista de componentes
const DesplegableComponentes = ({componentes}: component) => {
  // Estado para almacenar el componente seleccionado (por defecto, el primero)
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(componentes[0].id);

  return (
    <div className="p-6 border-2 border-gray-400 rounded-lg w-full mx-auto shadow-lg  bg-white">
      {/* Desplegable */}
      <label className="block mb-2 text-gray-700 font-semibold">Selecciona un componente:</label>
      <select
        className="w-full p-2 border rounded-lg"
        value={componenteSeleccionado}
        onChange={(e) => setComponenteSeleccionado(e.target.value)}
      >
        {componentes.map((comp) => (
          <option key={comp.id} value={comp.id}>
            {comp.label}
          </option>
        ))}
      </select>

      {/* Renderizar el componente seleccionado */}
      <div className="mt-4">
        {componentes.find((comp) => comp.id === componenteSeleccionado)?.component()}
      </div>
    </div>
  );
};

export default DesplegableComponentes;
