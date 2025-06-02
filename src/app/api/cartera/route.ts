import { verifyToken } from '@/lib/auth';
import { WalletService } from '@/lib/services/WalletSer';
import { NextResponse } from 'next/server';
import {
  transformarPuntosAcumulados,
  agruparPorDia
} from '@/lib/utils/dateTransformer';

export async function GET() {
  const user = await verifyToken();

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const [acumulado, ingresos, gastos] = await Promise.all([
      WalletService.getWalletAcumulado(user.id),
      WalletService.getWalletIngresos(user.id),
      WalletService.getWalletGastos(user.id),
    ]);

    const dataEcotime = transformarPuntosAcumulados(acumulado);
    const dataIngreso = agruparPorDia(ingresos, 'ingreso');
    const dataGastos = agruparPorDia(gastos, 'gasto');

    return NextResponse.json({ dataEcotime, dataIngreso, dataGastos }, { status: 200 });

  } catch {
    return NextResponse.json({ error: 'Error al obtener la cartera' }, { status: 500 });
  }
}
