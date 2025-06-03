'use client';
import type { Mision } from '@/types/typemision';

import React, { useEffect, useState } from 'react';
import MisionesHome from "@/components/misionesHome";

export default function Page() {
  const [misiones, setMisiones] = useState<Mision[]>([]);

  useEffect(() => {
    const fetchMisiones = async () => {
      try {
        const response = await fetch('/api/misiones', {
          method: 'GET',
          credentials: 'include', // incluye cookies para auth si es necesario
        });

        if (!response.ok) throw new Error(`Error al obtener misiones: ${response.status}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setMisiones(data);
        } else {
          console.warn("Formato inesperado de misiones:", data);
        }
      } catch (error) {
        console.error('Error al obtener misiones:', error);
      }
    };

    fetchMisiones();
  }, []);

  return (
    <section className="mx-auto px-10 py-4">
      <MisionesHome misiones={misiones} />
    </section>
  );
}
