import { render, screen } from '@testing-library/react-native';
import { describe, expect, test } from '@jest/globals';
import { ProgresoFiltros } from '../src/Components/ProgresoFiltros';

describe('Conjunto de tests del componente ProgresoFiltros', () => {
  test('muestra el contador de filtros descubiertos', async () => {
    await render(<ProgresoFiltros descubiertosCount={2} totalFiltros={5} progreso={40} />);
    
    expect(screen.getByText('2 de 5 filtros probados')).toBeTruthy();
  });

  test('muestra el porcentaje redondeado', async () => {
    await render(<ProgresoFiltros descubiertosCount={1} totalFiltros={3} progreso={33.33} />);
    
    expect(screen.getByText('33%')).toBeTruthy();
  });
});