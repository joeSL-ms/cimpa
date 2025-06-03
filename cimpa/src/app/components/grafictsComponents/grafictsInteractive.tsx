import {
    PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ComposedChart, Area, Bar, Scatter, BarChart,
    ReferenceLine, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    AreaChart

} from 'recharts';

import { DataPointProps } from '@/components/grafictsComponents/interface';
import { DataPointPropD } from '@/components/grafictsComponents/interface';
import { DataPointPropsC } from '@/components/grafictsComponents/interface';
import { DataPointPropsP } from '@/components/grafictsComponents/interface';
import { DataPointTypeC } from '@/components/grafictsComponents/interface';

interface renderCustmoizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: renderCustmoizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieChartWithCustomizedLabel = ({ data, height = 300 }: DataPointPropsC) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart width={400} height={400}>
                <Tooltip />
                <Legend />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

const Example = ({ height, data = [] }: ExamplePropsL) => {
    if (data.length === 0) {
        return <div style={{ height }}>No hay datos disponibles</div>; // o null si prefieres no mostrar nada
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consumo" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};
type ExamplePropsL = {
    data: { hora: string; consumo: number }[];
    height?: number;
};
type ExampleProps = {
    data: { dia: string; consumo: number }[];
    height?: number;
};
type EcpProps = {
    data: { hora: string; wallet: number }[];
    height?: number;
};
type BarData = {
    dia: string;
    ingreso?: number;
    gasto?: number;
};

type BarEcoPorDiaProps = {
    data: BarData[];
    dataKey: keyof Omit<BarData, 'dia'>; // 'ingreso' | 'gasto'
    color?: string;
};

const BarEcoPorDia = ({ data, dataKey, color = "#60A5FA" }: BarEcoPorDiaProps) => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={dataKey} fill={color} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


const LinerBar = ({ data, height = 300 }: ExampleProps) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consumo" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

const LinerBarEco = ({ data, height = 300 }: EcpProps) => {
    const lastN = 6;
    const extraSpaces = 2;

    // 1. Tomar los últimos N datos
    const visibleData = data.slice(-lastN);

    // 2. Agregar espacios vacíos
    const paddedData = [
        ...visibleData,
        ...Array(extraSpaces).fill(null).map(() => ({
            hora: `${""}`,
            wallet: null
        }))
    ];

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart
                data={paddedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                {/* Fondo desactivado */}
                <CartesianGrid vertical={false} horizontal={false} />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="wallet"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    dot={false} // Opcional: quitar puntos en el espacio vacío
                    connectNulls={false} // No conecta los puntos vacíos
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

const LineBarAreaComposedChar = ({ data, height = 300 }: DataPointProps) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <ComposedChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="total" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="ingreso" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="gasto" stroke="#ff7300" />
                <Scatter dataKey="cnt" fill="red" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

const PositiveAndNegativeBarChart = ({ data, height = 300 }: DataPointProps) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}

const SimpleRadarChart = ({ data, width = 100, height = 300 }: DataPointPropsP) => {
    return (
        <ResponsiveContainer width={width + "%"} height={height}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#B9436B" />  {/* Color de la malla */}
                <PolarAngleAxis dataKey="subject" stroke="#6A4C0C" />  {/* Color del eje angular */}
                <PolarRadiusAxis stroke="#6A4C0C" />  {/* Color de las líneas radiales (márgenes numéricos) */}
                <Radar
                    name="Mike"
                    dataKey="A"
                    stroke="#B9436B"
                    fill="#B9436B"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}

const StackedArea = ({ data, height = 300 }: DataPointProps) => {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

const formatNumberShort = (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}k`;
    return `${num}`;
};

const normalizeDataConditional = (data: DataPointTypeC[]): (DataPointTypeC & { scaledValue: number })[] => {
    const bigValues = data.filter(d => d.value > 1000);
    const maxLog = bigValues.length > 0
        ? Math.max(...bigValues.map(d => Math.log10(d.value)))
        : 1;

    return data.map(d => {
        if (d.value <= 1000) {
            return { ...d, scaledValue: d.value };
        } else {
            const scaled = (Math.log10(d.value) / maxLog) * 100;
            return { ...d, scaledValue: scaled };
        }
    });
};

const normalizeDataWithNegatives = (data: DataPointTypeC[]): (DataPointTypeC & { scaledValue: number })[] => {
    const maxAbsValue = Math.max(...data.map(d => Math.abs(d.value)));

    return data.map(d => {
        let scaled = (Math.abs(d.value) / maxAbsValue) * 100;

        const MIN_SCALE = 10;
        if (scaled < MIN_SCALE && d.value !== 0) scaled = MIN_SCALE;

        return {
            ...d,
            scaledValue: scaled,
        };
    });
};


const TwoLevelPieChart = ({ data01, data02, height = 300 }: DataPointPropD) => {
    const normalizedData01 = normalizeDataConditional(data01); // interior, como antes
    const normalizedData02 = normalizeDataWithNegatives(data02); // exterior, con negativos

    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart width={400} height={400}>
                <Pie
                    data={normalizedData01}
                    dataKey="scaledValue"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                />
                <Pie
                    data={normalizedData02}
                    dataKey="scaledValue"
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={110}
                />
                <Legend
                    layout="horizontal"
                    verticalAlign="top"
                    align="right"
                />
                <Tooltip
                    formatter={(value: number | string, name: string) => {
                        const originalData = [...data01, ...data02].find(d => d.name === name);
                        return [formatNumberShort(originalData?.value ?? value), name];
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export {
    Example,
    LinerBarEco,
    BarEcoPorDia,
    LinerBar,
    LineBarAreaComposedChar,
    StackedArea,
    PositiveAndNegativeBarChart,
    SimpleRadarChart,
    TwoLevelPieChart,
    PieChartWithCustomizedLabel,
    renderCustomizedLabel
}
