import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header_stack";

export default function ChatBot({ navigation }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { from: "bot", text: "Olá, Lucas Machado! No que posso te ajudar hoje?" },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);

    const handleSend = (text) => {
        if (!text.trim()) return;
        // Adiciona mensagem do usuário
        setMessages(prev => [...prev, { from: "user", text }]);
        setMessage("");

        // Resposta do bot simulada com delay
        setTimeout(() => {
            setMessages(prev => [...prev, { from: "bot", text: "Entendi! Estou processando sua solicitação..." }]);
        }, 600);
    };

    const quickSuggestions = [
        "Como melhorar o rendimento da máquina 3?",
        "Qual o consumo ideal de energia?",
        "Sugerir melhorias de eficiência"
    ];

    return (
        <View style={styles.container}>
            <Header title="Chat-Bot" onPressBack={() => navigation.goBack()} />

            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.welcomeTitle}>Bem-vindo ao Chat-Bot Inteligente!</Text>
                <Text style={styles.welcomeText}>
                    Converse com nosso assistente sobre máquinas, processos e eficiência sustentável.
                </Text>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={90}
            >
                <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
                    {/* Sugestões rápidas */}
                    <View style={styles.quickSuggestionsContainer}>
                        {quickSuggestions.map((s, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.quickButton}
                                onPress={() => handleSend(s)}
                            >
                                <Text style={styles.quickButtonText}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {messages.map((msg, i) => (
                        <View
                            key={i}
                            style={msg.from === "bot" ? styles.botMessageContainer : styles.userMessageContainer}
                        >
                            {msg.from === "bot" && (
                                <View style={styles.botIcon}>
                                    <Icon name="robot-outline" size={22} color="#fff" />
                                </View>
                            )}
                            <View style={msg.from === "bot" ? styles.botMessage : styles.userMessage}>
                                <Text style={msg.from === "bot" ? styles.botText : styles.userText}>
                                    {msg.text}
                                </Text>
                            </View>
                        </View>
                    ))}

                </ScrollView>

                {/* Ícone de ajuda */}
                <TouchableOpacity style={styles.helpIcon} onPress={() => setModalVisible(true)}>
                    <Icon name="help-circle-outline" size={28} color="#0078ff" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.reportIcon]}
                    onPress={() => setReportModalVisible(true)}
                >
                    <Icon name="leaf" size={28} color="#4CAF50" />
                </TouchableOpacity>

                {/* Campo de digitação */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem..."
                        placeholderTextColor="#999"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={() => handleSend(message)}>
                        <Icon name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* Modal de instruções */}
            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Icon name="robot-happy-outline" size={48} color="#0078ff" style={{ marginBottom: 10 }} />
                        <Text style={styles.modalTitle}>Como usar o Chat-Bot ?</Text>
                        <Text style={styles.modalText}>
                            Nossa IA pode te ajudar a entender o desempenho das máquinas, otimizar processos e resolver problemas rapidamente.
                            {"\n\n"}Ela está pronta para:
                            {"\n"}• Fornecer informações detalhadas sobre suas máquinas
                            {"\n"}• Sugerir melhorias em eficiência e sustentabilidade
                            {"\n"}• Tirar dúvidas sobre processos e operações
                        </Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Entendi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Relatórios */}
            <Modal
                transparent
                animationType="fade"
                visible={reportModalVisible}
                onRequestClose={() => setReportModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setReportModalVisible(false)}>
                            <Icon name="close" size={26} color="#333" />
                        </TouchableOpacity>

                        <Icon name="leaf" size={54} color="#4CAF50" style={{ marginBottom: 10 }} />
                        <Text style={[styles.modalTitle, { color: "#2b9143ff", fontSize: 20 }]}
                        >Relatórios Sustentáveis</Text>
                        <Text style={styles.modalText}>
                            Aqui você pode acessar os relatórios detalhados sobre eficiência e sustentabilidade das máquinas.
                            {"\n\n"}Você encontrará informações sobre:
                            {"\n"}• Consumo de energia
                            {"\n"}• Eficiência operacional
                            {"\n"}• Indicadores de sustentabilidade
                        </Text>

                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: "#4CAF50", color: "#fff" }]}
                            onPress={() => {
                                setReportModalVisible(false);
                                navigation.navigate("Relatorios"); // Redireciona para a página de relatórios
                            }}
                        >
                            <Text style={styles.modalButtonText}>Ver Relatórios</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f7f9fc" },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#fff",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
        elevation: 5,
    },
    welcomeTitle: { fontSize: 18, fontWeight: "700", color: "#000", marginBottom: 5, textAlign: "center" },
    welcomeText: { fontSize: 14, color: "#444", textAlign: "center", lineHeight: 20 },
    chatArea: { flex: 1, paddingHorizontal: 16, marginTop: 10 },
    botMessageContainer: { flexDirection: "row", alignItems: "flex-start", marginVertical: 6 },
    botIcon: { backgroundColor: "#0078ff", width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", marginRight: 10 },
    botMessage: { backgroundColor: "#e8f1ff", borderRadius: 12, padding: 12, maxWidth: "75%" },
    botText: { fontSize: 14, color: "#333" },
    userMessageContainer: { flexDirection: "row", justifyContent: "flex-end", marginVertical: 6 },
    userMessage: { backgroundColor: "#0078ff", borderRadius: 12, padding: 12, maxWidth: "75%" },
    userText: { fontSize: 14, color: "#fff" },
    quickSuggestionsContainer: { marginTop: 10 },
    quickButton: { backgroundColor: "#e8f1ff", padding: 10, borderRadius: 20, marginVertical: 4 },
    quickButtonText: { color: "#0078ff", fontWeight: "600", fontSize: 13 },
    helpIcon: {
        position: "absolute",
        right: 28,
        bottom: 130,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    inputContainer: { flexDirection: "row", alignItems: "center", borderColor: "#ccc", borderWidth: 1, borderRadius: 25, paddingHorizontal: 12, backgroundColor: "#fff", margin: 16, marginBottom: 60 },
    input: { flex: 1, height: 50, fontSize: 14, color: "#333" },
    sendButton: { backgroundColor: "#0078ff", padding: 12, borderRadius: 25, marginRight: -12 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 },
    modalBox: { backgroundColor: "#fff", borderRadius: 16, padding: 20, width: "90%", alignItems: "center", elevation: 5 },
    modalTitle: { fontSize: 18, fontWeight: "bold", color: "#0078ff", marginBottom: 10 },
    modalText: { fontSize: 14, color: "#444", textAlign: "center", lineHeight: 22, marginBottom: 15 },
    modalButton: { backgroundColor: "#0078ff", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 },
    modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
    reportIcon: {
        position: "absolute",
        right: 80,
        bottom: 130,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    closeButton: { position: 'absolute', top: 15, right: 15, backgroundColor: '#f2f2f2', borderRadius: 20, padding: 6, elevation: 4 },
});
