// screens/DetalhesMaquina.js
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { ProgressBar } from "react-native-paper";
import Header from "../components/Header_stack";
import {
    pegarMaquina,
    pegarUltimaLeituraDaMaquina,
    pegarHistoricoDaMaquina
} from "../config/cloudflareApi";

const SCREEN_PADDING = 16;
const w = Dimensions.get("window").width - SCREEN_PADDING * 2.7;

export default function Detalhes({ route, navigation }) {
    const { id } = route.params;
    const [maquina, setMaquina] = useState(null);
    const [ultima, setUltima] = useState(null);
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);

    const imagens = {
        1: require("../assets/img/imagem_maquina1.png"),
        2: require("../assets/img/imagem_maquina2.png"),
        3: require("../assets/img/imagem_maquina3.png"),
        4: require("../assets/img/imagem_maquina4.png"),
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function load() {
        setLoading(true);
        try {
            const m = await pegarMaquina(id);
            setMaquina(m);

            // última leitura (rota /leituras/:id) - pode retornar objeto ou { erro: ... }
            try {
                const u = await pegarUltimaLeituraDaMaquina(id);
                if (u && !u.erro) setUltima(u);
            } catch (e) {
                console.log("Erro pegar última leitura:", e);
            }

            // histórico completo (maquinas/:id/leituras?limit=...)
            try {
                // Fix de data do SQLite → JS
                function fixDate(d) {
                    if (!d) return null;
                    return new Date(d.replace(" ", "T"));
                }

                const hist = await pegarHistoricoDaMaquina(id, 5);

                if (Array.isArray(hist) && hist.length > 0) {

                    // Ordena do mais novo → mais antigo
                    const ordenado = [...hist].sort(
                        (a, b) => fixDate(b.data_hora) - fixDate(a.data_hora)
                    );

                    const ultimas5 = ordenado.slice(0, 5);

                    setHistorico(ultimas5.reverse());

                    setUltima(ultimas5[ultimas5.length - 1]);
                }
                else {
                    setHistorico([]);
                }

            } catch (e) {
                console.log("Erro pegar histórico:", e);
                setHistorico([]);
            }
        } catch (e) {
            console.log("Erro carregar máquina:", e);
            setMaquina(null);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#1976d2" />
            </View>
        );
    }

    if (!maquina) {
        return (
            <View style={styles.center}>
                <Text>Máquina não encontrada.</Text>
            </View>
        );
    }

    // === STATUS (verde / vermelho) ===
    const isInactive =
        maquina.status_maquina &&
        maquina.status_maquina.toLowerCase() === "inativa";

    const statusLabel = isInactive ? "Operação Parada" : "Operando normalmente";
    const statusBadge = isInactive ? "OFFLINE" : "ONLINE";
    const statusColor = isInactive ? "#ff5252" : "#4caf50";

    // === formatar data da última leitura com fallback ===
    function formatDateSafe(d) {
        if (!d) return "—";
        try {
            const date = new Date(d);
            if (isNaN(date.getTime())) return String(d);
            return date.toLocaleString();
        } catch {
            return String(d);
        }
    }

    // === construir arrays para o gráfico a partir do histórico ===
    const labels = historico.length
        ? historico.map((h) => {
            const dt = new Date(h.data_hora);
            if (!isNaN(dt.getTime())) return `${dt.getHours()}:${String(dt.getMinutes()).padStart(2, "0")}`;
            // fallback incremental
            return "";
        })
        : [];

    const temperaturas = historico.map((h) => Number(h.temperatura) || 0);
    const consumos = historico.map((h) => Number(h.consumo_eletrico) || 0);

    // If no history, show minimal points so chart doesn't crash
    const chartHasData = temperaturas.length > 0 || consumos.length > 0;
    const chartData = chartHasData
        ? {
            labels: labels.length ? labels : temperaturas.map((_, i) => `#${i + 1}`),
            datasets: [
                {
                    data: temperaturas,
                    color: () => "#ff5252",
                    strokeWidth: 2,
                },
                {
                    data: consumos,
                    color: () => "#4caf50",
                    strokeWidth: 2,
                },
            ],
            legend: ["Temperatura (°C)", "Consumo (kWh)"],
        }
        : {
            labels: ["—"],
            datasets: [{ data: [0], color: () => "#ff5252", strokeWidth: 2 }],
        };

    // === Eficiência: métrica simples derivada (ajuste livre) ===
    // fórmula simples: ideal temp ~ 25°C, consumo baixo é melhor.
    const temp = Number(ultima?.temperatura) || (temperaturas.length ? temperaturas[temperaturas.length - 1] : 0);
    const cons = Number(ultima?.consumo_eletrico) || (consumos.length ? consumos[consumos.length - 1] : 0);

    // Normalizar: tempDiff 0.. (quanto mais longe de 25 maior penalidade), consumo baseline 0..100
    const tempPenalty = Math.min(Math.abs(temp - 25) / 50, 1); // 0..1
    const consPenalty = Math.min(cons / 100, 1); // assume consumo ideal < 100
    let efficiency = 1 - (tempPenalty * 0.6 + consPenalty * 0.4); // weights
    efficiency = Math.max(0, Math.min(1, efficiency)); // clamp
    const effPercent = Math.round(efficiency * 100);

    // Eff color gradient: red -> orange -> green
    const effColor =
        effPercent < 40 ? "#ff5252" : effPercent < 70 ? "#ffb300" : "#4caf50";

    // Métricas para display (sem gas)
    const metricas = [
        { nome: "Temperatura", valor: `${temp ?? 0}°C`, icon: "thermometer", color: "#ff5252" },
        { nome: "Consumo", valor: `${cons ?? 0} kWh`, icon: "flash", color: "#ffb300" },
        { nome: "Umidade", valor: `${ultima?.umidade ?? 0}%`, icon: "water-percent", color: "#00bfa5" },
        { nome: "Vibração", valor: `${ultima?.vibracao ?? 0}`, icon: "vibrate", color: "#64b5f6" },
    ];

    // Fake/estático histórico operacional (você pediu manter parecido com antigo)
    const historicoOperacional = [
        { ic: "wrench", color: "#4caf50", text: "Última manutenção: 12/10/2025" },
        { ic: "alert", color: "#ff5252", text: "Última falha: 05/10/2025 (sensor térmico)" },
        { ic: "update", color: "#ffb300", text: "Última atualização: 09/10/2025" },
    ];

    // === handlers de UI (Ações rápidas etc) ===
    function handleAcoesRapidas() {
        navigation.navigate("AtualizarMaquina", { maquina });
    }

    function handleVerRelatorio() {
        navigation.navigate("Relatorios", { id_maquina: id });
    }

    function handleAlertasIA() {
        // exemplo: abrir tela de alertas
        navigation.navigate("Relatorios", { screen: "Alertas", id_maquina: id });
    }

    return (
        <View style={styles.container}>
            <Header title={`Detalhes • ${maquina.nome_maquina}`} onPressBack={() => navigation.goBack()} />

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* === CARD PRINCIPAL === */}
                <View style={styles.statusCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Resumo da Máquina</Text>
                        <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
                        <Text style={styles.subText}>Última leitura: {formatDateSafe(ultima?.data_hora)}</Text>

                        <View style={styles.statusRow}>
                            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                            <Text style={{ color: statusColor, fontWeight: "bold" }}>{statusBadge}</Text>
                        </View>
                    </View>

                    <Image
                        source={imagens[maquina.imagem_maquina] || imagens[1]}
                        style={{ width: 80, height: 80 }}
                    />

                </View>

                {/* === MÉTRICAS === */}
                <View style={styles.grid}>
                    {metricas.map((m, i) => (
                        <View key={i} style={[styles.metricCard, { backgroundColor: m.color }]}>
                            <MaterialCommunityIcons name={m.icon} size={28} color="#fff" />
                            <Text style={styles.metricLabel}>{m.nome}</Text>
                            <Text style={styles.metricValue}>{m.valor}</Text>
                        </View>
                    ))}
                </View>

                {/* === GRÁFICO (Temperatura) — 5 últimas leituras === */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Temperatura nas últimas leituras</Text>

                    {historico.length === 0 ? (
                        <Text style={{ color: "#fff", marginTop: 10 }}>Sem dados suficientes</Text>
                    ) : (
                        <LineChart
                            data={{
                                labels: historico.map((h) => {
                                    const dt = new Date(h.data_hora);
                                    const hh = String(dt.getHours()).padStart(2, "0");
                                    const mm = String(dt.getMinutes()).padStart(2, "0");
                                    return `${hh}:${mm}`;
                                }),
                                datasets: [
                                    {
                                        data: historico.map((h) => Number(h.temperatura) || 0),
                                        color: () => "#ff5252",
                                        strokeWidth: 3,
                                    },
                                ],
                            }}
                            width={w}
                            height={260}
                            withInnerLines={false}
                            withOuterLines={false}
                            chartConfig={{
                                backgroundColor: "#0A1A2F",
                                backgroundGradientFrom: "#0A1A2F",
                                backgroundGradientTo: "#0A1A2F",
                                decimalPlaces: 0,
                                color: () => "#ff5252",
                                labelColor: () => "#ffffff",
                                propsForDots: {
                                    r: "3",
                                    strokeWidth: "2",
                                    stroke: "#ffffff",
                                },
                            }}
                            bezier
                            style={{
                                marginTop: 10,
                                borderRadius: 12,
                            }}
                        />
                    )}
                </View>

                {/* === GRÁFICO (Consumo Energético) — 5 últimas leituras === */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Consumo Energético (kWh)</Text>

                    {historico.length === 0 ? (
                        <Text style={{ color: "#fff", marginTop: 10 }}>Sem dados suficientes</Text>
                    ) : (
                        <LineChart
                            data={{
                                labels: historico.map((h) => {
                                    const dt = new Date(h.data_hora);
                                    return !isNaN(dt.getTime())
                                        ? `${dt.getHours()}:${String(dt.getMinutes()).padStart(2, "0")}`
                                        : "";
                                }),
                                datasets: [
                                    {
                                        data: consumos,
                                        color: () => "#4caf50",
                                        strokeWidth: 2,
                                    },
                                ],
                            }}
                            width={w}
                            height={260}
                            chartConfig={{
                                backgroundColor: "#1a1a1a",
                                backgroundGradientFrom: "#1a1a1a",
                                backgroundGradientTo: "#1a1a1a",
                                decimalPlaces: 2,
                                color: () => "#4caf50",
                                labelColor: () => "#fff",
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: "#fff",
                                },
                            }}
                            bezier
                            style={{
                                marginTop: 10,
                                borderRadius: 12,
                            }}
                        />
                    )}
                </View>


                {/* === DADOS DA MÁQUINA (card) === */}
                <TouchableOpacity style={styles.detailsCard}
                    onPress={() => navigation.navigate("DadosMaquina", { leitura: ultima })}
                >

                    <View style={styles.detailsContent}>
                        <MaterialCommunityIcons name="database" size={32} color="#1976d2" />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.detailsTitle}>Dados da Máquina</Text>
                            <Text style={styles.detailsSubtitle}>Modelo: {maquina.modelo_maquina}</Text>
                            <Text style={styles.detailsSubtitle}>Setor: {maquina.localizacao_maquina}</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={28} color="#1976d2" style={{ marginLeft: "auto" }} />
                    </View>
                </TouchableOpacity>

                {/* === EFICIÊNCIA (melhor visual) === */}
                <View style={styles.efficiencyCard}>
                    <MaterialCommunityIcons name="speedometer" size={36} color={effColor} />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.alertTitle}>Eficiência Atual</Text>
                        <Text style={[styles.effValue, { color: effColor }]}>{effPercent}%</Text>
                        <ProgressBar progress={efficiency} color={effColor} style={styles.progressBar} />
                        <Text style={styles.effHint}>Baseado em temperatura e consumo recentes</Text>
                    </View>
                </View>

                {/* === ALERTAS DE IA === */}
                <View style={styles.detailsCard}>
                    <TouchableOpacity style={styles.detailsContent} onPress={handleAlertasIA}>
                        <MaterialCommunityIcons name="robot" size={28} color="#2196F3" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.detailsTitle}>Alertas de IA</Text>
                            <Text style={styles.detailsSubtitle}>Possível superaquecimento detectado — ver detalhes</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={28} color="#1976d2" />
                    </TouchableOpacity>
                </View>

                {/* === HISTÓRICO OPERACIONAL (fictício igual ao antigo) === */}
                <View style={styles.historyCard}>
                    <Text style={styles.sectionTitle}>Histórico Operacional</Text>
                    {historicoOperacional.map((h, i) => (
                        <View key={i} style={styles.historyItem}>
                            <MaterialCommunityIcons name={h.ic} size={20} color={h.color} />
                            <Text style={styles.historyText}>{h.text}</Text>
                        </View>
                    ))}
                </View>

                {/* === AÇÕES RÁPIDAS e RELATÓRIO === */}
                <View style={styles.actions}>
                    <TouchableOpacity onPress={handleAcoesRapidas}>
                        <Text style={styles.link}>Ações rápidas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleVerRelatorio}>
                        <Text style={styles.buttonText}>Ver relatório completo</Text>
                    </TouchableOpacity>
                </View>

                {/* === STATUS FOOTER === */}
                <View style={styles.statusFooter}>
                    <View style={[styles.statusDotSmall, { backgroundColor: statusColor }]} />
                    <Text style={[styles.onlineText, { color: statusColor }]}>
                        {isInactive ? "Offline • Operação parada" : "Conectado • Em tempo real"}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

/* ========== STYLES ========== */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scroll: { padding: SCREEN_PADDING },

    center: { flex: 1, justifyContent: "center", alignItems: "center" },

    // status card
    statusCard: {
        flexDirection: "row",
        backgroundColor: "#112240",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        marginBottom: 18,
    },
    title: { color: "#fff", fontWeight: "700", fontSize: 18 },
    statusText: { marginTop: 6, fontWeight: "700", fontSize: 14 },
    subText: { color: "#b0bec5", fontSize: 12, marginTop: 4 },
    statusRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    statusDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
    machineImage: { width: 90, height: 90 },

    // grid metrics
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    metricCard: {
        width: "48%",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        marginBottom: 12,
        elevation: 2,
    },
    metricLabel: { fontSize: 13, marginTop: 6, color: "#fff", fontWeight: "700" },
    metricValue: { fontSize: 16, fontWeight: "800", marginTop: 4, color: "#fff" },

    // chart
    chartContainer: {
        backgroundColor: "#081826",
        borderRadius: 12,
        padding: 12,
        marginBottom: 18,
    },
    chartTitle: { color: "#fff", fontWeight: "700", fontSize: 18, margin: 8, },
    legendRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    legendItem: { flexDirection: "row", alignItems: "center" },
    legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    legendText: { color: "#cfd8dc" },

    // details card
    detailsCard: {
        backgroundColor: "#e3f2fd",
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
        elevation: 3,
    },
    detailsContent: { flexDirection: "row", alignItems: "center" },
    detailsTitle: { fontSize: 16, fontWeight: "700", color: "#1976d2" },
    detailsSubtitle: { fontSize: 13, color: "#444", marginTop: 4 },

    // efficiency
    efficiencyCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        alignItems: "center",
        marginBottom: 14,
        elevation: 3,
    },
    alertTitle: { fontSize: 14, fontWeight: "700" },
    effValue: { fontSize: 20, fontWeight: "900", marginTop: 6 },
    progressBar: { height: 10, borderRadius: 10, marginTop: 8 },
    effHint: { fontSize: 12, color: "#607d8b", marginTop: 6 },

    // history
    historyCard: {
        backgroundColor: "#112240",
        padding: 14,
        borderRadius: 12,
        marginBottom: 16,
    },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#fff", marginBottom: 8 },
    historyItem: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    historyText: { color: "#cfd8dc", marginLeft: 10 },

    // actions
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    link: { color: "#1976d2", fontWeight: "700", fontSize: 15 },
    button: {
        backgroundColor: "#1976d2",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
    buttonText: { color: "#fff", fontWeight: "700" },

    // footer
    statusFooter: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 24 },
    statusDotSmall: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
    onlineText: { fontWeight: "700" },
});
