import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera-face-detector';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterOverlay } from '../Components/FilterOverlay';
import { useCameraHelper } from '../Hooks/useCameraHelper';

type Filtro = {
  id: string;
  nombre: string;
  imagen: any;
  widthFactor: number;
  aspectRatio: number;
  verticalFactor: number;
  horizontalFactor: number;
};

type Props = {
  filtro: Filtro;
  onVolver: () => void;
  onAbrirCamara: (filtroId: string) => void;
  nombrePerfil: string | null;
};

export function CameraScreen({ filtro, onVolver, onAbrirCamara, nombrePerfil }: Props) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraDevices = useCameraDevices();
  const insets = useSafeAreaInsets();
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { faceDetectionOptions, faceH, faceRotation, faceW, faceX, faceY, onFaceDetected } = useCameraHelper();
  const cameraDevice =
    cameraDevices.find((d) => d.position === 'front') ??
    cameraDevices.find((d) => d.position === 'external') ??
    cameraDevices.find((d) => d.position === 'back') ??
    cameraDevices[0];

  const textoInstrucciones = nombrePerfil
    ? `${nombrePerfil}, centra la cara para que se aplique el filtro`
    : 'Coloca tu cara frente a la cámara';

  useEffect(() => {
    async function askForCameraPermission() {
      try {
        if (!hasPermission) await requestPermission();
      } finally {
        setPermissionChecked(true);
      }
    }
    askForCameraPermission();
  }, [hasPermission]);

  useEffect(() => {
    onAbrirCamara(filtro.id);
  }, [filtro.id]);

  if (!permissionChecked) {
    return (
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Comprobando permisos de cámara...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.centeredContent}>
        <Text style={styles.title}>No tienes permiso de cámara</Text>
        <Text style={styles.caption}>Actívalo en los ajustes del dispositivo para poder usar los filtros.</Text>
        <Pressable style={styles.volverButton} onPress={onVolver}>
          <Text style={styles.volverButtonText}>Volver al listado</Text>
        </Pressable>
      </View>
    );
  }

  if (!cameraDevice) {
    return (
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Sin cámara disponible</Text>
        <Pressable style={styles.volverButton} onPress={onVolver}>
          <Text style={styles.volverButtonText}>Volver al listado</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          {...faceDetectionOptions}
          cameraFacing={cameraDevice.position}
          device={cameraDevice}
          isActive
          mirrorMode="auto"
          onError={(cameraError) => setError(cameraError.message)}
          onFacesDetected={onFaceDetected}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
        <FilterOverlay
          faceH={faceH}
          faceRotation={faceRotation}
          faceW={faceW}
          faceX={faceX}
          faceY={faceY}
          imagenFiltro={filtro.imagen}
          widthFactor={filtro.widthFactor}
          aspectRatio={filtro.aspectRatio}
          verticalFactor={filtro.verticalFactor}
          horizontalFactor={filtro.horizontalFactor}
        />
        <View pointerEvents="none" style={[styles.instructions, { top: insets.top + 12 }]}>
          <Text style={styles.instructionsText}>{textoInstrucciones}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.volverButton} onPress={onVolver}>
          <Text style={styles.volverButtonText}>Volver al listado</Text>
        </Pressable>

        <Text style={styles.filterName}>Filtro: {filtro.nombre}</Text>
        <Text style={styles.caption}>Se aplica automáticamente a la primera cara detectada.</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'rgb(21, 21, 29)' 
  },

  cameraContainer: { 
    flex: 1, 
    overflow: 'hidden' 
  },

  centeredContent: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 32, 
    backgroundColor: 'rgb(255, 247, 241)' },

  title: { 
    marginBottom: 12, 
    fontSize: 24, 
    fontWeight: '700', 
    textAlign: 'center', 
    color: 'rgb(37, 35, 42)' 
  },

  instructions: { 
    position: 'absolute', 
    right: 20, 
    left: 20, 
    alignItems: 'center' 
  },

  instructionsText: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    overflow: 'hidden',
    borderRadius: 18,
    fontSize: 15,
    fontWeight: '600',
    color: 'rgb(255, 255, 255)',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  volverButton: { 
    backgroundColor: 'rgb(37, 35, 42)', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8, 
    alignSelf: 'flex-start', 
    marginBottom: 10 
  },

  volverButtonText: { 
    color: 'rgb(255, 255, 255)', 
    fontWeight: '700' 
  },

  footer: { 
    paddingHorizontal: 24, 
    paddingVertical: 18, 
    backgroundColor: 'rgb(255, 247, 241)' 
  },

  filterName: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: 'rgb(37, 35, 42)' 
  },

  caption: { 
    marginTop: 4, 
    fontSize: 14, 
    lineHeight: 20, 
    color: 'rgb(95, 91, 102)', 
    textAlign: 'center' 
  },

  error: { 
    marginTop: 8, 
    color: 'rgb(180, 35, 24)' 
  }
});