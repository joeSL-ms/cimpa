import * as notEl from "@/components/uiPersonalizada/notificacionesElements/elements";

const NotificacionesMenu = ({ data, datanormas}: { data: string[], datanormas:string[] }) => {
    return (
        <>
            <notEl.Header></notEl.Header>
            <notEl.Body data={data} datanormas={datanormas}></notEl.Body>
        </>
    );
}
export default NotificacionesMenu