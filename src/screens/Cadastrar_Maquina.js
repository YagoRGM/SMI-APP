import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header_stack";
import Checkbox from "expo-checkbox";

export default function CadastrarMaquina({ navigation }) {
    const [nome, setNome] = useState("");
    const [modelo, setModelo] = useState("");
    const [monitoramento, setMonitoramento] = useState(true);
    const [alertas, setAlertas] = useState(true);
    const [status, setStatus] = useState("Ativa");
    const [foto, setFoto] = useState(null);

    // estados dos modais
    const [modalSalvarVisible, setModalSalvarVisible] = useState(false);
    const [modalSucesso, setModalSucesso] = useState({ visible: false, mensagem: "" });

    const handleUploadImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    const handleCadastrar = () => {
        setModalSalvarVisible(false);
        setModalSucesso({ visible: true, mensagem: "Máquina cadastrada com sucesso!" });
    };

    const SectionTitle = ({ emoji, title }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionEmoji}>{emoji}</Text>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Header title="Cadastrar Máquina" onPressBack={() => navigation.goBack()} />
            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Cadastrar informações</Text>

                    <SectionTitle emoji="📝" title="Informações básicas" />
                    <Text style={styles.label}>Nome da máquina</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome da máquina"
                        placeholderTextColor="#aaa"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.label}>Modelo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: XRT-5000"
                        value={modelo}
                        onChangeText={setModelo}
                    />

                    <Text style={styles.label}>Número de série (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: MQ-2025-001"
                    />

                    <Text style={styles.label}>Localização</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Setor A"
                    />

                    <Text style={styles.label}>Status da máquina</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => {
                            // Aqui você pode abrir um modal ou ActionSheet para escolher o status
                            // Pra simplificar, vou só alternar entre Ativa/Inativa
                            setStatus(status === "Ativa" ? "Inativa" : "Ativa");
                        }}
                    >
                        <Text>{status}</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Observação (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Observações sobre a máquina"
                    />

                    <View style={styles.divider} />

                    <SectionTitle emoji="🛠️" title="Configuração de sensores" />
                    {/* {[
                        { label: "Temperatura" },
                        { label: "Energia" },
                        { label: "Umidade" },
                        { label: "Pressão" },
                        { label: "Vibração" },
                    ].map((item, i) => (
                        <View key={i} style={styles.checkboxContainer}>
                            <Checkbox value={item.state} onValueChange={item.set} />
                            <Text style={styles.checkboxLabel}>{item.label}</Text>
                        </View>
                    ))} */}

                    <Text style={styles.label}>Observação (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Detalhes adicionais sobre os sensores"
                    />

                    <View style={styles.divider} />
                    <SectionTitle emoji="📡" title="Configuração de monitoramento" />
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={monitoramento} onValueChange={setMonitoramento} />
                        <Text style={styles.checkboxLabel}>Ativar monitoramento em tempo real</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={alertas} onValueChange={setAlertas} />
                        <Text style={styles.checkboxLabel}>Receber alertas da IA</Text>
                    </View>

                    <Text style={styles.label}>Limites personalizados</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Temperatura máxima, pressão etc."
                    />

                    <Text style={styles.label}>Responsável técnico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do responsável"
                    />

                    <View style={styles.divider} />
                    <SectionTitle emoji="🖼️" title="Imagem da máquina" />
                    <TouchableOpacity style={styles.imageBox} onPress={handleUploadImage}>
                        {foto ? (
                            <Image source={{ uri: foto }} style={styles.image} />
                        ) : (
                            <Text style={{ color: "#999" }}>Clique para adicionar uma imagem</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonBlue} onPress={() => setModalSalvarVisible(true)}>
                        <Text style={styles.buttonText}>Cadastrar máquina</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Modal SALVAR */}
            <Modal animationType="fade" transparent visible={modalSalvarVisible}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalSalvarVisible(false)}>
                            <Ionicons name="close" size={22} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Confirmar Cadastro</Text>
                        <Text style={styles.modalText}>
                            Deseja cadastrar a máquina{" "}
                            <Text style={{ fontWeight: "bold" }}>{nome || "sem nome"}</Text>?
                        </Text>

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalSalvarVisible(false)}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleCadastrar}>
                                <Text style={styles.confirmText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal SUCESSO */}
            <Modal animationType="fade" transparent visible={modalSucesso.visible}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalSucesso}>
                        <Ionicons
                            name="checkmark-circle"
                            size={70}
                            color="#28a745"
                            style={{ marginBottom: 15 }}
                        />
                        <Text style={styles.modalSucessoTitulo}>{modalSucesso.mensagem}</Text>
                        <TouchableOpacity
                            style={styles.modalSucessoButton}
                            onPress={() => {
                                setModalSucesso({ visible: false, mensagem: "" });
                                navigation.goBack();
                            }}
                        >
                            <Text style={styles.modalSucessoButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        margin: 12,
        marginBottom: 80,
        elevation: 8,
    },
    title: { fontSize: 22, fontWeight: "bold" },
    sectionHeader: { flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 6 },
    sectionEmoji: { fontSize: 20, marginRight: 8 },
    sectionTitle: { fontSize: 18, fontWeight: "600" },
    divider: { height: 2, backgroundColor: "#eee", marginVertical: 10 },
    label: { fontSize: 14, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
    checkboxLabel: { marginLeft: 8 },
    buttonGray: {
        backgroundColor: "#ccc",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginVertical: 6,
    },
    buttonBlue: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginVertical: 6,
    },
    buttonRed: {
        backgroundColor: "#dc3545",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginVertical: 6,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    imageBox: {
        height: 120,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    image: { width: 100, height: 100, resizeMode: "contain" },

    // MODAIS
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 15,
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 14,
        right: 14,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 6,
        elevation: 3,
    },
    modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    modalText: { textAlign: "center", fontSize: 15, marginBottom: 20 },
    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 10,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: "#0C254E",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#ddd",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    confirmText: { color: "#fff", fontWeight: "bold" },
    cancelText: { color: "#333", fontWeight: "600" },
    modalSucesso: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingVertical: 30,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
    },
    modalSucessoTitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    modalSucessoButton: {
        backgroundColor: "#28a745",
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 10,
    },
    modalSucessoButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
