import { render, fireEvent, screen } from '@testing-library/react-native';
import { describe, expect, jest, test } from '@jest/globals';
import { FilterCard } from '../src/Components/FilterCard';

const filtroDePrueba = { id: 'gafas', nombre: 'Gafas', color: 'rgb(255, 220, 203)', imagen: 1 };

describe('Conjunto de tests del componente FilterCard', () => {
  test('muestra el nombre del filtro', async () => {
    await render(<FilterCard filtro={filtroDePrueba} onPress={() => {}} />);

    expect(screen.getByText('Gafas')).toBeTruthy();
  });

  test('llama a onPress al tocar la tarjeta', async () => {
    const onPress = jest.fn();

    await render(<FilterCard filtro={filtroDePrueba} onPress={onPress} />);
    await fireEvent.press(screen.getByText('Probar en cámara'));
    
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});