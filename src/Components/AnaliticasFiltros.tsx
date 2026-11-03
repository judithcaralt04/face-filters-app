import { Image, StyleSheet, Text, View } from 'react-native';

type UsoFiltro = { id: string; nombre: string; color: string; imagen: any; usos: number; porcentaje: number };

type Props = {
  ultimoFiltroNombre: string | null;
  filtroMasUsadoNombre: string | null;
  usoPorFiltro: UsoFiltro[];
  totalUsos: number;
};

export function AnaliticasFiltros({ultimoFiltroNombre, filtroMasUsadoNombre, usoPorFiltro, totalUsos}: Props) {
  return (
    <View>
      <Text style={styles.titulo}>Tus analíticas</Text>

      <View style={styles.filaResumen}>
        <View style={styles.tarjetaResumen}>
          <Text style={styles.etiquetaResumen}>Último filtro</Text>
          <Text style={styles.valorResumen}>{ultimoFiltroNombre ?? 'Sin actividad'}</Text>
          {!ultimoFiltroNombre && <Text style={styles.hint}>Prueba tu primer filtro</Text>}
        </View>

        <View style={styles.tarjetaResumen}>
          <Text style={styles.etiquetaResumen}>Más usado</Text>
          <Text style={styles.valorResumen}>{filtroMasUsadoNombre ?? 'Sin actividad'}</Text>
          {!filtroMasUsadoNombre && <Text style={styles.hint}>Prueba tu primer filtro</Text>}
        </View>
      </View>

      <View style={styles.tarjetaLista}>
        <View style={styles.filaSubtitulo}>
          <Text style={styles.subtitulo}>Uso por filtro</Text>
          <Text style={styles.totalUsos}>{totalUsos} usos</Text>
        </View>

        {usoPorFiltro.map((item) => (
          <View key={item.id} style={styles.filaUso}>
            <View style={[styles.circuloChico, { backgroundColor: item.color }]}>
              <Image source={item.imagen} style={styles.imagenChica} resizeMode="contain" />
            </View>

            <View style={styles.infoUso}>
              <Text style={styles.nombreFiltro}>{item.nombre}</Text>
              <Text style={styles.usos}>{item.usos} usos</Text>
            </View>

            <Text style={styles.porcentajeUso}>{Math.round(item.porcentaje)}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)', 
    marginBottom: 10 
  },

  filaResumen: { 
    flexDirection: 'row', 
    marginBottom: 16 
  },
  
  tarjetaResumen: { 
    flex: 1, 
    backgroundColor: 'rgb(255, 255, 255)', 
    borderRadius: 16, 
    padding: 14, 
    marginRight: 10, 
    shadowColor: 'rgb(0, 0, 0)', 
    shadowOpacity: 0.05, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 1 
  },

  etiquetaResumen: { 
    fontSize: 11, 
    color: 'rgb(139, 133, 145)' 
  },

  valorResumen: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)', 
    marginTop: 4 
  },

  hint: { 
    fontSize: 11, 
    color: 'rgb(239, 79, 122)', 
    marginTop: 4, 
    fontWeight: '600' 
  },

  tarjetaLista: { 
    backgroundColor: 'rgb(255, 255, 255)', 
    borderRadius: 18, 
    padding: 16, 
    shadowColor: 'rgb(0, 0, 0)', 
    shadowOpacity: 0.05, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 1 
  },

  filaSubtitulo: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },

  subtitulo: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)' 
  },

  totalUsos: { 
    fontSize: 12, 
    color: 'rgb(139, 133, 145)' 
  },

  filaUso: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgb(243, 233, 227)' 
  },

  circuloChico: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 12 
  },

  imagenChica: { 
    width: 24, 
    height: 24 
  },

  infoUso: { 
    flex: 1 
  },

  nombreFiltro: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: 'rgb(43, 38, 48)' 
  },

  usos: { 
    fontSize: 12, 
    color: 'rgb(139, 133, 145)', 
    marginTop: 2 
  },

  porcentajeUso: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)' 
  }
});