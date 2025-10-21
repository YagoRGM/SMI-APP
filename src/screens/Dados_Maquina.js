import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header_stack";
import { useNavigation } from "@react-navigation/native";

export default function DadosMaquina() {
    const sensores = [
        { nome: "Temperatura Motor", valor: "27°C", icon: "thermometer", color: "#ff5252" },
        { nome: "Vibração", valor: "1.3 m/s²", icon: "vibrate", color: "#00bfa5" },
        { nome: "Pressão", valor: "8.1 bar", icon: "gauge", color: "#64b5f6" },
        { nome: "Energia", valor: "4.2 kWh", icon: "flash", color: "#ffb300" },
        { nome: "Umidade", valor: "45%", icon: "water-percent", color: "#2196f3" },
    ];

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header title="Dados dos Sensores" onPressBack={() => navigation.goBack()} />
            <ScrollView style={styles.scroll}>
                {sensores.map((sensor, i) => (
                    <View
                        key={i}
                        style={[
                            styles.sensorCard,
                            { backgroundColor: sensor.color },
                        ]}
                    >
                        <MaterialCommunityIcons name={sensor.icon} size={32} color="#fff" />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.sensorName}>{sensor.nome}</Text>
                            <Text style={styles.sensorValue}>{sensor.valor}</Text>
                        </View>
                        {i === 0 && (
                            <View style={styles.latestBadge}>
                                <Text style={styles.latestText}>Último</Text>
                            </View>
                        )}
                    </View>
                ))}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0a192f" },
    scroll: { padding: 16 },

    sensorCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        position: "relative",
    },
    sensorName: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    sensorValue: { color: "#eee", fontSize: 14, marginTop: 2 },

    latestBadge: {
        position: "absolute",
        top: 8,
        right: 10,
        backgroundColor: "#ffeb3b",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    latestText: { color: "#000", fontWeight: "bold", fontSize: 12 },
});
