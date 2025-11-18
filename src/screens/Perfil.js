import React, { useState } from "react";
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
import { useEffect } from "react";
import { supabase } from "../config/SupaBaseConfig";

export default function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [cpf, setCpf] = useState("");
  const [setor, setSetor] = useState("");
  const [tipo, setTipo] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    try {
      // 1. Pega o usuário autenticado
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        console.log("Erro no Auth:", authError);
        return;
      }

      const user = authData.user;
      setEmail(user.email);
      setIdUser(user.id);

      // 2. Busca na tabela users
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id_auth", user.id)
        .single();

      if (error) {
        console.log("Erro ao buscar user:", error);
        return;
      }

      // 3. Coloca no estado
      setNome(data.nome);
      setCpf(data.cpf);
      setSetor(data.setor);
      setTipo(data.tipo);
      setDataAdmissao(data.data_de_admissao);
    } catch (e) {
      console.log("ERRO GERAL:", e);
    }
  };


  const salvarEdicao = () => {
    setModalVisible(false);
    Alert.alert("Sucesso", "Perfil editado com sucesso!");
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.view}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {/* === CARD DE PERFIL === */}
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

        {/* === CARD DE INFORMAÇÕES PESSOAIS === */}
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

        {/* === BOTÕES === */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#0C254E" }]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="pencil" size={20} color="#fff" />
            <Text style={styles.actionText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#007B83" }]}
            onPress={() => navigation.navigate("GerenciarUsuarios")}
          >
            <Ionicons name="people" size={20} color="#fff" />
            <Text style={styles.actionText}>Gerenciar Usuários</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#E53935" }]}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Desconectar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* === MODAL DE EDIÇÃO === */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <Text style={styles.modalLabel}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            <Text style={styles.modalLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* === MODAL DE LOGOUT === */}
      <Modal
        animationType="fade"
        transparent
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={[styles.modalText, { marginBottom: 20 }]}>
              Você tem certeza que deseja se desconectar?
            </Text>
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: "#ccc" }]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={[styles.saveButtonText, { color: "#333" }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: "#E53935" }]}
                onPress={handleLogout}
              >
                <Text style={styles.saveButtonText}>Desconectar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, alignItems: "center" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 15,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  infoBox: { marginLeft: 15 },
  userName: { fontSize: 20, fontWeight: "bold", color: "#0C254E" },
  userEmail: { fontSize: 14, color: "#555" },

  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0C254E",
    marginBottom: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
  },
  infoLabel: { fontSize: 15, color: "#333", marginBottom: 6 },
  bold: { fontWeight: "bold" },

  buttonsContainer: { width: "100%", gap: 12, marginBottom: 30 },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },

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
    top: 12,
    right: 12,
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 5,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  modalLabel: { alignSelf: "flex-start", marginBottom: 5, fontWeight: "600" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#0C254E",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  modalText: { fontSize: 16, color: "#333", textAlign: "center" },
});
