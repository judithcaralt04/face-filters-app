# Face Filters App (React Native)

A mobile app that applies live face filters through the front camera, with a profile and usage statistics. Built with React Native, Expo and TypeScript as a university project at La Salle Campus Barcelona.

<!-- Add screenshots or a GIF here: docs/screens.png -->

## What it does

- **Filters screen:** a grid of five filters (glasses, straw hat, monocle, red tie and moustache). Tap one to try it on the camera.
- **Camera screen:** detects the face in real time and places the filter image on it, scaled and rotated with the face. It handles missing camera permission and shows clear messages.
- **Profile screen:** a form with validation (required name, 20 character username, 200 character description, no empty line breaks) that personalises the camera instructions.
- **Statistics:** discovered filters and progress, total uses, last used and most used filter, and the usage share of each filter.
- Bottom tab navigation between Filters and Profile.

## Tech stack

- React Native 0.86 with Expo and TypeScript
- React Navigation (bottom tabs)
- `react-native-vision-camera` and `react-native-vision-camera-face-detector` for the camera and face detection
- Jest and React Native Testing Library for component tests

## How it is organised

- `App.tsx`: navigation and app state
- `src/Screens/`: `FiltrosScreen`, `CameraScreen`, `PerfilScreen`
- `src/Components/`: `FilterCard`, `FilterOverlay`, `PerfilForm`, `AnaliticasFiltros`, `ProgresoFiltros`
- `src/Hooks/`: `useCameraHelper` (face position, size and rotation) and `useFiltrosStats` (usage statistics)
- `src/data/filtros.ts`: filter definitions (image, size and position factors)
- `tests/`: component tests

## How to run

The camera libraries use native code, so the app does not run in Expo Go. Use a development build:

```bash
npm install
npx expo run:android   # or: npx expo run:ios
```

To run the tests:

```bash
npm test
```

## Contribution

Developed as a pair assignment for the course. I implemented the application: screens, components, hooks, face-filter overlay, statistics and tests.

## Notes

The UI text is in Spanish. The camera is only used on the device to detect the face and show the filter, and nothing is recorded or sent anywhere.
