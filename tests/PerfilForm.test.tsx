import { render, fireEvent, screen } from '@testing-library/react-native';
import { describe, expect, jest, test } from '@jest/globals';
import { PerfilForm } from '../src/Components/PerfilForm';

describe('Conjunto de tests del componente PerfilForm', () => {
  test('muestra error si el nombre esta vacio', async () => {
    await render(<PerfilForm onGuardar={() => {}} />);
    await fireEvent.press(screen.getByText('Guardar perfil'));

    expect(await screen.findByText('El nombre es obligatorio')).toBeTruthy();
  });

  test('llama a onGuardar cuando los datos son validos', async () => {
    const onGuardar = jest.fn();

    await render(<PerfilForm onGuardar={onGuardar} />);
    await fireEvent.changeText(screen.getByPlaceholderText('Tu nombre'), 'Judith');
    await fireEvent.press(screen.getByText('Guardar perfil'));
    
    expect(await screen.findByText('Perfil guardado')).toBeTruthy();
    expect(onGuardar).toHaveBeenCalledTimes(1);
  });
});