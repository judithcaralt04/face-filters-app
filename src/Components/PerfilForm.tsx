import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  onGuardar: (perfil: { nombre: string; usuario: string; descripcion: string }) => void;
};

export function PerfilForm({ onGuardar }: Props) {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [guardado, setGuardado] = useState(false);

  function validar() {
    if (nombre.trim() === '') {
      return 'El nombre es obligatorio';
    }

    if (usuario.length > 20) {
      return 'El usuario no puede superar los 20 caracteres';
    }

    if (descripcion.length > 200) {
      return 'La descripción no puede superar los 200 caracteres';
    }

    if (descripcion.indexOf('\n\n\n') !== -1) {
      return 'No puede haber más de 2 saltos de línea seguidos';
    }

    if (descripcion.startsWith('\n') || descripcion.endsWith('\n')) {
      return 'No puede haber un salto de línea sin contenido';
    }

    return '';
  }

  function guardarPerfil() {
    const mensajeError = validar();
    if (mensajeError !== '') {
      setError(mensajeError);
      setGuardado(false);
      
      return;
    }

    setError('');
    setGuardado(true);
    onGuardar({ nombre, usuario, descripcion });
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Crea tu perfil</Text>

      <Text style={styles.etiqueta}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        placeholderTextColor="#b3abb8"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.etiqueta}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="@tu_usuario"
        placeholderTextColor="#b3abb8"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.etiqueta}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.inputMultilinea]}
        placeholder="Cuéntanos algo sobre ti"
        placeholderTextColor="#b3abb8"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {guardado && error === '' && <Text style={styles.exito}>Perfil guardado</Text>}

      <Pressable style={styles.boton} onPress={guardarPerfil}>
        <Text style={styles.botonTexto}>Guardar perfil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { 
    backgroundColor: 'rgb(255, 255, 255)', 
    borderRadius: 18, 
    padding: 18, 
    marginBottom: 16, 
    shadowColor: 'rgb(0, 0, 0)', 
    shadowOpacity: 0.05, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 1 },

  titulo: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)', 
    marginBottom: 12 
  },

  etiqueta: { 
    fontSize: 12, 
    color: 'rgb(139, 133, 145)', 
    marginBottom: 4, 
    marginTop: 10, 
    fontWeight: '600' 
  },

  input: { 
    borderWidth: 1, 
    borderColor: 'rgb(238, 227, 221)', 
    backgroundColor: 'rgb(255, 250, 246)', 
    borderRadius: 10, 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    fontSize: 15, 
    color: 'rgb(43, 38, 48)' 
  },

  inputMultilinea: { 
    minHeight: 80, 
    textAlignVertical: 'top' 
  },

  error: { 
    color: 'rgb(193, 59, 59)', 
    marginTop: 10, 
    fontSize: 13 
  },

  exito: { 
    color: 'rgb(42, 157, 143)', 
    marginTop: 10, 
    fontSize: 13 
  },

  boton: { 
    backgroundColor: 'rgb(239, 79, 122)', 
    borderRadius: 24, 
    paddingVertical: 14, 
    alignItems: 'center', 
    marginTop: 16 
  },

  botonTexto: { 
    color: 'rgb(255, 255, 255)', 
    fontWeight: '700', 
    fontSize: 15 
  }
});