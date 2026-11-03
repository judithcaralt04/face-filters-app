import { render, screen } from '@testing-library/react-native';
import { describe, expect, test } from '@jest/globals';
import { AnaliticasFiltros } from '../src/Components/AnaliticasFiltros';

describe('Conjunto de tests del componente AnaliticasFiltros', () => {
  test('muestra "Sin actividad" cuando no hay ultimo filtro', async () => {
    await render(
      <AnaliticasFiltros
        ultimoFiltroNombre={null}
        filtroMasUsadoNombre={null}
        usoPorFiltro={[]}
        totalUsos={0}
      />
    );
    
    expect(screen.getAllByText('Sin actividad').length).toBe(2);
  });

  test('muestra el nombre y los usos de cada filtro', async () => {
    await render(
      <AnaliticasFiltros
        ultimoFiltroNombre="Gafas"
        filtroMasUsadoNombre="Gafas"
        usoPorFiltro={[
          { id: 'gafas', nombre: 'Gafas', color: 'rgb(255, 220, 203)', imagen: 1, usos: 3, porcentaje: 75 },
          { id: 'sombrero', nombre: 'Sombrero de paja', color: 'rgb(255, 231, 168)', imagen: 1, usos: 1, porcentaje: 25 },
        ]}
        totalUsos={4}
      />
    );

    expect(screen.getAllByText('Gafas').length).toBe(3);
    expect(screen.getByText('3 usos')).toBeTruthy();
    expect(screen.getByText('75%')).toBeTruthy();
    expect(screen.getByText('4 usos')).toBeTruthy();
  });
});