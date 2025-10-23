import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
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
import CadastrarMaquina from '../screens/Cadastrar_Maquina';
import Relatorios from '../screens/Relatorios';
import ChatBot from '../screens/ChatBot';
import Login from '../screens/Login';
import CadastrarUsuario from '../screens/Cadastrar_Usuario';
import EsqueceuSenha from '../screens/Esqueceu_senha';
import DadosMaquina from '../screens/Dados_Maquina';
import DadosGerais from '../screens/Dados_Gerais';
import GerenciarUsuarios from '../screens/Gerenciar_Usuarios';

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
            colors={['#003FA9', '#001943']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
          />
        ),
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Inicio') {
            return (
              <Image
                source={require('../assets/img/home.png')} // coloque o caminho correto
                style={{ width: 26, height: 26, tintColor: color }} // ajusta o tamanho e cor
                resizeMode="contain"
              />
            );
          } else {
            let iconName;
            if (route.name === 'ListarMaquina') iconName = 'format-list-bulleted-square';
            else if (route.name === 'QrCode') iconName = 'qrcode-scan';
            else if (route.name === 'Notificacoes') {
            return (
              <Image
                source={require('../assets/img/sino.png')} // coloque o caminho correto
                style={{ width: 26, height: 26, tintColor: color }} // ajusta o tamanho e cor
                resizeMode="contain"
              />
            );
          } 
            else if (route.name === 'Perfil') iconName = 'account';

            return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
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
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="AtualizarMaquina" component={AtualizarMaquina} />
        <Stack.Screen name="CadastrarMaquina" component={CadastrarMaquina} />
        <Stack.Screen name="Relatorios" component={Relatorios} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
        <Stack.Screen name="DadosMaquina" component={DadosMaquina} />
        <Stack.Screen name="DadosGerais" component={DadosGerais} />
        <Stack.Screen name="GerenciarUsuarios" component={GerenciarUsuarios} />
        <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
