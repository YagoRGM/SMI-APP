import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atualizarUsuario } from "../config/cloudflareApi";

export default function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const [idUser, setIdUser] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("");
  const [tipo, setTipo] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");

  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("@user_data");
      if (!userDataString) return;

      const user = JSON.parse(userDataString);

      setIdUser(user.usuario?.id_usuario || "");
      setNome(user.usuario?.nome_usuario || "");
      setEmail(user.usuario?.email_usuario || "");
      setCpf(user.usuario?.cpf_usuario || "");
      setSetor(user.usuario?.setor_usuario || "");
      setTipo(user.usuario?.tipo_usuario || "");
      setDataAdmissao(user.usuario?.data_admissao || "");
    } catch (e) {
      console.log("Erro ao carregar usuário:", e);
    }
  };

  const salvarEdicao = async () => {
    const updatedUser = {
      nome_usuario: nome,
      email_usuario: email,
      cpf_usuario: cpf,
      setor_usuario: setor,
      tipo_usuario: tipo
    };

    try {
      const response = await atualizarUsuario(idUser, updatedUser);

      if (response.ok) {
        // Atualiza local
        await AsyncStorage.setItem("@user_data", JSON.stringify({ usuario: { id_usuario: idUser, ...updatedUser } }));
        setModalVisible(false);
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o perfil.");
      }
    } catch (err) {
      console.log("Erro ao atualizar perfil:", err);
      Alert.alert("Erro", "Algo deu errado, tente novamente.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user_data");
    setLogoutModalVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.view}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/img/avatar.png")}
            style={styles.avatar}
          />
          <View style={styles.infoBox}>
            <Text style={styles.userName}>{nome}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informações Pessoais</Text>
          <View style={styles.divider} />
          <Text style={styles.infoLabel}>
            <Text style={styles.bold}>ID: </Text>{idUser}
          </Text>
          <Text style={styles.infoLabel}>
            <Text style={styles.bold}>CPF: </Text>{cpf}
          </Text>
          <Text style={styles.infoLabel}>
            <Text style={styles.bold}>Tipo de usuário: </Text>{tipo}
          </Text>
          <Text style={styles.infoLabel}>
            <Text style={styles.bold}>Setor: </Text>{setor}
          </Text>
          <Text style={styles.infoLabel}>
            <Text style={styles.bold}>Data de Admissão: </Text>{dataAdmissao}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#0C254E" }]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="pencil" size={20} color="#fff" />
            <Text style={styles.actionText}>Editar Perfil</Text>
          </TouchableOpacity>

          {tipo === "ADMINISTRADOR" && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#007B83" }]}
              onPress={() => navigation.navigate("GerenciarUsuarios")}
            >
              <Ionicons name="people" size={20} color="#fff" />
              <Text style={styles.actionText}>Gerenciar Usuários</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#E53935" }]}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Desconectar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de edição */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Setor"
              value={setor}
              onChangeText={setSetor}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#0C254E" }]}
                onPress={salvarEdicao}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#E53935" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de logout */}
      <Modal visible={logoutModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Logout</Text>
            <Text style={styles.modalMessage}>
              Tem certeza que deseja desconectar?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#0C254E" }]}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#E53935" }]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: "#F5F7FA" },
  container: { padding: 20, alignItems: "center" },

  // HEADER DO PERFIL
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  infoBox: { marginLeft: 15 },
  userName: { fontSize: 22, fontWeight: "bold", color: "#0C254E" },
  userEmail: { fontSize: 14, color: "#555", marginTop: 4 },
  
  // CARD DE INFORMAÇÕES
  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#0C254E", marginBottom: 10 },
  divider: { width: "100%", height: 1, backgroundColor: "#E0E0E0", marginBottom: 12 },
  infoLabel: { fontSize: 15, color: "#333", marginBottom: 8 },
  bold: { fontWeight: "bold" },
  
  // BOTOES DE AÇÃO
  buttonsContainer: { width: "100%", gap: 12, marginBottom: 30 },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  actionText: { color: "#fff", fontWeight: "bold", fontSize: 15, marginLeft: 8 },
  
  // MODAL
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
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  closeButton: { position: "absolute", top: 12, right: 12, backgroundColor: "#eee", borderRadius: 20, padding: 5 },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#0C254E" },
  modalMessage: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 14,
  },
  modalLabel: { alignSelf: "flex-start", marginBottom: 5, fontWeight: "600", color: "#333" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
    backgroundColor: "#F9F9F9",
  },
  saveButton: {
    backgroundColor: "#0C254E",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalText: { fontSize: 16, color: "#333", textAlign: "center", marginBottom: 15 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: { flex: 1, padding: 12, borderRadius: 12, alignItems: "center", marginHorizontal: 5 },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
});

