import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { login } from "../config/cloudflareApi"; // função que você já criou
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

  const navigation = useNavigation();

  const cleanCpf = (value) => value.replace(/\D/g, "");

  const setCpfMasked = (value) => {
    const cleaned = cleanCpf(value);
    setCpf(cleaned);
  };

  const setErrorAndShowModal = (msg) => {
    setError(msg);
    setModalErrorVisible(true);
  };

  const handleLogin = async () => {
    if (!cpf) return setErrorAndShowModal("Informe o CPF.");
    if (cleanCpf(cpf).length !== 11) return setErrorAndShowModal("CPF deve ter 11 dígitos.");
    if (!senha) return setErrorAndShowModal("Informe a senha.");

    setLoading(true);
    try {
      const data = await login(cleanCpf(cpf), senha);
      if (data.erro) {
        // mensagens específicas do backend
        setErrorAndShowModal(data.erro || "Credenciais inválidas");
      } else {
        // salvar somente os dados necessários (sem senha)
        await AsyncStorage.setItem("@user_data", JSON.stringify(data));
        setModalSuccessVisible(true);
        setCpf("");
        setSenha("");
      }
    } catch (e) {
      setErrorAndShowModal(e.message || "Erro de conexão.");
    }
    setLoading(false);
  };

  const handleSuccessConfirm = () => {
    setModalSuccessVisible(false);
    navigation.navigate("MainTabs");
  };

  return (
    <LinearGradient
      colors={["#0B2D5F", "#1A3E7C", "#183C70"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/img/logo_principal.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Bem-vindo de volta!</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              placeholder="Digite seu CPF"
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpfMasked}
              maxLength={11}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("EsqueceuSenha")}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
          </TouchableOpacity>
        </View>

        {/* MODAL DE ERRO */}
        <Modal visible={modalErrorVisible} transparent animationType="fade" onRequestClose={() => setModalErrorVisible(false)}>
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

        {/* MODAL DE SUCESSO */}
        <Modal visible={modalSuccessVisible} transparent animationType="fade" onRequestClose={handleSuccessConfirm}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Sucesso!</Text>
              <Text style={styles.modalMessage}>Login realizado com sucesso.</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleSuccessConfirm}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 50 },
  logo: { width: 240, height: 110, marginBottom: 10 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "700", letterSpacing: 1 },
  formContainer: {
    width: Dimensions.get("window").width * 0.85,
    alignItems: "center",
    padding: 22,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  inputWrapper: { width: "100%", marginBottom: 15 },
  label: { color: "#A0C4FF", marginBottom: 6, fontWeight: "600" },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 14,
    borderRadius: 12,
    color: "#FFF",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#A0C4FF",
    marginBottom: 20,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
  },
  button: {
    width: "100%",
    backgroundColor: "#1A73E8",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 18, letterSpacing: 1 },

  // MODAL
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 22,
    alignItems: "center",
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#1A73E8" },
  modalMessage: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#333" },
  modalButton: { backgroundColor: "#1A73E8", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
  modalButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
