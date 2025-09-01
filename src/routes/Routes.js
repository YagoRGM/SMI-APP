import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Animatable from "react-native-animatable";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import Splash from "../screens/Splash";
import Inicio from "../screens/Inicio";
import ListarMaquina from "../screens/ListarMaquina";
import Camera from "../screens/Camera";
import Notificacoes from "../screens/Notificacoes";
import Perfil from "../screens/Perfil";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

function HomeTabs(props) {
  const [selected, setSelected] = useState("Início");

  const tabs = [
    { name: "Início", icon: "home" },
    { name: "Máquinas", icon: "list" },
    { name: "Câmera", icon: "camera" },
    { name: "Notificações", icon: "bell" },
    { name: "Perfil", icon: "user" },
  ];

  const renderScreen = () => {
    switch (selected) {
      case "Início":
        return <Inicio {...props} />;
      case "Máquinas":
        return <ListarMaquina {...props} />;
      case "Câmera":
        return <Camera {...props} />;
      case "Notificações":
        return <Notificacoes {...props} />;
      case "Perfil":
        return <Perfil {...props} />;
      default:
        return <Inicio {...props} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        {tabs.map(tab => {
          const isActive = selected === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabButton}
              onPress={() => setSelected(tab.name)}
              activeOpacity={0.7}
            >
              <Animatable.View
                animation={isActive ? "pulse" : undefined}
                style={[
                  styles.iconContainer,
                  isActive && styles.activeBackground,
                  isActive && styles.elevated,
                  isActive && styles.floating,
                ]}
              >
                <FontAwesome5
                  name={tab.icon}
                  size={isActive ? 28 : 22}
                  color={isActive ? "#0C254E" : "#fff"}
                />
              </Animatable.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Home">
          {props => <HomeTabs {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Perfil">
          {props => <Perfil {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdf5f0" },
  content: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#0C254E",
    borderTopWidth: 1,
    borderColor: "#0C254E",
  },
  tabButton: { alignItems: "center" },
  iconContainer: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  activeBackground: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 14,
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  floating: {
    marginBottom: 22,
  },
});
