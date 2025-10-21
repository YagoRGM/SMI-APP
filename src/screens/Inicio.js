import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProgressBar } from "react-native-paper";
import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width - 56;

export default function Inicio() {
  const navigation = useNavigation();

  const topCards = [
    {
      title: "Relatórios Sustentáveis",
      description: "6 novos relatórios disponíveis",
      icon: "file-chart-outline",
      color: "#00c853",
      route: "Relatorios",
    },
    {
      title: "Alertas do Sistema",
      description: "3 alertas críticos detectados",
      icon: "alert-decagram-outline",
      color: "#ff5252",
      route: "Notificacoes",
    },
    {
      title: "Eficiência Operacional",
      description: "92% de rendimento médio",
      icon: "chart-line",
      color: "#2962ff",
      route: "DadosGerais",
    },
    {
      title: "Insights da IA",
      description: "12 novas recomendações inteligentes",
      icon: "robot-outline",
      color: "#ffab00",
      route: "ChatBot",
    },
  ];

  const bottomCards = [
    {
      title: "Energia & Consumo",
      description: "2 novas otimizações sugeridas",
      icon: "flash-outline",
      color: "#00b0ff",
      route: "DadosGerais",
    },
    {
      title: "Status das Máquinas",
      description: "97% ativas em operação",
      icon: "cog-outline",
      color: "#00e5ff",
      route: "DadosGerais",
    },
    {
      title: "Impacto Sustentável",
      description: "Redução de 14% nas emissões",
      icon: "leaf",
      color: "#69f0ae",
      route: "Relatorios",
    },
    {
      title: "Análises Preditivas",
      description: "4 falhas previstas e evitadas",
      icon: "brain",
      color: "#f50057",
      route: "ChatBot",
    },
  ];

  const performanceData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    datasets: [
      { data: [80, 85, 82, 90, 88], color: () => "#00c853", strokeWidth: 2 },
      { data: [75, 80, 79, 84, 82], color: () => "#ffab00", strokeWidth: 2 },
    ],
    legend: ["Operacional", "Energia"],
  };

  const statusData = {
    labels: ["Oper.", "Energia", "Sustent.", "IA", "Equipe"],
    datasets: [{ data: [92, 78, 88, 95, 90] }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#012d5c",
    backgroundGradientTo: "#012d5c",
    color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
    labelColor: () => "#fff",
    decimalPlaces: 0,
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Dashboard Central</Text>
        <Text style={styles.subtitle}>
          Painel geral do SMI — inteligência operacional, eficiência e sustentabilidade em tempo real.
        </Text>

        {/* === CARDS SUPERIORES === */}
        <View style={styles.cardGrid}>
          {topCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { borderLeftColor: card.color }]}
              onPress={() => navigation.navigate(card.route)}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name={card.icon} size={32} color={card.color} />
                <Text style={styles.cardTitle}>{card.title}</Text>
              </View>
              <Text style={styles.cardDescription}>{card.description}</Text>
              <Text style={styles.cardLink}>Acessar</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* === GRÁFICO DE DESEMPENHO === */}
        <View style={styles.performanceSection}>
          <Text style={styles.sectionTitle}>Desempenho da Semana</Text>
          <LineChart
            data={performanceData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16, marginLeft: -18 }}
          />
        </View>


        {/* === GRÁFICO DE PORCENTAGEM === */}
        <View style={styles.circleSection}>
          <Text style={styles.sectionTitleDark}>Consumo Energético Eficiente</Text>
          <View style={styles.circleContainer}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.circleValue}>86%</Text>
                <Text style={styles.circleLabel}>eficiência</Text>
              </View>
            </View>
          </View>
        </View>

        {/* === CARDS INFERIORES === */}
        <View style={styles.cardGrid}>
          {bottomCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, { borderLeftColor: card.color }]}
              onPress={() => navigation.navigate(card.route)}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeader}>
                <MaterialCommunityIcons name={card.icon} size={32} color={card.color} />
                <Text style={styles.cardTitle}>{card.title}</Text>
              </View>
              <Text style={styles.cardDescription}>{card.description}</Text>
              <Text style={styles.cardLink}>Acessar</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* === GRÁFICO DE STATUS GERAL === */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Geral do Sistema</Text>
          <BarChart
            data={statusData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars
            style={{ borderRadius: 16, marginLeft: -20 }}
          />
        </View>

        {/* === ASSISTENTE SMI === */}
        <View style={styles.assistenteCard}>
          <View style={styles.assistenteHeader}>
            <MaterialCommunityIcons name="robot" size={40} color="#00c1fc" />
            <Text style={styles.assistenteTitle}>Assistente SMI</Text>
          </View>
          <Text style={styles.assistenteText}>
            Converse com o assistente inteligente e receba diagnósticos, previsões e suporte técnico automatizado.
          </Text>
          <TouchableOpacity
            style={styles.assistenteButton}
            onPress={() => navigation.navigate("ChatBot")}
          >
            <MaterialCommunityIcons name="chat" size={20} color="#fff" />
            <Text style={styles.assistenteButtonText}>Abrir Chat SMI</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dadosCard}>
          {/* Header do Card */}
          <View style={styles.dadosHeader}>
            <MaterialCommunityIcons name="database" size={40} color="#ffa500" />
            <Text style={styles.dadosTitle}>Dados do Sistema</Text>
          </View>

          {/* Texto explicativo */}
          <Text style={styles.dadosText}>
            Visualize os indicadores gerais do sistema: eficiência, consumo energético, CO2 produzido, impacto das sugestões da IA e muito mais.
          </Text>

          {/* Botão para acessar a tela */}
          <TouchableOpacity
            style={styles.dadosButton}
            onPress={() => navigation.navigate("DadosGerais")}
          >
            <MaterialCommunityIcons name="chart-pie" size={20} color="#fff" />
            <Text style={styles.dadosButtonText}>Ver Dados Gerais</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fa" },
  scrollContainer: { padding: 20 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#012d5c",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 22,
  },

  /** === CARDS === **/
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderLeftWidth: 6,
    width: "48%",
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#012d5c", marginLeft: 8 },
  cardDescription: { fontSize: 14, color: "#444", marginBottom: 8 },
  cardLink: { fontSize: 14, color: "#075ee0", fontWeight: "600" },

  /** === SECTIONS === **/
  section: {
    backgroundColor: "#012d5c",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  performanceSection: {
    backgroundColor: "#012d5c",
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    marginBottom: 10,
    elevation: 3,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  sectionTitleDark: {
    color: "#012d5c",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },

  /** === GRÁFICO CIRCULAR === **/
  circleSection: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },
  circleContainer: { alignItems: "center", justifyContent: "center" },
  outerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: "#00c1fc",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f4f6fa",
    alignItems: "center",
    justifyContent: "center",
  },
  circleValue: { fontSize: 36, fontWeight: "bold", color: "#012d5c" },
  circleLabel: { fontSize: 14, color: "#555", marginTop: 4 },

  /** === ASSISTENTE SMI === **/
  assistenteCard: {
    backgroundColor: "#001943",
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  assistenteHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  assistenteTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 10,
  },
  assistenteText: {
    color: "#d6e2ff",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },
  assistenteButton: {
    backgroundColor: "#00c1fc",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  assistenteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  dadosCard: {
    backgroundColor: "#112240",
    borderRadius: 16,
    padding: 16,
    marginTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  dadosHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dadosTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  dadosText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  dadosButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffa500",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dadosButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
  },
});
