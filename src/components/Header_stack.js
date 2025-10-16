// src/components/Header.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Header({ title, onPressBack }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
        <Entypo name="chevron-left" size={34} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: "#001943",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 30, // dá espaço pra "notch" em iPhone/Android
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
