import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Animated, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function TabBar({ values, onPress }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const animatedValues = useRef(values.map(() => new Animated.Value(0))).current;
  const circleX = useRef(new Animated.Value(0)).current;

  const tabWidth = screenWidth / values.length;

  useEffect(() => {
    values.forEach((_, index) => {
      Animated.timing(animatedValues[index], {
        toValue: index === activeIndex ? -20 : 0, 
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    Animated.spring(circleX, {
      toValue: activeIndex * tabWidth + tabWidth / 2 - (tabWidth * 0.25),
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, [activeIndex]);

  const handlePress = (index) => {
    setActiveIndex(index);
    onPress(index);
  };

  return (
    <View style={styles.container}>
      {/* círculo animado */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX: circleX }, { translateY: animatedValues[activeIndex] }],
            width: tabWidth * 0.5,
          },
        ]}
      />

      {values.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          activeOpacity={0.8}
          onPress={() => handlePress(index)}
        >
          <Animated.View style={{ transform: [{ translateY: animatedValues[index] }] }}>
            <Image
              source={tab.icon}
              style={[
                styles.icon,
                { tintColor: index === activeIndex ? "#fff" : "#333" },
              ]}
            />
            <Text
              style={[
                styles.text,
                { color: index === activeIndex ? "#fff" : "#333" },
              ]}
            >
              {tab.title}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 4,
    resizeMode: "contain",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
  circle: {
    position: "absolute",
    bottom: 0,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000000ff",
    zIndex: 1000,
  },
});
