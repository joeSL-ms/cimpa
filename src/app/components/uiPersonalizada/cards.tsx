interface data_ui {
    
    Nombre_Completo: string,
    Departamento: string,
    Tipo_de_Vehiculo: string,
    Medio_de_Transporte: string,
    media_consumo: number,
    Correo_Electronico: string,
    Telefono: string,
}

const UserCard = ({ data }: { data: data_ui }) => {
    const classContainer = "border-2 p-4 rounded-lg border border-[#F7941D]";
    return (
        <>
            <div className={classContainer}>
                <h1>Nombre del Usuario: {data.Nombre_Completo}</h1>
            </div>
            <div className={classContainer}>
                <h2>Información</h2>
                <div>
                    <h3>transporte: {data.Medio_de_Transporte}</h3>
                    <ul>
                        <li>tipo: {data.Tipo_de_Vehiculo}</li>
                        <li>Media consumo: {0.59}CO2/km</li>
                    </ul>
                </div>
            </div>
            <div className={classContainer}>
                <ul>
                    <li>Email: {data.Correo_Electronico} </li>
                    <li>Telefono: {data.Telefono}</li>
                    <li>Departamento: {data.Departamento}</li>
                </ul>
            </div>
        </>
    );
}
export {
    UserCard
}