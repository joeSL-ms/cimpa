export type EstadoMision = "Incompleto" | "En progreso" | "Completado";

export type Mision = {
  id_mision: number;
  nombre_mision: string;
  descripcion_mision: string;
  estado_mision: EstadoMision;
};