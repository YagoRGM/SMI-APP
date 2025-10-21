import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header_stack";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 30;

export default function Detalhes() {
    const navigation = useNavigation();

    const data = {
        labels: ["08h", "09h", "10h", "11h", "12h", "13h"],
        datasets: [
            {
                data: [25, 26.5, 27.2, 26.8, 28.1, 27.4],
                color: () => `#f44336`,
                strokeWidth: 3,
            },
            {
                data: [22, 23.5, 25.8, 24.7, 24.3, 23.6],
                color: () => `#4caf50`,
                strokeWidth: 3,
            },
        ],
        legend: ["Temperatura (°C)", "Vibração (Hz)"],
    };

    // Dados das máquinas
    const maquinas = [
        { nome: "Temperatura", valor: "27°C", icon: "thermometer", color: "#ff5252" },
        { nome: "Energia", valor: "4.2 kWh", icon: "flash", color: "#ffb300" },
        { nome: "Vibração", valor: "1.3 m/s²", icon: "vibrate", color: "#00bfa5" },
        { nome: "Pressão", valor: "8.1 bar", icon: "gauge", color: "#64b5f6" },
    ];



    return (
        <View style={styles.container}>
            <Header title="Detalhes da Máquina" onPressBack={() => navigation.goBack()} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* === CARD PRINCIPAL === */}
                <View style={styles.statusCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Resumo da Máquina</Text>
                        <Text style={styles.statusText}>Operando normalmente</Text>
                        <Text style={styles.subText}>Última verificação há 3 minutos</Text>
                        <View style={styles.statusRow}>
                            <View style={styles.statusDot} />
                            <Text style={{ color: "#4caf50", fontWeight: "bold" }}>ONLINE</Text>
                        </View>
                    </View>
                    <Image
                        source={require("../assets/img/maquina2.png")}
                        style={styles.machineImage}
                        resizeMode="contain"
                    />
                </View>

                {/* === MÉTRICAS === */}
                <View style={styles.grid}>
                    {maquinas.map((m, index) => (
                        <View
                            key={index}
                            style={[styles.metricCard, { backgroundColor: m.color }]}
                        >
                            <MaterialCommunityIcons name={m.icon} size={30} color="#fff" />
                            <Text style={[styles.metricLabel, { color: "#fff" }]}>{m.nome}</Text>
                            <Text style={[styles.metricValue, { color: "#fff" }]}>{m.valor}</Text>
                        </View>
                    ))}
                </View>



                {/* === GRÁFICO === */}
                <View style={styles.chartContainer}>
                    <Text style={styles.title}>Performance da Máquina</Text>
                    <LineChart
                        data={data}
                        width={Dimensions.get("window").width - 40}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#112240",
                            backgroundGradientTo: "#112240",
                            decimalPlaces: 1,
                            color: () => "#4caf50",
                            labelColor: () => "#ccc",
                            propsForDots: { r: "5", strokeWidth: "2", stroke: "#fff" },
                        }}
                        bezier
                        style={{ borderRadius: 12, marginTop: 10, marginLeft: -12 }}
                    />
                </View>

                {/* === CARD DE DADOS DA MÁQUINA === */}
                <TouchableOpacity
                    style={styles.detailsCard}
                    onPress={() => navigation.navigate("DadosMaquina")}
                >
                    <View style={styles.detailsContent}>
                        <MaterialCommunityIcons name="database" size={32} color="#1976d2" />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.detailsTitle}>Dados da Máquina</Text>
                            <Text style={styles.detailsSubtitle}>Acesse medições e sensores detalhados</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={28} color="#1976d2" style={{ marginLeft: "auto" }} />
                    </View>
                </TouchableOpacity>


                {/* === EFICIÊNCIA === */}
                <View style={styles.efficiencyCard}>
                    <MaterialCommunityIcons name="speedometer" size={32} color="#4caf50" />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.alertTitle}>Eficiência Atual</Text>
                        <Text style={styles.effValue}>86%</Text>
                        <ProgressBar progress={0.86} color="#4caf50" style={styles.progressBar} />
                    </View>
                </View>

                {/* === ALERTAS DE IA === */}
                <View style={styles.detailsCard}>
                    <TouchableOpacity
                        style={styles.detailsContent}
                        onPress={() => navigation.navigate("Relatorios")}
                    >
                        <MaterialCommunityIcons name="robot" size={28} color="#2196F3" />
                        <View style={styles.alertTextContainer}>
                            <Text style={styles.detailsTitle}>Alertas de IA</Text>
                            <Text style={styles.detailsSubtitle}>Possível superaquecimento em 2 horas</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={28} color="#1976d2" />
                    </TouchableOpacity>
                </View>

                {/* === HISTÓRICO === */}
                <View style={styles.historyCard}>
                    <Text style={styles.sectionTitle}>Histórico Operacional</Text>
                    <View style={styles.historyItem}>
                        <MaterialCommunityIcons name="wrench" size={22} color="#4caf50" />
                        <Text style={styles.historyText}>Última manutenção: 12/10/2025</Text>
                    </View>
                    <View style={styles.historyItem}>
                        <MaterialCommunityIcons name="alert" size={22} color="#ff5252" />
                        <Text style={styles.historyText}>Última falha: 05/10/2025 (sensor térmico)</Text>
                    </View>
                    <View style={styles.historyItem}>
                        <MaterialCommunityIcons name="update" size={22} color="#ffb300" />
                        <Text style={styles.historyText}>Última atualização: 09/10/2025</Text>
                    </View>
                </View>

                {/* === AÇÕES RÁPIDAS === */}
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => navigation.navigate("AtualizarMaquina")}>
                        <Text style={styles.link}>Ações rápidas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Relatorios")}
                    >
                        <Text style={styles.buttonText}>Ver relatório completo</Text>
                    </TouchableOpacity>
                </View>

                {/* === STATUS FINAL === */}
                <View style={styles.statusFooter}>
                    <View style={styles.statusDot} />
                    <Text style={styles.onlineText}>Conectado • Em tempo real</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scroll: { padding: 16 },

    title: { color: "#fff", fontWeight: "bold", fontSize: 20, marginBottom: 6 },
    sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#fff" },
    subText: { color: "#aaa", fontSize: 12 },

    statusCard: {
        flexDirection: "row",
        backgroundColor: "#112240",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        marginBottom: 20,
    },
    statusText: { color: "#4caf50", fontWeight: "bold", fontSize: 14 },
    statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#4caf50", marginRight: 6 },
    machineImage: { width: 80, height: 80, borderRadius: 12 },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    metricCard: {
        width: "48%",
        borderRadius: 12,
        padding: 14,
        alignItems: "center",
        marginBottom: 12,
    },
    metricLabel: {
        fontSize: 13,
        marginTop: 6,
        fontWeight: "bold",
    },
    metricValue: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 2,
    },

    chartContainer: {
        backgroundColor: "#112240",
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
    },

    detailsCard: {
        backgroundColor: "#e3f2fd", // azul clarinho
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3, // sombra no Android
    },
    detailsContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1976d2",
    },
    detailsSubtitle: {
        fontSize: 13,
        color: "#555",
        marginTop: 2,
    },

    efficiencyCard: {
        flexDirection: "row",
        backgroundColor: "#112240",
        borderRadius: 12,
        padding: 14,
        alignItems: "center",
        marginBottom: 20,
    },
    effValue: { fontSize: 20, fontWeight: "bold", color: "#4caf50" },
    progressBar: { height: 8, borderRadius: 5, marginTop: 6 },

    alertCard: { backgroundColor: "#112240", borderRadius: 12, padding: 16, marginBottom: 20 },
    alertContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    alertTextContainer: { flex: 1, marginHorizontal: 12 },
    alertTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    alertText: { color: "#ccc", fontSize: 14 },

    historyCard: {
        backgroundColor: "#112240",
        borderRadius: 12,
        padding: 14,
        marginBottom: 25,
    },
    historyItem: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    historyText: { color: "#ddd", marginLeft: 10, fontSize: 14 },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 50,
    },
    link: {
        color: "#2196F3",
        fontStyle: "italic",
        textDecorationLine: "underline",
        fontSize: 16,
        marginLeft: 8,
    },
    button: {
        backgroundColor: "#2962ff",
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

    statusFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
    },
    onlineText: { color: "#aaa", fontSize: 13 },
});
