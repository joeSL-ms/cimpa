"use client"
import {
    Example,
    LinerBarEco,
    BarEcoPorDia,
    LinerBar,
    LineBarAreaComposedChar,
    TwoLevelPieChart,
    PieChartWithCustomizedLabel,
} from '@/components/grafictsComponents/grafictsInteractive';
import type { WalletProps } from '@/types/typewallet';
import * as DataComponents from "@/components/data/dataComponents";
import * as Interfaces from "@/components/grafictsComponents/interface"

/*
const GridElement = ({ children }: { children: React.ReactNode }) => {
    return <article className="mg-t-[10px] w-full">{children}</article>;
}*/
const BgGrafic = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 p-4 bg-blue-200 rounded-lg border border-[#F7941D]">
            {children}
        </div>
    );
}
const GridElementGrafic = ({ children, className = "w-full", title }: { children: React.ReactNode, className?: string, title: string }) => {
    return (
        <article className={className}>
            <h1 className="text-2xl font-bold text-center m-5">{title}</h1>
            {children}
            <div className="p-4 bg-white rounded-lg mt-4">
                <h2>Informacion adicional</h2>
                <p>En esta seccion se presentan las estadisticas lineales</p>
            </div>
        </article>
    );
}
const GridElement = ({ children, className = "w-full", title }: { children: React.ReactNode, className?: string, title: string }) => {
    return (
        <article className={className}>
            <h1 className="text-2xl font-bold text-center m-5">{title}</h1>
            {children}
        </article>
    );
}

type GridBodyGraficProps = {
    dataLB?: Interfaces.DataPointType[];
    data_interior?: Interfaces.DataPointTypeC[];
    data_exterior?: Interfaces.DataPointTypeC[];
    exampleData?: { hora: string; consumo: number }[]; 
    className?: string;
};

const GridBodyGrafic = ({
    dataLB = [],
    data_interior = [],
    data_exterior = [],
    exampleData = [],
    className = "w-full",
}: GridBodyGraficProps) => {
    return (
        <article className={className}>
            <div className="grid grid-rows-[auto_1fr] gap-4 ">
                {/* Fila superior: dos columnas */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-200 rounded-lg">
                        <LineBarAreaComposedChar data={dataLB} />
                    </div>
                    <div className="p-4 bg-blue-200 rounded-lg">
                        <TwoLevelPieChart data01={data_interior} data02={data_exterior} />
                    </div>
                </div>
                {/* Fila inferior: gráfico de líneas ocupa todo el ancho */}
                <div className="p-4 bg-blue-200 rounded-lg">
                    <Example height={300} data={exampleData} />
                </div>
            </div>
        </article>
    );
};


const WalletMenu = ({
    dataEcotime = [],
    dataIngreso = [],
    dataGastos = [],
}: WalletProps) => {
    return (
        <article className="flex flex-col gap-8 p-16">
            <div className="text-center font-bold text-lg">
                <h2>Cartera ecológica</h2>
            </div>
            <LinerBarEco data={dataEcotime} />
            <div className="flex gap-4 flex-wrap">
                <BgGrafic>
                    <BarEcoPorDia data={dataIngreso} dataKey="ingreso" />
                </BgGrafic>
                <BgGrafic>
                    <BarEcoPorDia data={dataGastos} dataKey="gasto" />
                </BgGrafic>
            </div>
        </article>
    );
};

export default WalletMenu;

type DataCo2 = { dia: string; consumo: number };
type DataMisiones = { name: string; value: number };
type DataMovimientos = { name: string; gasto: number; ingreso: number; total: number };

const UserMenu = ({
    className = "w-full",
    dataCo2 = [],
    dataMisiones = [],
    dataMovimientos = [],
    children,
}: {
    className?: string;
    dataCo2?: DataCo2[];
    dataMisiones?: DataMisiones[];
    dataMovimientos?: DataMovimientos[];
    children?: React.ReactNode;
}) => {
    const decoration_graf = "p-4 bg-blue-200 rounded-lg border border-[#F7941D] flex flex-col gap-4 ";

    return (
        <section className={className}>
            {children}
            <article className="flex-1 W-1/3 flex flex-col gap-4 justify-around">
                <div className={decoration_graf}>
                    <h2>Consumo CO2</h2>
                    <LinerBar data={dataCo2} height={200} />
                </div>
                <div className={decoration_graf}>
                    <h2>Progreso de las misiones</h2>
                    <PieChartWithCustomizedLabel height={180} data={dataMisiones} />
                </div>
                <div className={decoration_graf}>
                    <h2>Últimos movimientos</h2>
                    <LineBarAreaComposedChar height={200} data={dataMovimientos} />
                </div>
            </article>
        </section>
    );
};

type MenuStaticsProps = {
    dataLB?: Interfaces.DataPointType[];
    data_interior?: Interfaces.DataPointTypeC[];
    data_exterior?: Interfaces.DataPointTypeC[];
    exampleData?: { hora: string; consumo: number }[];
};

const MenuStatics = ({
    dataLB = [],
    data_interior = [],
    data_exterior = [],
    exampleData = [],
}: MenuStaticsProps) => {
    return (
        <>
            <section
                className="flex-1 flex flex-col gap-4 mx-auto px-16 py-4"
                style={{ background: "#F2EFF6" }}
            >
                <div className="p-4 font-bold">
                    <h2>Home</h2>
                </div>
                <article>
                    <Example data={DataComponents.data2} height={300} />
                </article>
                <article className="flex flex-row gap-4">
                    <GridElementGrafic title="CO2 Departamentos" className="w-1/3">
                        <div className="p-6 border-2 border-gray-400 rounded-lg w-full mx-auto shadow-lg  bg-white">
                            <div className="p-4 bg-blue-200 rounded-lg"><PieChartWithCustomizedLabel data={DataComponents.dataPC} /></div>
                        </div>
                    </GridElementGrafic>
                    <GridElement title="Actividad del Usuario" className="w-full">
                        <GridBodyGrafic
                            dataLB={dataLB}
                            data_interior={data_interior}
                            data_exterior={data_exterior}
                            exampleData={exampleData}
                            className="p-6 border-2 border-gray-400 rounded-lg mx-auto shadow-lg bg-white grid grid-rows-[auto_1fr] gap-4 w-full"
                        />
                    </GridElement>
                </article>
            </section>
        </>
    );
};


export { WalletMenu, MenuStatics, UserMenu, GridElement, GridBodyGrafic, GridElementGrafic };