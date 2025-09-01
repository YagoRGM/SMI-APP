import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Perfil({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Você não está logado 😢</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 20 },
  button: {
    backgroundColor: "#0C254E",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
