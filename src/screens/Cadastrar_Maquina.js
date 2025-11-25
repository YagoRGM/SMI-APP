import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  Image,

} from "react-native";
import Header from "../components/Header_stack";
import { criarMaquina, listarUsuarios } from "../config/cloudflareApi";
import { Picker } from '@react-native-picker/picker';

export default function CadastrarMaquina({ navigation, route }) {
  const criadorId = route.params?.id_usuario || route.params?.usuario?.id_usuario;
  if (!criadorId) {
    console.log("ID do usuário não definido!");
  }

  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState("Ativa");
  const [observacao, setObservacao] = useState("");
  const [responsavel, setResponsavel] = useState(null);
  const [imagemEscolhida, setImagemEscolhida] = useState(1); // padrão 1

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalSucesso, setModalSucesso] = useState({ visible: false, mensagem: "" });
  const [modalErro, setModalErro] = useState({ visible: false, mensagem: "" });

  // Pega usuários para o select
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await listarUsuarios();
        setUsuarios(res);
      } catch (e) {
        console.log("Erro ao carregar usuários:", e.message);
      }
    }
    fetchUsuarios();
  }, []);

  const imagens = {
    1: require("../assets/img/imagem_maquina1.png"),
    2: require("../assets/img/imagem_maquina2.png"),
    3: require("../assets/img/imagem_maquina3.png"),
    4: require("../assets/img/imagem_maquina4.png"),
  };

  const handleCadastrar = async () => {
    if (!nome || !modelo || !localizacao) {
      setModalErro({ visible: true, mensagem: "Preencha todos os campos obrigatórios." });
      return;
    }

    setLoading(true);
    try {
      const response = await criarMaquina({
        nome_maquina: nome,
        modelo_maquina: modelo,
        localizacao_maquina: localizacao,
        status_maquina: status,
        observacao_maquina: observacao || null,
        criador_maquina: criadorId,
        operante_maquina: responsavel || null,
        imagem_maquina: imagemEscolhida, // 👈 AQUI!
      });


      if (response.erro) throw new Error(response.erro);

      setModalSucesso({ visible: true, mensagem: "Máquina cadastrada com sucesso!" });
    } catch (e) {
      setModalErro({ visible: true, mensagem: e.message || "Erro ao cadastrar máquina." });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Cadastrar Máquina" onPressBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Cadastrar informações</Text>

          <Text style={styles.label}>Nome da máquina*</Text>
          <TextInput style={styles.input} required placeholder="Digite o nome" value={nome} onChangeText={setNome} />

          <Text style={styles.label}>Modelo*</Text>
          <TextInput style={styles.input} placeholder="Ex: XRT-5000" value={modelo} onChangeText={setModelo} />

          <Text style={styles.label}>Localização*</Text>
          <TextInput style={styles.input} placeholder="Ex: Setor A" value={localizacao} onChangeText={setLocalizacao} />

          <Text style={styles.label}>Status da máquina</Text>
          <TouchableOpacity style={styles.input} onPress={() => setStatus(status === "Ativa" ? "Inativa" : "Ativa")}>
            <Text>{status}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Observação</Text>
          <TextInput style={styles.input} placeholder="Observações" value={observacao} onChangeText={setObservacao} />

          <Text style={styles.label}>Responsável técnico</Text>
          <View style={[styles.input, { padding: 0 }]}>
            <Picker
              selectedValue={responsavel}
              onValueChange={(itemValue) => setResponsavel(itemValue)}
            >
              <Picker.Item label="Selecione" value={null} />
              {usuarios.map((u) => (
                <Picker.Item key={u.id_usuario} label={u.nome_usuario} value={u.id_usuario} />
              ))}
            </Picker>

          </View>

          <Text style={styles.label}>Imagem da máquina</Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {[1, 2, 3, 4].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setImagemEscolhida(num)}
                style={{
                  borderWidth: imagemEscolhida === num ? 3 : 1,
                  borderColor: imagemEscolhida === num ? "#007bff" : "#ccc",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={imagens[num]}
                  style={{ width: 70, height: 70 }}
                />

              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.buttonBlue} onPress={handleCadastrar}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar máquina</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Sucesso */}
      <Modal transparent visible={modalSucesso.visible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{modalSucesso.mensagem}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalSucesso({ visible: false, mensagem: "" });
                navigation.goBack();
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Erro */}
      <Modal transparent visible={modalErro.visible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{modalErro.mensagem}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalErro({ visible: false, mensagem: "" })}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f5f6fa", paddingBottom: 50 },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#0C254E" },
  label: { fontSize: 14, marginBottom: 6, color: "#555", fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fefefe",
    fontSize: 15,
    color: "#333",
  },
  buttonBlue: {
    backgroundColor: "#0C254E",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: { width: "80%", backgroundColor: "#fff", borderRadius: 15, paddingVertical: 30, paddingHorizontal: 20, alignItems: "center" },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#333" },
  modalButton: { backgroundColor: "#0C254E", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12 },
  modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
