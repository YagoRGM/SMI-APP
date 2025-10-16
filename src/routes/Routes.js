import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Inicio from '../screens/Inicio';
import ListarMaquina from '../screens/ListarMaquina';
import QrCode from '../screens/QrCode';
import Notificacoes from '../screens/Notificacoes';
import Perfil from '../screens/Perfil';
import Header from '../components/Header';
import Splash from '../screens/Splash';
import Detalhes from '../screens/Detalhes';
import AtualizarMaquina from '../screens/Editar_maquina';

import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { height: 90, paddingTop: 10 },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#003FA9', '#001943']} // gradiente azul escuro → azul mais claro
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          />
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'ListarMaquina') iconName = 'format-list-bulleted-square';
          else if (route.name === 'QrCode') iconName = 'qrcode-scan';
          else if (route.name === 'Notificacoes') iconName = 'bell';
          else if (route.name === 'Perfil') iconName = 'account';

          return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="ListarMaquina" component={ListarMaquina} />
      <Tab.Screen name="QrCode" component={QrCode} />
      <Tab.Screen name="Notificacoes" component={Notificacoes} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="AtualizarMaquina" component={AtualizarMaquina} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
