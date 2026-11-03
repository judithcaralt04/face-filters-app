import { useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterCard } from '../Components/FilterCard';
import { CameraScreen } from './CameraScreen';

type Filtro = {
  id: string;
  nombre: string;
  color: string;
  imagen: any;
  widthFactor: number;
  aspectRatio: number;
  verticalFactor: number;
  horizontalFactor: number;
};

type Props = {
  filtrosDisponibles: Filtro[];
  registrarUso: (filtroId: string) => void;
  nombrePerfil: string | null;
};

export function FiltrosScreen({ filtrosDisponibles, registrarUso, nombrePerfil }: Props) {
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<Filtro | null>(null);

  if (filtroSeleccionado) {
    return (
      <CameraScreen
        filtro={filtroSeleccionado}
        onVolver={() => setFiltroSeleccionado(null)}
        onAbrirCamara={registrarUso}
        nombrePerfil={nombrePerfil}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Filtros disponibles</Text>
      <FlatList
        data={filtrosDisponibles}
        keyExtractor={(filtro) => filtro.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        columnWrapperStyle={styles.columna}
        renderItem={({ item }) => (
          <FilterCard filtro={item} onPress={() => setFiltroSeleccionado(item)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'rgb(255, 247, 241)', 
    paddingHorizontal: 20, 
    paddingTop: 20 
  },

  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: 'rgb(37, 35, 42)', 
    marginBottom: 16 
  },

  lista: { 
    paddingBottom: 24 
  },

  columna: { 
    justifyContent: 'space-between' 
  }
});