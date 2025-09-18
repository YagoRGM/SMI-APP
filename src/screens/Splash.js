import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import * as Animatable from "react-native-animatable";

export default function Splash({ navigation }) {
  useEffect(() => {
    // depois de 2 segundos, troca pra Home (ou Login)
    const timer = setTimeout(() => {
      navigation.replace("MainTabs");
    }, 2300);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        duration={2000}
        source={require("../assets/img/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animatable.Text
        animation="fadeInUp"
        delay={800}
        style={styles.title}
      >
        APP-SMI 🚀
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  logo: { width: 230, height: 150, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
});
