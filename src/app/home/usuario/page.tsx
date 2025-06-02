"use client";
import { useEffect, useState } from "react";
import { UserMenu } from "@/components/menuStatics";
import { UserCard } from "@/components/uiPersonalizada/cards";
import EmpresaCalendar from "@/components/uiPersonalizada/calendar/calendario";
import { formatearAnotaciones, Anotacion } from "@/lib/utils/parseAnotaciones";

const data_user = {
  Nombre_Completo: "Cuenta Asociada",
  Departamento: "Departamento ",
  Tipo_de_Vehiculo: "No especificado",
  Medio_de_Transporte: "No especificado",
  media_consumo: 0,
  Correo_Electronico: "cuanta@asociada.com",
  Telefono: "623324189",
};

export default function Page() {
  const [usuarioData, setUsuarioData] = useState(null);
  const [anotaciones, setAnotaciones] = useState<Anotacion[]>([]);
  const [walletData, setWalletData] = useState([]);
  const [consumos, setConsumos] = useState([]);
  const [misiones, setMisiones] = useState([]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`/api/usuarios/me`);
        if (!response.ok) throw new Error(`Error al obtener usuario: ${response.status}`);
        const data = await response.json();
        setUsuarioData(data.usuario);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    const fetchAnotaciones = async () => {
      try {
        const response = await fetch(`/api/anotaciones`);
        if (!response.ok) throw new Error(`Error al obtener anotaciones: ${response.status}`);
        const data = await response.json();

        console.log("📦 Anotaciones crudas:", data);

        if (Array.isArray(data)) {
          const anotacionesFormateadas = formatearAnotaciones(data);
          setAnotaciones(anotacionesFormateadas);
        } else {
          console.warn("Formato inesperado de anotaciones:", data);
        }
      } catch (error) {
        console.error("Error al obtener anotaciones:", error);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`/api/usuarios/consumo`);
        if (!response.ok) throw new Error(`Error al obtener dashboard: ${response.status}`);
        const data = await response.json();
        
        setWalletData(data.walletData || []);
        setConsumos(data.consumos || []);
        setMisiones(data.misiones || []);
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    };
    fetchUsuario();
    fetchAnotaciones();
    fetchDashboardData();
  }, []);

  return (
    <section className="mx-auto px-16 py-4 h-full" style={{ background: "#F2EFF6" }}>
      <UserMenu
        className="flex gap-10"
        dataCo2={consumos}
        dataMisiones={misiones}
        dataMovimientos={walletData}
      >
        <article className="flex-1 flex flex-col gap-4">
          <UserCard data={usuarioData ?? data_user} />
          <EmpresaCalendar data={anotaciones} />
        </article>
      </UserMenu>
    </section>
  );
}
