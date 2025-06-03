export interface Anotacion {
  titulo_anotacion: string;
  fecha_anotacion: string;
}

function parseFecha(fecha: string): string {
  const [dia, mes, anio] = fecha.split("/");
  return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}

export function formatearAnotaciones(data: Anotacion[]): Anotacion[] {
  return data.map(anotacion => ({
    ...anotacion,
    fecha_anotacion: parseFecha(anotacion.fecha_anotacion)
  }));
}
