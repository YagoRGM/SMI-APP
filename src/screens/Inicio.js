import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Header from "../components/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line, Doughnut, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Inicio() {
  // =========================
  // Dados do gráfico de barras
  // =========================
  const barData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
    datasets: [
      {
        label: "Produção",
        data: [150, 200, 100, 450, 300],
        backgroundColor: "#00c1fc",
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#fff", font: { size: 14 } },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#fff", font: { size: 14 } },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  // =========================
  // Dados do gráfico de pizza
  // =========================
  const pieData = {
    labels: ["Cambio 1", "Trazeira 3D", "Capacitor"],
    datasets: [
      {
        data: [62.5, 25, 12.5],
        backgroundColor: ["#001943", "#075ee0ff", "#00c1fcff"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#fff" },
      },
    },
  };

  // =========================
  // Dados do gráfico de linha
  // =========================
  const lineData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    datasets: [
      {
        label: "Produção Diária",
        data: [120, 150, 180, 140, 200],
        borderColor: "#ffba08",
        backgroundColor: "rgba(255,186,8,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: "#fff" } } },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  // =========================
  // Dados do gráfico de doughnut
  // =========================
  const doughnutData = {
    labels: ["Máquinas A", "Máquinas B", "Máquinas C"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#00c1fc", "#075ee0ff", "#001943"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { color: "#fff" } },
    },
  };

  // =========================
  // Dados do gráfico radar
  // =========================
  const radarData = {
    labels: ["Eficiência", "Energia", "Produção", "Manutenção", "Defeitos"],
    datasets: [
      {
        label: "Máquina 1",
        data: [80, 70, 90, 60, 50],
        backgroundColor: "rgba(0,193,252,0.3)",
        borderColor: "#00c1fc",
        borderWidth: 2,
      },
      {
        label: "Máquina 2",
        data: [60, 80, 70, 80, 60],
        backgroundColor: "rgba(255,186,8,0.3)",
        borderColor: "#ffba08",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: "#fff" } } },
    scales: {
      r: { pointLabels: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" }, angleLines: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#001943" }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Cards principais */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>1080</Text>
            <Text style={styles.cardText}>Funcionários Ativos</Text>
            <Text style={styles.cardDate}>Última atualização: 14/09/25</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>1250</Text>
            <Text style={styles.cardText}>Máquinas</Text>
            <Text style={styles.cardDate}>Última atualização: 14/09/25</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>97%</Text>
          <Text style={styles.cardText}>Máquinas Ativas</Text>
          <Text style={styles.cardDate}>Última atualização: 14/09/25</Text>
        </View>

        {/* Gráficos */}
        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Eficiência Energética</Text>
          <Pie data={pieData} options={pieOptions} />
        </View>

        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Produção Mensal</Text>
          <Bar data={barData} options={barOptions} />
        </View>

        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Produção Diária</Text>
          <Line data={lineData} options={lineOptions} />
        </View>

        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Composição de Máquinas</Text>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </View>

        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Radar de Eficiência</Text>
          <Radar data={radarData} options={radarOptions} />
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

        <Text style={styles.title}>Eficiência Sustentável</Text>
        <Text style={styles.text}>
          Acompanhe análises da IA sobre o desempenho das máquinas, descubra oportunidades de eficiência e recomendações de sustentabilidade para reduzir custos e impacto ambiental.
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#075ee0ff" : "#00c1fc" },
          ]}
        >
          <Text style={styles.buttonText}>Ver Relatórios</Text>
        </Pressable>

        <Text style={styles.title}>Está tendo dificuldades?</Text>
        <Text style={styles.text}>
          Precisa de ajuda na realização de alguma tarefa específica? Fale com nosso Chat-Bot!
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#075ee0ff" : "#00c1fc" },
          ]}
        >
          <Text style={styles.buttonText}>Falar com o Chat-bot</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 10, marginBottom: 4, color: "#fff", textAlign: "center" },
  text: { fontSize: 14, marginBottom: 16, color: "#fff", textAlign: "center" },
  cardRow: { flexDirection: "row", justifyContent: "space-between" },
  card: { backgroundColor: "#012d5c", padding: 16, borderRadius: 12, marginBottom: 16, flex: 1, marginRight: 8 },
  cardNumber: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  cardText: { fontSize: 14, color: "#fff" },
  cardDate: { fontSize: 12, color: "#ccc", marginTop: 4 },
  graphCard: { backgroundColor: "#012d5c", padding: 16, borderRadius: 12, marginBottom: 16 },
  cardTitle: { color: "#fff", fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  indicatorCard: { backgroundColor: "#012d5c", padding: 16, borderRadius: 12 },
  button: { borderRadius: 8, marginBottom: 10 },
  buttonText: { color: "#fff", textAlign: "center", padding: 8 },
});
