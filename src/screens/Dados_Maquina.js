import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header_stack";
import { useNavigation } from "@react-navigation/native";

export default function DadosMaquina({ route }) {
    const { leitura } = route.params;
    const navigation = useNavigation();

    // formatar data/hora bonitinho
    function formatarData(d) {
        try {
            const dt = new Date(d);
            if (isNaN(dt.getTime())) return d;

            const horas = String(dt.getHours()).padStart(2, "0");
            const minutos = String(dt.getMinutes()).padStart(2, "0");
            const data = dt.toLocaleDateString("pt-BR");

            return `${horas}:${minutos} — ${data}`;
        } catch {
            return d;
        }
    }

    const sensores = [
        { nome: "Temperatura Motor", valor: `${leitura.temperatura}°C`, icon: "thermometer", color: "#ff5252" },
        { nome: "Vibração", valor: `${leitura.vibracao}`, icon: "vibrate", color: "#00bfa5" },
        { nome: "Nível de Gás", valor: `${leitura.gas}%`, icon: "gas-cylinder", color: "#64b5f6" },
        { nome: "Consumo energético", valor: `${leitura.consumo_eletrico} kWh`, icon: "flash", color: "#ffb300" },
        { nome: "Umidade", valor: `${leitura.umidade}%`, icon: "water-percent", color: "#2196f3" },
    ];

    return (
        <View style={styles.container}>
            <Header title="Dados dos Sensores" onPressBack={() => navigation.goBack()} />

            <ScrollView style={styles.scroll}>
                
                <Text style={styles.sectionTitle}>Últimos dados coletados</Text>
                <Text style={styles.sectionSubtitle}>
                    Horário da última leitura: {formatarData(leitura.data_hora)}
                </Text>

                {sensores.map((sensor, i) => (
                    <View
                        key={i}
                        style={[styles.sensorCard, { backgroundColor: sensor.color }]}
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
    container: { flex: 1, backgroundColor: "#fff" },
    scroll: { padding: 16 },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 4,
        color: "#000",
    },
    sectionSubtitle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 16,
        margin: 4,
    },

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
