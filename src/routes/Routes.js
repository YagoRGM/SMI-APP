import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
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
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#001943',
          borderTopColor: '#053172',
          height: 80,
          padding: 16,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Inicio') {
            return <FontAwesome name="home" size={size} color={color} />;
          } else if (route.name === 'ListarMaquina') {
            return <FontAwesome name="list-ul" size={size} color={color} />;
          } else if (route.name === 'QrCode') {
            return <FontAwesome name="qrcode" size={size} color={color} />;
          } else if (route.name === 'Notificacoes') {
            return <FontAwesome name="bell" size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            return <FontAwesome name="user" size={size} color={color} />;
          }
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
