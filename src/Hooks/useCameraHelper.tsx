import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import type {Face, FaceDetectorOptions} from 'react-native-vision-camera-face-detector';

export function useCameraHelper() {
  const faceW = useRef(new Animated.Value(0)).current;
  const faceH = useRef(new Animated.Value(0)).current;
  const faceX = useRef(new Animated.Value(0)).current;
  const faceY = useRef(new Animated.Value(0)).current;
  const faceRotation = useRef(new Animated.Value(0)).current;

  const faceDetectionOptions = useRef<FaceDetectorOptions>({autoMode: true, performanceMode: 'fast'}).current;

  const onFaceDetected = useCallback(
    (faces: Face[]) => {
      const face = faces[0];

      if (!face) {
        faceW.setValue(0);
        faceH.setValue(0);
        faceX.setValue(0);
        faceY.setValue(0);
        
        return;
      }

      const { bounds } = face;

      faceW.setValue(bounds.width);
      faceH.setValue(bounds.height);
      faceX.setValue(bounds.x);
      faceY.setValue(bounds.y);
      faceRotation.setValue(face.rollAngle);
    },
    [faceH, faceRotation, faceW, faceX, faceY]
  );

  return {
    faceDetectionOptions,
    faceH,
    faceRotation,
    faceW,
    faceX,
    faceY,
    onFaceDetected,
  };
}