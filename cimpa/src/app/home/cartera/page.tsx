// Ejemplo usando React (client-side fetching)
"use client"

import { useEffect, useState } from 'react';
import { Wallet } from '@/components/uiPersonalizada/cartera';
import type { WalletProps } from '@/types/typewallet';

export default function HomePageWrapper() {
  const [data, setData] = useState<WalletProps>({
    dataEcotime: [],
    dataIngreso: [],
    dataGastos: []
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/cartera');
      const json = await res.json();
      setData({
        dataEcotime: json.dataEcotime || [],
        dataIngreso: json.dataIngreso || [],
        dataGastos: json.dataGastos || []
      });
    }
    fetchData();
  }, []);

  return (
    <section className="mx-auto px-16 py-4 h-full" style={{ background: '#F2EFF6' }}>
      <Wallet
        dataEcotime={data.dataEcotime}
        dataIngreso={data.dataIngreso}
        dataGastos={data.dataGastos}
      />
    </section>
  );
}
