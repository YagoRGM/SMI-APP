import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header_stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get("window").width;

export default function Relatorios({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [modalSustentabilidade, setModalSustentabilidade] = useState(false);
    const [selectedSugestao, setSelectedSugestao] = useState(null);
    const [modalConfirmarAplicacao, setModalConfirmarAplicacao] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const maquinas = [
        {
            nome: "Máquina Hidráulica #12",
            descricaoCurta: "Vibração acima do ideal",
            statusTexto: "Atenção",
            badgeColor: "#FFC107",
            bgColor: "#FFF8E1",
            icon: "alert-circle-outline",
            iconColor: "#FFC107",
            dados: [
                { tipo: "Vibração", valor: "5,6Hz", hora: "14h23" },
                { tipo: "Temperatura", valor: "75°C", hora: "14h23" },
                { tipo: "Pressão", valor: "220 bar", hora: "14h23" },
            ],
            descricaoDetalhada: "A vibração está acima do ideal. Sugere-se calibração preventiva."
        },
        {
            nome: "Máquina de corte #07",
            descricaoCurta: "Operando dentro do normal",
            statusTexto: "Normal",
            badgeColor: "#4CAF50",
            bgColor: "#E8F5E9",
            icon: "check-circle-outline",
            iconColor: "#4CAF50",
            dados: [
                { tipo: "Temperatura", valor: "35°C", hora: "13h50" },
                { tipo: "Velocidade", valor: "1200 rpm", hora: "13h50" },
            ],
            descricaoDetalhada: "Funcionamento dentro dos parâmetros ideais."
        },
        {
            nome: "Motor elétrico #25",
            descricaoCurta: "Temperatura crítica detectada",
            statusTexto: "Crítico",
            badgeColor: "#F44336",
            bgColor: "#FFEBEE",
            icon: "close-circle-outline",
            iconColor: "#F44336",
            dados: [
                { tipo: "Temperatura", valor: "98°C", hora: "14h00" },
                { tipo: "Corrente", valor: "15A", hora: "14h00" },
                { tipo: "Vibração", valor: "7,8Hz", hora: "14h00" },
            ],
            descricaoDetalhada: "Temperatura crítica detectada. Risco de falha se continuar operando."
        },
        {
            nome: "Torno CNC #14",
            descricaoCurta: "Peças com pequenas vibrações detectadas",
            statusTexto: "Atenção",
            badgeColor: "#FFC107",
            bgColor: "#FFF8E1",
            icon: "cog-outline",
            iconColor: "#FFC107",
            dados: [
                { tipo: "Vibração", valor: "4,2Hz", hora: "14h30" },
                { tipo: "Temperatura", valor: "60°C", hora: "14h30" },
                { tipo: "Velocidade", valor: "800 rpm", hora: "14h30" },
            ],
            descricaoDetalhada: "Vibrações pequenas detectadas nas peças. Monitorar e ajustar conforme necessário."
        },
        {
            nome: "Compressor #09",
            descricaoCurta: "Consumo energético acima do nível recomendado",
            statusTexto: "Crítico",
            badgeColor: "#F44336",
            bgColor: "#FFEBEE",
            icon: "alert-circle-outline",
            iconColor: "#F44336",
            dados: [
                { tipo: "Consumo energético", valor: "4500KwH", hora: "16h45" },
            ],
            descricaoDetalhada: "Consumo energético acima do nível recomendado. Recomenda-se análise imediata."
        },
    ];


    const sugestoes = [
        {
            texto: "Reutilizar água de refrigeração",
            impacto: "-12% consumo hídrico, +2% eficiência",
            co2: 18,
            cor: "#4CAF50"
        },
        {
            texto: "Moderar velocidade de transporte",
            impacto: "-5% consumo energia, -12% CO2",
            co2: 12,
            cor: "#4CAF50"
        },
        {
            texto: "Instalar sensores de temperatura e vibração",
            impacto: "-15% risco de falhas, +3% economia de energia",
            co2: 5,
            cor: "#4CAF50"
        },
        {
            texto: "Trocar iluminação por LED industrial",
            impacto: "-20% consumo elétrico, -15% CO2",
            co2: 15,
            cor: "#4CAF50"
        }
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Header title="Relatórios Sustentáveis" onPressBack={() => navigation.goBack()} />

            <ScrollView style={styles.main} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Header */}
                <View style={styles.headerTitle}>
                    <MaterialCommunityIcons name="file-chart" size={28} color="#2196F3" style={{ marginRight: 8 }} />
                    <Text style={styles.title}>Relatórios</Text>
                </View>
                <Text style={styles.subtitle}>Análises de IA e recomendações de eficiência sustentável</Text>

                {/* Card Análises de IA */}
                <View style={{ ...styles.card, height: 400 }}>
                    <View style={[styles.cardHeader, { backgroundColor: '#2196F3' }]}>
                        <MaterialCommunityIcons name="robot" size={26} color="#FFF" style={{ marginRight: 12 }} />
                        <Text style={styles.cardHeaderText}>Análises de IA por máquina</Text>
                    </View>

                    <ScrollView style={styles.machineList} contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={true}>
                        {maquinas.map((maquina, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.machineCard, { backgroundColor: maquina.bgColor }]}
                                onPress={() => { setSelectedMachine(maquina); setModalVisible(true); }}
                            >
                                <MaterialCommunityIcons name={maquina.icon} size={28} color={maquina.iconColor} />
                                <View style={styles.machineInfo}>
                                    <Text style={styles.machineName}>{maquina.nome}</Text>
                                    <Text style={styles.machineDescription}>{maquina.descricaoCurta}</Text>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: maquina.badgeColor }]}>
                                    <Text style={styles.statusText}>{maquina.statusTexto}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("ChatBot")} // 👈 navega para a tela ChatBot
                >
                    <MaterialCommunityIcons
                        name="robot"
                        size={28}
                        color="#fff"
                        style={{ marginRight: 10 }}
                    />
                    <Text style={styles.buttonText}>Falar com o Chat-Bot</Text>
                </TouchableOpacity>


                {/* Card Sustentabilidade */}
                <View style={styles.card}>
                    <View style={[styles.cardHeader, { backgroundColor: '#4CAF50' }]}>
                        <MaterialCommunityIcons name="leaf" size={26} color="#FFF" style={{ marginRight: 12 }} />
                        <Text style={styles.cardHeaderText}>Sugestões de Sustentabilidade</Text>
                    </View>

                    <View style={styles.cardContent}>
                        {sugestoes.map((sugestao, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.sugestaoItem, { borderLeftColor: sugestao.cor, borderLeftWidth: 4, paddingLeft: 8 }]}
                                onPress={() => { setSelectedSugestao(sugestao); setModalSustentabilidade(true); }}
                            >
                                <MaterialCommunityIcons name="leaf" size={22} color={sugestao.cor} />
                                <Text style={styles.sugestaoText}>{sugestao.texto}</Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={{ ...styles.subtitle, marginBottom: 3 }}>Se aplicadas todas as sugestões, sua linha de produção pode alcançar até 12% mais eficiência energética e reduzir 8.27% da emissão de C0²</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalConfirmarAplicacao(true)}
                >
                    <Text style={styles.buttonText}>Aplicar Recomendações</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Modal Máquina */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={26} color="#333" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>{selectedMachine?.nome}</Text>

                        <ScrollView style={{ maxHeight: 400, width: "100%" }}>

                            <View style={[styles.statusContainer, { backgroundColor: selectedMachine?.badgeColor }]}>
                                <MaterialCommunityIcons
                                    name={selectedMachine?.icon}
                                    size={24}
                                    color="#FFF"
                                    style={{ marginRight: 8 }}
                                />
                                <Text style={styles.statusTextModal}>{selectedMachine?.statusTexto}</Text>
                            </View>
                            <Text style={[styles.modalDescription, { marginTop: 12, color: "#333" }]}>
                                {selectedMachine?.descricaoDetalhada}
                            </Text>
                            <Text style={[styles.modalSubTitle, { marginTop: 16 }]}>Últimos dados:</Text>
                            {selectedMachine?.dados.map((item, index) => (
                                <View key={index} style={styles.dadoItem}>
                                    <MaterialCommunityIcons
                                        name="circle-small"
                                        size={12}
                                        color={selectedMachine.iconColor}
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text style={styles.dadoText}>
                                        <Text style={{ fontWeight: "bold" }}>{item.tipo}:</Text> {item.valor}{" "}
                                        <Text style={{ color: "#777" }}>({item.hora})</Text>
                                    </Text>
                                </View>
                            ))}
                            <TouchableOpacity
                                style={styles.buttonData}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate("Detalhes", { maquina: selectedMachine });
                                }}
                            >
                                <Text style={styles.buttonDataText}>Ver dados completos da máquina</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>
            </Modal>

            {/* Modal Sustentabilidade */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalSustentabilidade}
                onRequestClose={() => setModalSustentabilidade(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalSustentabilidade(false)}>
                            <Ionicons name="close" size={26} color="#333" />
                        </TouchableOpacity>

                        <Text style={[styles.modalTitle, { color: selectedSugestao?.cor }]}>{selectedSugestao?.texto}</Text>
                        <ScrollView style={{ maxHeight: 300, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, color: "#333", marginBottom: 4 }}>
                                <Text style={{ fontWeight: 'bold' }}>Impacto: </Text>
                                {selectedSugestao?.impacto}
                            </Text>
                            <Text style={{ fontSize: 15, color: "#333", marginBottom: 4 }}>
                                <Text style={{ fontWeight: 'bold' }}>Redução CO₂: </Text>
                                {selectedSugestao?.co2}%
                            </Text>
                        </ScrollView>

                    </View>
                </View>
            </Modal>

            {/* Modal de Confirmação de Aplicação */}
            <Modal
                visible={modalConfirmarAplicacao}
                transparent
                animationType="fade"
                onRequestClose={() => setModalConfirmarAplicacao(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={65}
                            color="#007AFF"
                            style={{ marginBottom: 10 }}
                        />
                        <Text style={styles.modalTitle}>Confirmar Aplicação</Text>
                        <Text style={styles.modalDescription}>
                            Tem certeza que deseja marcar todas as recomendações como aplicadas?
                            Elas serão consideradas concluídas e removidas da lista.
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: "#007AFF" }]}
                                onPress={() => {
                                    setModalConfirmarAplicacao(false);
                                    setTimeout(() => setSuccessModalVisible(true), 300); // pequeno delay p/ transição suave
                                }}
                            >
                                <Text style={styles.modalButtonText}>Sim, aplicar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: "#999" }]}
                                onPress={() => setModalConfirmarAplicacao(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de sucesso */}
            <Modal visible={successModalVisible} transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={70}
                            color="#28A745"
                            style={{ marginBottom: 10 }}
                        />
                        <Text style={styles.modalTitle}>Tudo certo!</Text>
                        <Text style={styles.modalDescription}>
                            As recomendações foram aplicadas com sucesso.
                        </Text>

                        <TouchableOpacity
                            style={[styles.modalButtonSingle]}
                            onPress={() => setSuccessModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6F8' },
    main: { padding: 24 },
    headerTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginLeft: 10 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 16, color: '#6C757D', marginLeft: 12, marginBottom: 20 },
    card: { backgroundColor: '#FFF', borderRadius: 18, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
    cardHeaderText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    cardContent: { padding: 18 },
    machineCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, marginHorizontal: 12, borderRadius: 12, marginBottom: 14, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    machineInfo: { flex: 1, marginLeft: 12 },
    machineName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    machineDescription: { fontSize: 14, color: '#555', marginTop: 2 },
    machineList: { maxHeight: 380 },
    statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
    statusText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    sugestaoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    sugestaoText: { fontSize: 15, marginLeft: 10, color: '#333' },
    button: { flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#2196F3', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 30, shadowColor: "#000", shadowOpacity: 0.1 },
    buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContainer: { width: screenWidth - 40, backgroundColor: '#FFF', borderRadius: 15, padding: 25, alignItems: 'center' },
    closeButton: { position: 'absolute', top: 15, right: 15, backgroundColor: '#f2f2f2', borderRadius: 20, padding: 6, elevation: 4 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
    modalSubTitle: { fontSize: 18, fontWeight: 'bold', color: '#555', marginBottom: 8 },
    statusContainer: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 8, marginBottom: 8 },
    statusTextModal: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    dadoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    dadoText: { fontSize: 15, color: '#333' },

    modalBox: {
        backgroundColor: "#FFF",
        width: "80%",
        borderRadius: 15,
        padding: 25,
        alignItems: "center",
        justifyContent: "center", // 🔥 adiciona isso
        elevation: 8,
    },

    modalDescription: {
        fontSize: 15,
        textAlign: "center",
        color: "#333",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },

    modalButtonSingle: {
        backgroundColor: "#28A745",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

    modalButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 15,
    },

    buttonData: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1
    },
    buttonDataText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
