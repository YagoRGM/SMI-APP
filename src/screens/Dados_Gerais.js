import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Header from "../components/Header_stack";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width - 36;

export default function DadosGerais() {
    // Dados simulados
    const desempenhoSemana = {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        datasets: [
            { data: [80, 85, 78, 90, 88, 92], color: () => "#4caf50", strokeWidth: 3 },
            { data: [70, 75, 68, 80, 78, 85], color: () => "#2196f3", strokeWidth: 3 },
        ],
        legend: ["Eficiência", "Consumo"],
    };

    const consumoEnergetico = [420, 380, 400, 450, 430, 410]; // kWh
    const co2Produzido = [120, 110, 115, 130, 125, 118]; // kg
    const labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header title="Dados Gerais do Sistema" onPressBack={() => navigation.goBack()} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* === GRÁFICO DE DESEMPENHO === */}
                <View style={styles.performanceSection}>
                    <Text style={styles.sectionTitle}>Desempenho da Semana</Text>
                    <LineChart
                        data={desempenhoSemana}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{ borderRadius: 16, marginLeft: -16 }}
                    />
                </View>

                {/* === GRÁFICOS CIRCULARES === */}
                <View style={styles.circleRow}>
                    {/* Máquinas Ativas */}
                    <View style={styles.circleSection}>
                        <Text style={styles.sectionTitleDark}>Máquinas Ativas</Text>
                        <View style={styles.circleContainer}>
                            <View style={[styles.outerCircle, { borderColor: "#2196f3" }]}>
                                <View style={styles.innerCircle}>
                                    <Text style={styles.circleValue}>97%</Text>
                                    <Text style={styles.circleLabel}>online</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Impacto da IA */}
                    <View style={styles.circleSection}>
                        <Text style={styles.sectionTitleDark}>IA Produtiva</Text>
                        <View style={styles.circleContainer}>
                            <View style={[styles.outerCircle, { borderColor: "#66bb6a" }]}>
                                <View style={styles.innerCircle}>
                                    <Text style={styles.circleValue}>85%</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* === CONSUMO ENERGÉTICO === */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Consumo Energético (kWh)</Text>
                    <LineChart
                        data={{
                            labels,
                            datasets: [{ data: consumoEnergetico, color: () => "#ffb300", strokeWidth: 3 }],
                        }}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{ borderRadius: 12, marginTop: 10, marginLeft: -16 }}
                    />
                </View>

                {/* === GRÁFICOS CIRCULARES === */}
                <View style={styles.circleRow}>
                    {/* Máquinas Ativas */}
                    <View style={styles.circleSection}>
                        <Text style={styles.sectionTitleDark}>Produção Sustentável</Text>
                        <View style={styles.circleContainer}>
                            <View style={[styles.outerCircle, { borderColor: "#2196f3" }]}>
                                <View style={styles.innerCircle}>
                                    <Text style={styles.circleValue}>77%</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Impacto da IA */}
                    <View style={styles.circleSection}>
                        <Text style={styles.sectionTitleDark}>Impacto da IA</Text>
                        <View style={styles.circleContainer}>
                            <View style={[styles.outerCircle, { borderColor: "#66bb6a" }]}>
                                <View style={styles.innerCircle}>
                                    <Text style={styles.circleValue}>35%</Text>
                                    <Text style={styles.circleLabel}>economia</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* === CO2 PRODUZIDO === */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>CO2 Produzido (kg)</Text>
                    <BarChart
                        data={{
                            labels,
                            datasets: [{ data: co2Produzido }],
                        }}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#112240",
                            backgroundGradientTo: "#112240",
                            color: () => "#ff5252",
                            labelColor: () => "#ccc",
                        }}
                        style={{ borderRadius: 12, marginTop: 10, marginLeft: -16 }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

// Configuração do gráfico de linha
const chartConfig = {
    backgroundGradientFrom: "#112240",
    backgroundGradientTo: "#112240",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
    propsForDots: { r: "5", strokeWidth: "2", stroke: "#fff" },
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0a192f" },
    scroll: { padding: 16 },

    performanceSection: {
        backgroundColor: "#112240",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
    },

    circleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    circleSection: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 6,
    },
    circleContainer: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    outerCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 10,
        borderColor: "#4caf50",
        alignItems: "center",
        justifyContent: "center",
    },
    innerCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#112240",
        alignItems: "center",
        justifyContent: "center",
    },
    circleValue: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },
    circleLabel: {
        color: "#ccc",
        fontSize: 12,
        marginTop: 2,
        textAlign: "center",
    },
    sectionTitleDark: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },

    chartCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        backgroundColor: "#112240",
    },
    chartTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
    },
});
