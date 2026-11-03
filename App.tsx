import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import filtrosDisponibles from './src/data/filtros';
import { useFiltrosStats } from './src/Hooks/useFiltrosStats';
import { FiltrosScreen } from './src/Screens/FiltrosScreen';
import { PerfilScreen } from './src/Screens/PerfilScreen';

type Perfil = { nombre: string; usuario: string; descripcion: string };

const Tab = createBottomTabNavigator();

export default function App() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  const {
    registrarUso,
    descubiertosCount,
    totalFiltros,
    progreso,
    totalUsos,
    ultimoFiltroId,
    filtroMasUsadoId,
    usoPorFiltro,
  } = useFiltrosStats(filtrosDisponibles);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'rgb(239, 79, 122)',
            tabBarInactiveTintColor: 'rgb(179, 171, 184)',
            tabBarStyle: { backgroundColor: 'rgb(255, 247, 241)', borderTopWidth: 0, height: 70, paddingTop: 8 },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          }}
        >
          <Tab.Screen
            name="Filtros"
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" color={color} size={size} />,
            }}
          >
            {() => (
              <FiltrosScreen
                filtrosDisponibles={filtrosDisponibles}
                registrarUso={registrarUso}
                nombrePerfil={perfil ? perfil.nombre : null}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Perfil"
            options={{
              tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
            }}
          >
            {() => (
              <PerfilScreen
                descubiertosCount={descubiertosCount}
                totalFiltros={totalFiltros}
                progreso={progreso}
                totalUsos={totalUsos}
                ultimoFiltroId={ultimoFiltroId}
                filtroMasUsadoId={filtroMasUsadoId}
                usoPorFiltro={usoPorFiltro}
                filtros={filtrosDisponibles}
                perfil={perfil}
                guardarPerfil={setPerfil}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}