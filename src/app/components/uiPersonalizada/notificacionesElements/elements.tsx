const Header = () => {
    return (
        <div className="text-center font-bold text-lg p-8">
            <h2>Bienvenido al Centro de notificaciones</h2>
        </div>
    );
}

const LstUpdate = ({ data }: { data: string[] }) => (
    <div>
        <h3 className="text-center text-lg font-semibold mb-2">Últimas Actualizaciones</h3>
        <ul className="list-disc list-inside space-y-1">
            {data.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
);

const ContLws = ({ data }: { data: string[] }) => (
    <div className="mt-4">
        <h3 className="text-center text-lg font-semibold mb-2">Normas</h3>
        <ul className="list-disc list-inside space-y-1">
            {data.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
);
const BgText = ({ children }: { children: React.ReactNode }) => {
    return (
        <article className="p-4 rounded-[24px] border border-[#F7941D]">
            {children}
        </article>
    );
}
const Body = ({ data, datanormas }: { data: string[], datanormas: string[] }) => {
    return (
        <section>
            <div className="flex gap-16">
                <BgText><LstUpdate data={data}></LstUpdate></BgText>
                <BgText><ContLws data={datanormas}></ContLws></BgText>
            </div>
        </section>
    );
}

export {
    Header,
    Body
}