import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  Modal,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

export default function QrCode() {
  const navigation = useNavigation(); // hook para navegação
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Fecha a câmera automaticamente ao sair da tela
  useFocusEffect(
    React.useCallback(() => {
      return () => setShowCamera(false);
    }, [])
  );

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const enviarCodigo = () => {
    Keyboard.dismiss();
    if (!codigo.trim()) {
      Alert.alert("Atenção", "Digite o código da máquina antes de enviar!");
      return;
    }
    setModalVisible(true); // abre o modal
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Precisamos da permissão da câmera!</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Permitir acesso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} facing="back" />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.closeButtonText}> Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>
          Selecione uma opção para visualizar a máquina:
        </Text>

        {/* Bloco da Câmera */}
        <View style={styles.card}>
          <Text style={styles.label}>Escanear o código QR da máquina</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setShowCamera(true)}
          >
            <Ionicons name="camera" size={28} color="#fff" />
            <Text style={styles.optionText}>Abrir Câmera</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.or}>ou</Text>

        {/* Bloco de Inserção Manual */}
        <View style={styles.card}>
          <Text style={styles.label}>Digite o código da máquina</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ex: 12345"
              placeholderTextColor="#aaa"
              value={codigo}
              onChangeText={setCodigo}
              returnKeyType="done"
              onSubmitEditing={enviarCodigo}
            />
            <TouchableOpacity style={styles.enterButton} onPress={enviarCodigo}>
              <Text style={styles.enterText}>⏎</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Ionicons
                name="help-circle-outline"
                size={65}
                color="#007AFF"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.modalTitle}>Máquina encontrada</Text>
              <Text style={styles.modalText}>
                Você deseja visualizar essa máquina?
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#007AFF" }]}
                  onPress={() => {
                    setModalVisible(false);
                    setCodigo("");
                    navigation.navigate("Detalhes", { codigo: codigo || "12345" });
                  }}
                >
                  <Text style={styles.modalButtonText}>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#999" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

// === estilos ===
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#001943",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "600",
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  optionButton: {
    backgroundColor: "#003FA9",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#003FA9",
    paddingVertical: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  or: {
    color: "#ccc",
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  enterButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  enterText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
    alignItems: "center",
    padding: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
