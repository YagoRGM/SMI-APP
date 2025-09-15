import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // <-- modernos
import Inicio from '../screens/Inicio';
import ListarMaquina from '../screens/ListarMaquina';
import QrCode from '../screens/QrCode';
import Notificacoes from '../screens/Notificacoes';
import Perfil from '../screens/Perfil';
import Header from '../components/Header';

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
        tabBarStyle: {
          backgroundColor: '#001943',
          borderTopColor: '#053172',
          height: 60,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'ListarMaquina') {
            iconName = 'format-list-bulleted-square'; 
          } else if (route.name === 'QrCode') {
            iconName = 'qrcode-scan';
          } else if (route.name === 'Notificacoes') {
            iconName = 'bell';
          } else if (route.name === 'Perfil') {
            iconName = 'account';
          }

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
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Header" component={Header} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
