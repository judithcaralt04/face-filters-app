import { StyleSheet, Text, View } from 'react-native';

type Props = {
  descubiertosCount: number;
  totalFiltros: number;
  progreso: number;
};

export function ProgresoFiltros({ descubiertosCount, totalFiltros, progreso }: Props) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.filaTitulo}>
        <Text style={styles.titulo}>Filtros descubiertos</Text>
        <Text style={styles.porcentaje}>{Math.round(progreso)}%</Text>
      </View>

      <Text style={styles.subtitulo}>Prueba filtros nuevos para completar tu colección</Text>
      
      <View style={styles.barraFondo}>
        <View style={[styles.barraRelleno, { width: `${progreso}%` }]} />
      </View>

      <Text style={styles.contador}>
        {descubiertosCount} de {totalFiltros} filtros probados
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: { 
    backgroundColor: 'rgb(255, 255, 255)', 
    borderRadius: 18, 
    padding: 18, 
    marginBottom: 16, 
    shadowColor: 'rgb(0, 0, 0)', 
    shadowOpacity: 0.05, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 1 
  },

  filaTitulo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },

  titulo: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)' 
  },

  porcentaje: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: 'rgb(239, 79, 122)' 
  },

  subtitulo: { 
    fontSize: 12, 
    color: 'rgb(139, 133, 145)', 
    marginTop: 2 
  },

  barraFondo: { 
    height: 8, 
    backgroundColor: 'rgb(243, 233, 227)', 
    borderRadius: 4, 
    overflow: 'hidden', 
    marginTop: 12 
  },

  barraRelleno: { 
    height: '100%', 
    backgroundColor: 'rgb(239, 79, 122)', 
    borderRadius: 4 
  },

  contador: { 
    fontSize: 12, 
    color: 'rgb(139, 133, 145)', 
    marginTop: 8 
  }
});