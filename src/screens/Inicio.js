import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function Inicio() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/img/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.companyName}>
          SMI - Sistema de Monitoramento Industrial
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao SMI!</Text>
        <Text style={styles.mission}>
          Nossa missão é transformar dados em eficiência, conectando tecnologia
          e indústria para um futuro mais inteligente e sustentável.
        </Text>
        <Text style={styles.description}>
          O SMI é um aplicativo inovador que permite o monitoramento em tempo
          real de processos industriais, garantindo segurança, produtividade e
          tomada de decisão baseada em dados.
        </Text>
        <Image
          source={require("../assets/img/logo1.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.footer}>© 2025 SMI Tech • Todos os direitos reservados</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2c5364",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  companyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: 10,
    textAlign: "center",
  },
  mission: {
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: 220,
    height: 120,
    borderRadius: 12,
    marginTop: 8,
  },
  footer: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 16,
    textAlign: "center",
  },
});
