import { useMemo } from 'react';
import { Animated } from 'react-native';

type Props = {
  faceH: Animated.Value;
  faceRotation: Animated.Value;
  faceW: Animated.Value;
  faceX: Animated.Value;
  faceY: Animated.Value;
  imagenFiltro: any;
  widthFactor: number;
  aspectRatio: number;
  verticalFactor: number;
  horizontalFactor: number;
};

export function FilterOverlay({faceH, faceRotation, faceW, faceX, faceY, imagenFiltro, widthFactor, aspectRatio, verticalFactor, horizontalFactor}: Props) {
  const filterStyle = useMemo(() => {
    const filterWidth = Animated.multiply(faceW, widthFactor);
    const filterHeight = Animated.divide(filterWidth, aspectRatio);
    const desplazamientoX = Animated.multiply(faceW, horizontalFactor);
    const faceCenterX = Animated.add(Animated.add(faceX, Animated.divide(faceW, 2)), desplazamientoX);
    const anchorY = Animated.add(faceY, Animated.multiply(faceH, verticalFactor));

    return {
      position: 'absolute' as const,
      left: Animated.subtract(faceCenterX, Animated.divide(filterWidth, 2)),
      top: Animated.subtract(anchorY, Animated.divide(filterHeight, 2)),
      width: filterWidth,
      height: filterHeight,
      opacity: faceW.interpolate({inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' as const}),
      transform: [
        {
          rotate: faceRotation.interpolate({inputRange: [-180, 180], outputRange: ['-180deg', '180deg'],})
        },
      ],
    };
  }, [faceH, faceRotation, faceW, faceX, faceY, widthFactor, aspectRatio, verticalFactor, horizontalFactor]);

  return (
    <Animated.Image
      accessibilityIgnoresInvertColors
      resizeMode="contain"
      source={imagenFiltro}
      style={filterStyle}
    />
  );
}