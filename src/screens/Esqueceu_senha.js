import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { recuperarSenha } from "../config/cloudflareApi";

export default function EsqueceuSenha({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  async function handleRecuperar() {
    if (!cpf || !senhaNova || !confirmarSenha) {
      setModalMsg("Preencha todos os campos.");
      setModalVisible(true);
      return;
    }

    setLoading(true);

    const r = await recuperarSenha(cpf, senhaNova, confirmarSenha);

    setLoading(false);

    if (r.erro) {
      setModalMsg(r.erro);
      setModalVisible(true);
      return;
    }

    setModalMsg("Senha atualizada com sucesso!");
    setModalVisible(true);

    setCpf("");
    setSenhaNova("");
    setConfirmarSenha("");
  }

  return (
    <LinearGradient
      colors={["#0B2D5F", "#1A3E7C", "#183C70"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Recuperar Senha</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpf}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Nova senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua nova senha"
              placeholderTextColor="#B0B0B0"
              secureTextEntry
              value={senhaNova}
              onChangeText={setSenhaNova}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              placeholderTextColor="#B0B0B0"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleRecuperar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Atualizar Senha</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text style={styles.backLogin}>Voltar ao login</Text>
          </TouchableOpacity>
        </View>

        {/* Modal estilizado */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {modalMsg.includes("sucesso") ? "Sucesso!" : "Aviso"}
              </Text>

              <Text style={styles.modalMessage}>{modalMsg}</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.goBack();
                }}

              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    width: width * 0.85,
    padding: 22,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
  },

  title: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
  },

  inputWrapper: {
    width: "100%",
    marginBottom: 15,
  },

  label: {
    color: "#A0C4FF",
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 14,
    borderRadius: 12,
    color: "#FFF",
    fontSize: 16,
  },

  button: {
    width: "100%",
    backgroundColor: "#1A73E8",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },

  backLogin: {
    color: "#A0C4FF",
    fontSize: 15,
    textDecorationLine: "underline",
    marginTop: 10,
    textAlign: "center",
  },

  /* Modal */
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 22,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1A73E8",
  },

  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  modalButton: {
    backgroundColor: "#1A73E8",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
