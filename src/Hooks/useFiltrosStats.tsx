import { useMemo, useState } from 'react';

type Filtro = { id: string; nombre: string; color: string; imagen: any };

export function useFiltrosStats(filtrosDisponibles: Filtro[]) {
  const [historialUsos, setHistorialUsos] = useState<string[]>([]);

  function registrarUso(filtroId: string) {
    setHistorialUsos((historialUsosAnterior) => historialUsosAnterior.concat(filtroId));
  }

  const estadisticas = useMemo(() => {
    const descubiertos: string[] = [];
    const conteo: { [key: string]: number } = {};

    for (let i = 0; i < historialUsos.length; i++) {
      const id = historialUsos[i];

      if (descubiertos.indexOf(id) === -1) {
        descubiertos.push(id);
      }

      if (conteo[id]) {
        conteo[id] = conteo[id] + 1;
      } else {
        conteo[id] = 1;
      }
    }

    const totalUsos = historialUsos.length;
    const totalFiltros = filtrosDisponibles.length;
    const progreso = totalFiltros === 0 ? 0 : (descubiertos.length / totalFiltros) * 100;
    const ultimoFiltroId = totalUsos === 0 ? null : historialUsos[totalUsos - 1];

    let filtroMasUsadoId: string | null = null;
    let maxUsos = 0;

    for (let i = 0; i < filtrosDisponibles.length; i++) {
      const id = filtrosDisponibles[i].id;
      const usos = conteo[id] || 0;

      if (usos > maxUsos) {
        maxUsos = usos;
        filtroMasUsadoId = id;
      }
    }

    const usoPorFiltro = filtrosDisponibles.map((filtro) => {
      const usos = conteo[filtro.id] || 0;
      const porcentaje = totalUsos === 0 ? 0 : (usos / totalUsos) * 100;
      
      return {
        id: filtro.id,
        nombre: filtro.nombre,
        color: filtro.color,
        imagen: filtro.imagen,
        usos,
        porcentaje,
      };
    });

    return {
      descubiertosCount: descubiertos.length,
      totalFiltros,
      progreso,
      totalUsos,
      ultimoFiltroId,
      filtroMasUsadoId,
      usoPorFiltro,
    };
  }, [historialUsos, filtrosDisponibles]);

  return {
    historialUsos,
    registrarUso,
    ...estadisticas,
  };
}