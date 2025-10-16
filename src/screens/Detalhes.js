import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Header from "../components/Header_stack";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 40;

export default function Detalhes() {
    const navigation = useNavigation();

    const data = {
        labels: ["08h", "09h", "10h", "11h", "12h", "13h"],
        datasets: [
            { data: [25, 26, 27, 26, 28, 27], color: () => `rgba(33, 150, 243, 1)`, strokeWidth: 3 },
            { data: [5, 6, 5.5, 6.2, 5.8, 6], color: () => `rgba(76, 175, 80, 1)`, strokeWidth: 3 },
        ],
        legend: ["Temperatura (°C)", "Vibração (Hz)"],
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <Header
                title="Detalhes da Máquina Esteira 07"
                onPressBack={() => navigation.goBack()}
            />

            {/* Card Resumo */}
            <View style={[styles.card, styles.machineCard]}>
                <View style={styles.machineCardContent}>
                    <View style={styles.machineInfo}>
                        <Text style={styles.cardTitle}>Resumo da Máquina</Text>
                        <Text style={styles.alertText}>Status da Máquina</Text>
                        <View style={styles.statusRow}>
                            <View style={styles.statusDot}/>
                            <Text style={{ color: 'green', fontWeight: 'bold', marginLeft: 6 }}>ONLINE</Text>
                        </View>
                    </View>
                    <Image
                        source={require('../assets/img/maquina2.png')}
                        style={styles.machineImageRight}
                        resizeMode="contain"
                    />
                </View>
            </View>


            {/* Métricas */}
            <View style={styles.metricsRow}>
                <View style={[styles.metricCard, { backgroundColor: '#ffebee' }]}>
                    <MaterialCommunityIcons name="thermometer" size={28} color="#f44336" />
                    <Text style={styles.metricValue}>25,5 °C</Text>
                    <Text>Temperatura</Text>
                </View>
                <View style={[styles.metricCard, { backgroundColor: '#e3f2fd' }]}>
                    <MaterialCommunityIcons name="water-percent" size={28} color="#2196F3" />
                    <Text style={styles.metricValue}>5,8 Hz</Text>
                    <Text>Umidade</Text>
                </View>
            </View>

            <View style={styles.metricsRow}>
                <View style={[styles.metricCard, { backgroundColor: '#e8f5e9' }]}>
                    <MaterialCommunityIcons name="flash" size={28} color="#4caf50" />
                    <Text style={styles.metricValue}>2,1 KwM</Text>
                    <Text>Energia consumo</Text>
                </View>
                <View style={[styles.metricCard, { backgroundColor: '#fff3e0' }]}>
                    <MaterialCommunityIcons name="gauge" size={28} color="#ff9800" />
                    <Text style={styles.metricValue}>8,1 bar</Text>
                    <Text>Pressão</Text>
                </View>
            </View>

            {/* Produtividade */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Produtividade</Text>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    chartConfig={{
                        backgroundColor: "#fff",
                        backgroundGradientFrom: "#fff",
                        backgroundGradientTo: "#fff",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#001943" },
                    }}
                    bezier
                    style={{ marginVertical: 8, borderRadius: 16 }}
                />
            </View>

            {/* Alertas de IA */}
            <View style={styles.card}>
                <View style={styles.alertContainer}>
                    <MaterialCommunityIcons name="robot" size={28} color="#2196F3" />
                    <View style={styles.alertTextContainer}>
                        <Text style={styles.alertTitle}>Alertas de IA</Text>
                        <Text style={styles.alertText}>Possível superaquecimento em 2 horas</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={28} color="#001943" />
                </View>
            </View>

            {/* Ações rápidas */}
            <View style={styles.actions}>
                <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline', marginBottom: 50, marginLeft: 8, fontSize: 18 }}>
                    Ações rápidas
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Ver relatório completo</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    card: { backgroundColor: '#fff', padding: 16, margin: 12, borderRadius: 12, elevation: 3 },
    cardTitle: { fontWeight: 'bold', marginBottom: 8, fontSize: 22 },
    statusRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
    statusDot: { width: 10, height: 10, borderRadius: 6, backgroundColor: 'green', marginRight: 2 },
    iconRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginTop: 12 },
machineCardContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
},
machineInfo: {
  flex: 1,
  paddingRight: 12
},
machineImageRight: {
  width: 90,
  height: 90,
  marginRight: 12,
  borderRadius: 12
},
    metricsRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 8 },
    metricCard: { flex: 1, margin: 6, padding: 14, borderRadius: 12, alignItems: 'center', elevation: 2 },
    metricValue: { fontWeight: 'bold', fontSize: 16, marginVertical: 4 },
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    alertTextContainer: {
        flex: 1,
        marginHorizontal: 12
    },
    alertTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2
    },
    alertText: {
        fontSize: 14,
        color: '#555'
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 12
    },
    button: {
        backgroundColor: '#00C851',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 50,
        marginRight: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },



});
