"use client";
import { MenuStatics } from '@/components/menuStatics';
import { useEffect, useState } from "react";

export default function HomePage() {
  const [walletData, setWalletData] = useState([]);
  const [consumos, setConsumos] = useState([]);
  const [dataDGUInt, setDataDGUInt] = useState([]);
  const [dataDGUExt, setDataDGUExt] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`/api/home`);
        if (!response.ok) throw new Error(`Error al obtener dashboard: ${response.status}`);
        const data = await response.json();

        setWalletData(data.walletData || []);
        setConsumos(data.consumos || []);
        setDataDGUInt(data.dataDGUInt || []);
        setDataDGUExt(data.dataDGUExt || []);
        console.log(dataDGUInt,dataDGUExt)
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    };
    fetchDashboardData();
  }, []); // IMPORTANTE: arreglo de dependencias vacío para que se ejecute sólo una vez

  return (
    <>
      <MenuStatics  dataLB={walletData} data_exterior={dataDGUExt} data_interior={dataDGUInt} exampleData={consumos}/>
    </>
  );
}
