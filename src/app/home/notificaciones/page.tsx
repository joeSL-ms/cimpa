import NotificacionesMenu from "@/components/uiPersonalizada/notificacionesMenu"
import * as data from "@/components/data/dataComponents" 
export default function notificacionesPage() {
    return (
        <section className="mx-auto  px-16 py-4 h-full" style={{ background: '#F2EFF6' }}>
            <NotificacionesMenu data={data.lista} datanormas={data.normas}></NotificacionesMenu>
        </section>
    )
}