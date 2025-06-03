import { verifyToken } from '@/lib/auth';
import { UserService } from '@/lib/services/UserService';
import { WalletService } from '@/lib/services/WalletSer';
import { transformarFechaADia } from '@/lib/utils/dateTransformer';
import { NextResponse } from 'next/server';

type DataLBItem = {
    name: string; // día
    gasto: number;
    ingreso: number;
    total: number;
};

type Item = {
    fecha: string;
    dia: string;
    puntos_acumulados?: number | string;
    puntos_otorgados?: number | string;
};

type Combined = {
    fecha: string;
    dia: string;
    puntos_acumulados: number;
    ingreso: number;
    gasto: number;
};

const combineWalletData = (
    acumulado: Item[],
    ingresos: Item[],
    gastos: Item[]
): Combined[] => {
    const dict: Record<string, Combined> = {};

    acumulado.forEach(item => {
        dict[item.fecha] = {
            fecha: item.fecha,
            dia: item.dia,
            puntos_acumulados: Number(item.puntos_acumulados || 0),
            ingreso: 0,
            gasto: 0,
        };
    });

    ingresos.forEach(item => {
        if (dict[item.fecha]) {
            dict[item.fecha].ingreso += Number(item.puntos_otorgados || 0);
        } else {
            dict[item.fecha] = {
                fecha: item.fecha,
                dia: item.dia,
                puntos_acumulados: 0,
                ingreso: Number(item.puntos_otorgados || 0),
                gasto: 0,
            };
        }
    });

    gastos.forEach(item => {
        if (dict[item.fecha]) {
            dict[item.fecha].gasto += Math.abs(Number(item.puntos_otorgados || 0));
        } else {
            dict[item.fecha] = {
                fecha: item.fecha,
                dia: item.dia,
                puntos_acumulados: 0,
                ingreso: 0,
                gasto: Math.abs(Number(item.puntos_otorgados || 0)),
            };
        }
    });

    return Object.values(dict);
};

const agruparPorDia = (data: Combined[]): Record<string, { total: number; ingreso: number; gasto: number }> => {
    return data.reduce<Record<string, { total: number; ingreso: number; gasto: number }>>(
        (acc, item) => {
            const dia = item.dia;
            if (!acc[dia]) {
                acc[dia] = { total: 0, ingreso: 0, gasto: 0 };
            }
            acc[dia].total += item.puntos_acumulados;
            acc[dia].ingreso += item.ingreso;
            acc[dia].gasto += item.gasto;
            return acc;
        },
        {}
    );
};

export async function GET() {
    const user = await verifyToken();
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

    const [acumuladoRaw, ingresosRaw, gastosRaw] = await Promise.all([
        WalletService.getWalletAcumulado(user.id),
        WalletService.getWalletIngresos(user.id),
        WalletService.getWalletGastos(user.id),
    ]);

    const acumulado = transformarFechaADia(acumuladoRaw);
    const ingresos = transformarFechaADia(ingresosRaw);
    const gastos = transformarFechaADia(gastosRaw);

    const combinedWalletData = combineWalletData(acumulado, ingresos, gastos);

    const agrupadoPorDia = agruparPorDia(combinedWalletData);

    const walletData: DataLBItem[] = Object.keys(agrupadoPorDia).map(dia => ({
        name: dia,
        total: agrupadoPorDia[dia]?.total ?? 0,
        ingreso: agrupadoPorDia[dia]?.ingreso ?? 0,
        gasto: agrupadoPorDia[dia]?.gasto ?? 0,
    }));


    const consumosRaw = await UserService.getUserConsumo(user.id);
    const consumosConDias = transformarFechaADia(consumosRaw);

    const misionesDBResult = await UserService.getUserMisiones(user.id);
    const dataMisiones = misionesDBResult.map(m => ({
        name: m.estado_mision,
        value: Number(m.cantidad_misiones),
    }));

    return NextResponse.json(
        {
            walletData,
            consumos: consumosConDias,
            misiones: dataMisiones,
        },
        { status: 200 }
    );
}
