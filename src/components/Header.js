import React from "react";
import { Image, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Header() {
  return (
    <LinearGradient
      colors={['#001943', '#003FA9']} // gradiente azul escuro → azul mais claro
      style={styles.container}
      start={{ x: 0, y: 0 }}   // topo
      end={{ x: 0, y: 1 }}     // fundo
    >
      <Image
        source={require("../assets/img/logo_principal.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#002952",
  },
  logo: {
    width: 160,
    height: 70,
    marginTop: 30,
  },
});
