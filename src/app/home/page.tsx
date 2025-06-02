"use client";
import { MenuStatics } from '@/components/menuStatics';
import { useEffect, useState } from "react";

export default function HomePage() {
  const [walletData, setWalletData] = useState([]);
  const [consumos, setConsumos] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`/api/usuarios/consumo`);
        if (!response.ok) throw new Error(`Error al obtener dashboard: ${response.status}`);
        const data = await response.json();

        setWalletData(data.walletData || []);
        setConsumos(data.consumos || []);
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    };
    fetchDashboardData();
  }, []); // IMPORTANTE: arreglo de dependencias vacío para que se ejecute sólo una vez

  return (
    <>
      <MenuStatics dataLB={walletData} exampleData={consumos}/>
    </>
  );
}
