import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Modal,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header_stack";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../config/SupaBaseConfig";

export default function CadastrarUsuario() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [setor, setSetor] = useState("");
    const [status, setStatus] = useState("ativo");
    const [tipo, setTipo] = useState("Funcionario");
    const [dataAdmissao, setDataAdmissao] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalErrorVisible, setModalErrorVisible] = useState(false);
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

    const navigation = useNavigation();

    const handleCadastrar = async () => {
        setError("");

        // validação
        if (!nome || !cpf || !email || !setor) {
            setError("Preencha todos os campos obrigatórios.");
            setModalErrorVisible(true);
            return;
        }

        try {
            setLoading(true);

            // 1️⃣ Criar usuário no Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: "123qwe", // senha provisória — depois ele troca
            });

            if (authError) {
                throw authError;
            }

            const idAuth = authData.user.id;

            // 2️⃣ Converter data admissão para YYYY-MM-DD
            const isoDate = dataAdmissao.toISOString().split("T")[0];

            // 3️⃣ Inserir na tabela users
            const { error: insertError } = await supabase
                .from("users")
                .insert([
                    {
                        id_auth: idAuth,
                        nome: nome,
                        cpf: cpf.replace(/\D/g, ""),
                        email: email,
                        setor: setor,
                        status: status,
                        tipo: tipo,
                        data_de_admissao: isoDate,
                    },
                ]);

            if (insertError) {
                throw insertError;
            }

            setLoading(false);
            setModalSuccessVisible(true);

            // reset
            setNome("");
            setCpf("");
            setEmail("");
            setSetor("");
            setStatus("Ativo");
            setTipo("Funcionario");
            setDataAdmissao(new Date());

        } catch (err) {
            setLoading(false);
            setError(err.message || "Erro inesperado.");
            setModalErrorVisible(true);
        }
    };

    const handleSuccessConfirm = () => {
        setModalSuccessVisible(false);
        navigation.goBack();
    };

    const onChangeDate = (event, selectedDate) => {
        if (Platform.OS === "android") {
            setShowDatePicker(false);
        }
        if (selectedDate) setDataAdmissao(selectedDate);
    };

    return (
        <SafeAreaView style={styles.safe}>
            <Header title="Voltar" onPressBack={() => navigation.goBack()} />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >

                <LinearGradient
                    colors={["#0B2D5F", "#1A3E7C", "#183C70"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Cadastrar Usuário</Text>

                        {/* Nome */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Nome</Text>
                            <TextInput
                                placeholder="Digite o nome"
                                placeholderTextColor="#B0B0B0"
                                style={styles.input}
                                value={nome}
                                onChangeText={setNome}
                                returnKeyType="next"
                            />
                        </View>

                        {/* CPF */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>CPF</Text>
                            <TextInput
                                placeholder="Digite o CPF"
                                placeholderTextColor="#B0B0B0"
                                style={styles.input}
                                keyboardType="numeric"
                                value={cpf}
                                onChangeText={setCpf}
                                returnKeyType="next"
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder="Digite o email"
                                placeholderTextColor="#B0B0B0"
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                returnKeyType="next"
                            />
                        </View>

                        {/* Setor */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Setor</Text>
                            <TextInput
                                placeholder="Digite o setor"
                                placeholderTextColor="#B0B0B0"
                                style={styles.input}
                                value={setor}
                                onChangeText={setSetor}
                                returnKeyType="next"
                            />
                        </View>

                        {/* Status */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Status</Text>
                            <View style={[styles.input, { borderRadius: 10, paddingHorizontal: 0, height: 48, justifyContent: 'center' }]}>
                                <Picker
                                    selectedValue={status}
                                    onValueChange={(itemValue) => setStatus(itemValue)}
                                    style={{ color: '#FFF', width: '100%' }}
                                    dropdownIconColor="#FFF"
                                >
                                    <Picker.Item label="Ativo" value="ativo" />
                                    <Picker.Item label="Inativo" value="inativo" />
                                </Picker>
                            </View>
                        </View>

                        {/* Tipo de Usuário */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Tipo de Usuário</Text>
                            <View style={[styles.input, { borderRadius: 10, paddingHorizontal: 0, height: 48, justifyContent: 'center' }]}>
                                <Picker
                                    selectedValue={tipo}
                                    onValueChange={(itemValue) => setTipo(itemValue)}
                                    style={{ color: '#FFF', width: '100%' }}
                                    dropdownIconColor="#FFF"
                                >
                                    <Picker.Item label="Administrador" value="Administrador" />
                                    <Picker.Item label="Funcionário" value="Funcionario" />

                                </Picker>
                            </View>
                        </View>

                        {/* Data de Admissão */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Data de Admissão</Text>
                            <TouchableOpacity
                                style={[styles.input, styles.dateButton]}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={styles.dateText}>{dataAdmissao.toLocaleDateString()}</Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={dataAdmissao}
                                    mode="date"
                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                    onChange={onChangeDate}
                                    maximumDate={new Date(2100, 12, 31)}
                                />
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.85}
                            onPress={handleCadastrar}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Modal de erro */}
                <Modal
                    visible={modalErrorVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalErrorVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Ops!</Text>
                            <Text style={styles.modalMessage}>{error}</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalErrorVisible(false)}>
                                <Text style={styles.modalButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal de sucesso */}
                <Modal
                    visible={modalSuccessVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={handleSuccessConfirm}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Sucesso!</Text>
                            <Text style={styles.modalMessage}>Usuário cadastrado com sucesso.</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={handleSuccessConfirm}>
                                <Text style={styles.modalButtonText}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#0B2D5F" },
    scrollContent: { flexGrow: 1, alignItems: "center", paddingVertical: 10 },
    kav: { width: "100%", alignItems: "center" },
    gradient: { width: "100%", alignItems: "center", paddingVertical: 20 },
    title: { color: "#FFF", fontSize: 26, fontWeight: "700", marginBottom: 12, letterSpacing: 0.4 },
    formContainer: {
        width: width * 0.92,
        alignItems: "center",
        padding: 20,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.06)",
        marginBottom: 40,
    },
    inputWrapper: { width: "100%", marginBottom: 12 },
    label: { color: "#A0C4FF", marginBottom: 6, fontWeight: "600" },
    input: {
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.12)",
        padding: 12,
        borderRadius: 10,
        color: "#FFF",
        fontSize: 16,
    },
    dateButton: { justifyContent: "center", height: 48 },
    dateText: { color: "#FFF", fontSize: 16 },
    pickerWrapper: { paddingHorizontal: 8, paddingVertical: 4 },
    picker: { color: "#FFF", width: "100%" },
    button: { width: "100%", backgroundColor: "#34A853", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 6 },
    buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },

    // Modal
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: width * 0.85,
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 18,
        alignItems: "center",
    },
    modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8, color: "#0B2D5F" },
    modalMessage: { fontSize: 15, marginBottom: 14, textAlign: "center", color: "#333" },
    modalButton: { backgroundColor: "#0B2D5F", paddingVertical: 10, paddingHorizontal: 22, borderRadius: 10 },
    modalButtonText: { color: "#fff", fontWeight: "700" },
});
