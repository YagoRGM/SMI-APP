import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import Header from "../components/Header";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from 'react-chartjs-2';
export default function Inicio() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Cards principais */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>1080</Text>
            <Text style={styles.cardText}>Funcionários Ativos</Text>
            <Text style={styles.cardDate}>Última atualização: 08/08/25</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardNumber}>1250</Text>
            <Text style={styles.cardText}>Máquinas</Text>
            <Text style={styles.cardDate}>Última atualização: 08/08/25</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>97%</Text>
          <Text style={styles.cardText}>Máquinas Ativas</Text>
          <Text style={styles.cardDate}>Última atualização: 08/08/25</Text>
        </View>

        {/* Gráfico de “pizza” fake */}
        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Eficiência energética</Text>
          <View style={styles.fakePieContainer}>
            <View style={[styles.fakePieSlice, { flex: 5, backgroundColor: "#0D1B2A" }]} />
            <View style={[styles.fakePieSlice, { flex: 2, backgroundColor: "#1B263B" }]} />
            <View style={[styles.fakePieSlice, { flex: 1, backgroundColor: "#415A77" }]} />
          </View>
        </View>

        {/* Indicadores */}
        <View style={styles.indicators}>
          <View style={styles.indicatorCard}>
            <Text style={styles.cardTitle}>Produção atual</Text>
            <Text style={styles.cardNumber}>5.760 Pilhas</Text>
            <Text style={styles.cardNumber}>19.760 LEDs</Text>
            <Text style={styles.cardNumber}>15.760 Capacitores</Text>
          </View>
        </View>

        {/* Gráfico de barras fake */}
        <View style={styles.graphCard}>
AQUIIIIII          
<View style={styles.fakeBarContainer}>
            <View style={[styles.fakeBar, { height: 150 }]} />
            <View style={[styles.fakeBar, { height: 200 }]} />
            <View style={[styles.fakeBar, { height: 100 }]} />
            <View style={[styles.fakeBar, { height: 450 }]} />
          </View>
        </View>

        <Text style={styles.title}>Eficiência Sustentável</Text>
        <Text style={styles.text}>Acompanhe análises da IA sobre o desempenho das máquinas, descubra oportunidades de eficiência e recomendações de sustentabilidade para reduzir custos e impacto ambiental.</Text>
        <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#1B263B" : "#001943" },
        ]}
      >
        <Text style={styles.buttonText}>Ver Relatórios</Text>
      </Pressable>
      

      <Text style={styles.title}>Está tendo dificuldades?</Text>
        <Text style={styles.text}>Precisa de ajuda na realização de alguma tarefa específica? Fale com nosso Chat-Bot!</Text>
        <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#1B263B" : "#001943" },
        ]}
      >
        <Text style={styles.buttonText}>Falar com o Chat-bot</Text>
      </Pressable>
       

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    color: "#001943",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    marginBottom: 16,
    color: "#000",
    textAlign: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1B263B",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flex: 1,
    marginRight: 8,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  cardText: {
    fontSize: 14,
    color: "#fff",
  },
  cardDate: {
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
  },
  graphCard: {
    backgroundColor: "#415A77",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  indicators: {
    marginBottom: 16,
  },
  indicatorCard: {
    backgroundColor: "#1B263B",
    padding: 16,
    borderRadius: 12,
  },
  fakePieContainer: {
    flexDirection: "row",
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 8,
  },
  fakePieSlice: {
    height: "100%",
  },
  fakeBarContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 200,
    marginTop: 16,
  },
  fakeBar: {
    width: 40,
    backgroundColor: "#1B263B",
    borderRadius: 8,
  },
  button: {
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    padding: 8,
    width: '500'
  }
});
