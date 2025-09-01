import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ListarMaquina() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à listar!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" },
});
