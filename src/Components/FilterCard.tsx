import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Filtro = { id: string; nombre: string; color: string; imagen: any };

type Props = {
  filtro: Filtro;
  onPress: () => void;
};

export function FilterCard({ filtro, onPress }: Props) {
  return (
    <Pressable style={styles.tarjeta} onPress={onPress}>
      <View style={[styles.circulo, { backgroundColor: filtro.color }]}>
        <Image source={filtro.imagen} style={styles.imagen} resizeMode="contain" />
      </View>
      
      <Text style={styles.nombre}>{filtro.nombre}</Text>
      <Text style={styles.accion}>Probar en cámara</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flex: 1,
    margin: 8,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  circulo: { 
    width: 84, 
    height: 84, 
    borderRadius: 42, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 10 
  },

  imagen: { 
    width: 52, 
    height: 52 
  },

  nombre: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: 'rgb(43, 38, 48)' 
  },

  accion: { fontSize: 12, 
    color: 'rgb(239, 79, 122)', 
    marginTop: 4, 
    fontWeight: '600' 
  },
});