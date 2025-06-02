"use client";

import '@/styles/misiones.css';
import { useState } from 'react';
import Image from "next/image";
import type { Mision, EstadoMision } from '@/types/typemision';


const estadoIconos: { [key in EstadoMision]: string } = {
  Incompleto: '/img/alerta-64.png',
  "En progreso": '/img/progreso.png',
  Completado: '/img/si.png',
};

// ✅ Subcomponentes

const HeaderMision = () => (
  <div className="header-mision">
    <h1 className="titulo-principal">Misiones</h1>
  </div>
);

const Divider = ({ className = "" }: { className?: string }) => (
  <div className="w-full px-16">
    <div className={`bg-black w-full ${className}`} />
  </div>
);

const Icon = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
  <Image src={src} alt={alt} width={width} height={height} />
);

const MisionItem = ({ titulo, descripcion, estado }: { titulo: string; descripcion: string; estado: string }) => {
  const iconoUrl = estadoIconos[estado as EstadoMision] || '/img/default-icono.png';
  return (
    <>
      <article className="mision-item">
        <div className='mision-item-header'>
          <Icon src={iconoUrl} alt="Icono de la misión" width={50} height={50} />
          <h2 className="titulo-mision">{titulo}</h2>
        </div>
        <p className="descripcion-mision">{descripcion}</p>
        <button className="boton-mision">Detalles</button>
      </article>
      <Divider className="bg-gray-700 h-1" />
    </>
  );
};

const MisionList = ({ misiones }: { misiones: Mision[] }) => (
  <div className='w-full h-full overflow-y-auto'>
    {misiones.length === 0 ? (
      <p className="text-center py-4 text-gray-500">No hay misiones disponibles.</p>
    ) : (
      misiones.map((mision) => (
        <MisionItem
          key={mision.id_mision}
          titulo={mision.nombre_mision}
          descripcion={mision.descripcion_mision}
          estado={mision.estado_mision}
        />
      ))
    )}
  </div>
);

const NavMision = ({ filtro, setFiltro }: { filtro: string; setFiltro: (f: string) => void }) => {
  const botones = ["Todos", "Incompletas", "En progreso"];
  return (
    <>
      <HeaderMision />
      <Divider className="bg-gray-700 h-1" />
      <div className="px-8 py-4 text-center">
        <ul className="flex gap-4 flex-wrap">
          {botones.map((texto) => (
            <li key={texto}>
              <button
                onClick={() => setFiltro(texto)}
                className={`px-4 py-2 rounded-[42px] border-2 font-semibold transition-all 
                  ${filtro === texto ? 'bg-orange-500 text-white' : 'text-black hover:bg-orange-500'}`}
              >
                {texto}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Divider className="bg-gray-300 h-px mt-3" />
    </>
  );
};

const GetMisionHome = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-1 mision-listado">
    {children}
  </section>
);

// ✅ Componente principal ahora parametrizado
export default function MisionesHome({ misiones = [] }: { misiones?: Mision[] }) {
  const [filtro, setFiltro] = useState<string>("Incompletas");

  const misionesIncompletas = misiones.filter(m => m.estado_mision === "Incompleto");
  const misionesProgreso = misiones.filter(m => m.estado_mision === "En progreso");

  const obtenerMisiones = (): Mision[] => {
    switch (filtro) {
      case "En progreso":
        return misionesProgreso;
      case "Incompletas":
        return misionesIncompletas;
      case "Todos":
      default:
        return misiones;
    }
  };

  return (
    <section className="contenedor-misiones">
      <NavMision filtro={filtro} setFiltro={setFiltro} />
      <GetMisionHome>
        <MisionList misiones={obtenerMisiones()} />
      </GetMisionHome>
    </section>
  );
}
