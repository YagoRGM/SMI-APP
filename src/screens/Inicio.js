import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Header from "../components/Header";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width - 70;

export default function Inicio() {
  const barData = { labels: ["Jan", "Fev", "Mar", "Abr", "Mai"], datasets: [{ data: [150, 200, 100, 450, 300] }] };
  const lineData = { labels: ["Seg", "Ter", "Qua", "Qui", "Sex"], datasets: [{ data: [120, 150, 180, 140, 200], color: () => "#ffba08", strokeWidth: 2 }] };
  const pieData = [
    { name: "Cambio 1", population: 62.5, color: "#001943", legendFontColor: "#fff", legendFontSize: 14 },
    { name: "Trazeira 3D", population: 25, color: "#075ee0ff", legendFontColor: "#fff", legendFontSize: 14 },
    { name: "Capacitor", population: 12.5, color: "#00c1fcff", legendFontColor: "#fff", legendFontSize: 14 },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#012d5c",
    backgroundGradientTo: "#012d5c",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    decimalPlaces: 0,
    style: { borderRadius: 16 },
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>📊 Dashboard</Text>

        {/* Cards principais */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>👷‍♂️</Text>
            <Text style={styles.cardNumber}>1080</Text>
            <Text style={styles.cardText}>Funcionários Ativos</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardDate}>Última atualização: 14/09/25</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🏭</Text>
            <Text style={styles.cardNumber}>1250</Text>
            <Text style={styles.cardText}>Máquinas</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardDate}>Última atualização: 14/09/25</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>⚡</Text>
          <Text style={styles.cardNumber}>97%</Text>
          <Text style={styles.cardText}>Máquinas Ativas</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardDate}>Última atualização: 14/09/25</Text>
          </View>
        </View>

        {/* Gráficos */}
        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Eficiência Energética</Text>
          <PieChart data={pieData} width={screenWidth} height={220} chartConfig={chartConfig} accessor="population" backgroundColor="transparent" paddingLeft="15" absolute />
        </View>

        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Produção Mensal</Text>
          <BarChart data={barData} width={screenWidth} height={220} chartConfig={chartConfig} style={{ borderRadius: 16 }} />
        </View>

        <View style={styles.graphCard}>
          <Text style={styles.cardTitle}>Produção Diária</Text>
          <LineChart data={lineData} width={screenWidth} height={220} chartConfig={chartConfig} bezier style={{ borderRadius: 16 }} />
        </View>

        {/* Indicadores - Produção Atual */}
        <View style={styles.indicators}>
          <Text style={[styles.miniTitle, { marginBottom: 12 }]}>📦 Produção Atual</Text>
          <View style={styles.prodRow}>
            <View style={styles.prodCard}>
              <Text style={styles.prodLabel}>Pilhas</Text>
              <Text style={styles.prodNumber}>5.760</Text>
              <View style={[styles.prodBar, { width: "80%", backgroundColor: "#ffba08" }]} />
            </View>
            <View style={styles.prodCard}>
              <Text style={styles.prodLabel}>LEDs</Text>
              <Text style={styles.prodNumber}>19.760</Text>
              <View style={[styles.prodBar, { width: "100%", backgroundColor: "#075ee0ff" }]} />
            </View>
            <View style={styles.prodCard}>
              <Text style={styles.prodLabel}>Capacitores</Text>
              <Text style={styles.prodNumber}>15.760</Text>
              <View style={[styles.prodBar, { width: "90%", backgroundColor: "#00c1fcff" }]} />
            </View>
          </View>
        </View>


        <Text style={styles.miniTitle}>Eficiência Sustentável</Text>
        <Text style={styles.text}>
          Acompanhe análises da IA sobre o desempenho das máquinas, descubra oportunidades de eficiência e recomendações de sustentabilidade para reduzir custos e impacto ambiental.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Relatorios")}
        >
          <Text style={styles.buttonText}>Ver Relatórios</Text>
        </TouchableOpacity>

        <Text style={styles.miniTitle}>Está tendo dificuldades?</Text>
        <Text style={styles.text}>
          Precisa de ajuda na realização de alguma tarefa específica? Fale com nosso Chat-Bot!
        </Text>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("ChatBot")}
        >
          <Text style={styles.buttonText}>Falar com o Chat-Bot</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: "bold", marginTop: 10, marginBottom: 14, color: "#012d5c", textAlign: "center" },
  miniTitle: { fontSize: 24, fontWeight: "700", marginTop: 20, marginBottom: 10, color: "#012d5c", textAlign: "center" },
  text: { fontSize: 15, marginBottom: 16, color: "#333", textAlign: "center", lineHeight: 20 },

  cardRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  card: {
    backgroundColor: "#012d5c",
    padding: 20,
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardIcon: { fontSize: 32, marginBottom: 10 },
  cardNumber: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 6 },
  cardText: { fontSize: 16, color: "#f1f1f1", textAlign: "center", marginBottom: 8 },
  cardFooter: { borderTopWidth: 1, borderTopColor: "#075ee0ff", paddingTop: 6, width: "100%", alignItems: "center" },
  cardDate: { fontSize: 12, color: "#ddd" },

  graphCard: { backgroundColor: "#012d5c", padding: 18, borderRadius: 16, marginTop: 14, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 5, elevation: 3 },
  cardTitle: { color: "#fff", fontWeight: "600", fontSize: 20, marginBottom: 14, textAlign: "center", paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#075ee0ff" },

  prodRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  prodCard: {
    flex: 1,
    backgroundColor: "#012d5c",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prodLabel: { color: "#fff", fontSize: 14, marginBottom: 6 },
  prodNumber: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 6 },
  prodBar: { height: 6, borderRadius: 6 },


  button: { marginTop: 10, marginBottom: 20, width: "60%", alignSelf: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 12, backgroundColor: "#012d5c", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  buttonSecondary: { marginTop: 10, marginBottom: 30, width: "60%", alignSelf: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 12, backgroundColor: "#075ee0ff", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "bold", textAlign: "center", letterSpacing: 0.5 },
});
