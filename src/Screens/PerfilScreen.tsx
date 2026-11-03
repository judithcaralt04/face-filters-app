import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PerfilForm } from '../Components/PerfilForm';
import { ProgresoFiltros } from '../Components/ProgresoFiltros';
import { AnaliticasFiltros } from '../Components/AnaliticasFiltros';

type Filtro = { id: string; nombre: string; color: string; imagen: any };
type UsoFiltro = { id: string; nombre: string; color: string; imagen: any; usos: number; porcentaje: number };
type Perfil = { nombre: string; usuario: string; descripcion: string };

type Props = {
  descubiertosCount: number;
  totalFiltros: number;
  progreso: number;
  totalUsos: number;
  ultimoFiltroId: string | null;
  filtroMasUsadoId: string | null;
  usoPorFiltro: UsoFiltro[];
  filtros: Filtro[];
  perfil: Perfil | null;
  guardarPerfil: (perfil: Perfil) => void;
};

export function PerfilScreen({descubiertosCount, totalFiltros, progreso, totalUsos, ultimoFiltroId, filtroMasUsadoId, usoPorFiltro, filtros, perfil, guardarPerfil}: Props) {
  function buscarNombreFiltro(filtroId: string | null) {
    if (!filtroId) {
      return null;
    }

    const filtro = filtros.find((item) => item.id === filtroId);
    return filtro ? filtro.nombre : null;
  }

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
      <Text style={styles.etiqueta}>TU ESPACIO</Text>
      <Text style={styles.titulo}>Perfil</Text>

      <PerfilForm onGuardar={guardarPerfil} />

      {perfil && (
        <View style={styles.tarjetaPerfil}>
          <Text style={styles.saludo}>Hola, {perfil.nombre}</Text>
          {perfil.usuario !== '' && <Text style={styles.usuario}>@{perfil.usuario}</Text>}
          {perfil.descripcion !== '' && <Text style={styles.descripcion}>{perfil.descripcion}</Text>}
        </View>
      )}

      <ProgresoFiltros
        descubiertosCount={descubiertosCount}
        totalFiltros={totalFiltros}
        progreso={progreso}
      />

      <AnaliticasFiltros
        ultimoFiltroNombre={buscarNombreFiltro(ultimoFiltroId)}
        filtroMasUsadoNombre={buscarNombreFiltro(filtroMasUsadoId)}
        usoPorFiltro={usoPorFiltro}
        totalUsos={totalUsos}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { 
    flex: 1, 
    backgroundColor: 'rgb(255, 247, 241)' 
  },

  contenido: { 
    paddingTop: 60, 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },

  etiqueta: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: 'rgb(239, 79, 122)', 
    letterSpacing: 1 
  },

  titulo: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)', 
    marginTop: 4, 
    marginBottom: 16 
  },

  tarjetaPerfil: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },

  saludo: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)' 
  },

  usuario: { 
    fontSize: 13, 
    color: 'rgb(139, 133, 145)', 
    marginTop: 2 
  },

  descripcion: { 
    fontSize: 14, 
    color: 'rgb(95, 91, 102)', 
    marginTop: 10, 
    lineHeight: 20 
  }
});