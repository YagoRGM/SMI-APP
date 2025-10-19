import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 5000); // ou use onAnimationFinish
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/lottie/Splash2.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0B2D5F" },
  lottie: { width: width + 130, height: height },
});
