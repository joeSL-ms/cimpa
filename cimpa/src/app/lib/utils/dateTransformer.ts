import { format } from 'date-fns';

export function transformarPuntosAcumulados(data: { fecha: string, puntos_acumulados: number }[]) {
  return data.map(d => ({
    hora: format(new Date(d.fecha), 'HH:mm'),
    wallet: d.puntos_acumulados
  }));
}

export function transformarFechaADia<T extends { fecha: string }>(data: T[]): (T & { dia: string })[] {
  return data.map(item => {
    const fecha = new Date(item.fecha);
    const dia = format(fecha, 'EEEE'); // Día completo (Lunes, Martes, ...)
    return {
      ...item,
      dia
    };
  });
}

export function agruparPorDia(data: { fecha: string, puntos_otorgados: number }[], tipo: 'ingreso' | 'gasto') {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const resultado: Record<string, number> = {
    'Lunes': 0, 'Martes': 0, 'Miércoles': 0, 'Jueves': 0,
    'Viernes': 0, 'Sábado': 0, 'Domingo': 0
  };

  for (const item of data) {
    const fecha = new Date(item.fecha);
    const diaSemana = dias[fecha.getDay()];
    resultado[diaSemana] += Math.abs(item.puntos_otorgados);
  }

  return Object.entries(resultado).map(([dia, valor]) => ({
    dia,
    [tipo]: valor
  }));
}
