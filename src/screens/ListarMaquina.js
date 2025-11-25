import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "../components/Header";
import { useNavigation, useFocusEffect, useEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listarMaquinas } from "../config/cloudflareApi";

export default function ListarMaquina() {
  const [tab, setTab] = useState("todas");
  const [maquinas, setMaquinas] = useState([]);
  const [maquinasFiltradas, setMaquinasFiltradas] = useState([]);

  const [idUser, setIdUser] = useState("");
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState("");

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();  // sempre que voltar pra tela, recarrega tudo
    }, [])
  );

  const imagens = {
    1: require("../assets/img/imagem_maquina1.png"),
    2: require("../assets/img/imagem_maquina2.png"),
    3: require("../assets/img/imagem_maquina3.png"),
    4: require("../assets/img/imagem_maquina4.png"),
  };

  const carregarUsuario = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("@user_data");
      if (!userDataString) return;

      const user = JSON.parse(userDataString);
      const id = user.usuario?.id_usuario;

      setIdUser(id);
      buscarMaquinas(id);
    } catch (e) {
      console.log("Erro ao carregar usuário:", e);
    }
  };

  const filtrarMaquinas = (tipo, lista, idUser, texto = busca) => {
    let filtradas = lista;

    // filtro de abas
    if (tipo === "salvas") {
      filtradas = filtradas.filter(m => m.operante_maquina === idUser);
    }

    // filtro da busca (nome da máquina)
    if (texto.trim() !== "") {
      const t = texto.toLowerCase();
      filtradas = filtradas.filter(m =>
        m.nome_maquina.toLowerCase().includes(t)
      );
    }

    setMaquinasFiltradas(filtradas);
  };

  const buscarMaquinas = async (id) => {
    try {
      const response = await listarMaquinas(id); // retorna todas as máquinas
      setMaquinas(response);
      filtrarMaquinas("todas", response, id);
    } catch (err) {
      console.log("Erro ao listar máquinas:", err);
    } finally {
      setCarregando(false);
    }
  };

  <View style={styles.tabs}>
    {["todas", "salvas"].map((t) => (
      <TouchableOpacity
        key={t}
        onPress={() => {
          setTab(t);
          filtrarMaquinas(t, maquinas, idUser);
        }}
      >
        <Text style={[styles.tabText, tab === t && styles.activeTab]}>
          {t[0].toUpperCase() + t.slice(1)}
        </Text>
      </TouchableOpacity>
    ))}
  </View>


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={imagens[item.imagem_maquina] || imagens[1]}
        style={{ width: 80, height: 80 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.cardText}>
          <Text style={styles.bold}>Nome: </Text>{item.nome_maquina}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.bold}>Modelo: </Text>{item.modelo_maquina}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.bold}>Setor: </Text>{item.localizacao_maquina}
        </Text>

        <Text style={[
          styles.cardText,
          { color: item.status_maquina === "Ativa" ? "#00e676" : "#ff1744" }
        ]}>
          Operação: {item.status_maquina}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("AtualizarMaquina", { maquina: item })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailBtn}
          onPress={() => navigation.navigate("Detalhes", { id: item.id_maquina })}

        >
          <Text style={styles.btnText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>Máquinas Listadas</Text>

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          <TextInput
            placeholder="Pesquisar"
            placeholderTextColor="#999"
            style={styles.input}
            value={busca}
            onChangeText={(txt) => {
              setBusca(txt);
              filtrarMaquinas(tab, maquinas, idUser, txt);
            }}
          />

        </View>

        {/* ==== AQUI ENTRA OS TABS ==== */}
        <View style={styles.tabs}>
          {["todas", "salvas"].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tabButton, tab === t && styles.activeTabButton]}
              onPress={() => {
                setTab(t);
                filtrarMaquinas(t, maquinas, idUser);
              }}
            >
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
                {t[0].toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {carregando ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Carregando...</Text>
        ) : (
          <FlatList
            data={maquinasFiltradas}
            keyExtractor={(item) => item.id_maquina.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CadastrarMaquina", { id_usuario: idUser })}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        <Text style={styles.fabText}>Cadastrar nova máquina</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 32, fontWeight: "bold", color: "#012d5c", marginBottom: 14, marginTop: 10, textAlign: "center" },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: 8, paddingHorizontal: 10, marginBottom: 14, height: 40 },
  input: { flex: 1, marginLeft: 6, color: "#000" },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 14,
  },

  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    marginHorizontal: 6,
  },

  activeTabButton: {
    backgroundColor: "#075ee0ff",
  },

  tabText: {
    color: "#000",
    fontWeight: "bold",
  },

  activeTabText: {
    color: "#fff",
  },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#012d5c", borderRadius: 12, padding: 12, marginBottom: 12 },
  cardImg: { width: 60, height: 60, marginLeft: 10 },
  cardText: { color: "#fff", fontSize: 14, marginLeft: 20 },
  bold: { fontWeight: "bold" },
  editBtn: { backgroundColor: "#00c853", padding: 10, borderRadius: 8, marginBottom: 6, marginRight: 12 },
  detailBtn: { backgroundColor: "#075ee0ff", padding: 10, borderRadius: 8, marginRight: 12 },
  btnText: { color: "#fff", fontWeight: "700", alignSelf: "center", fontSize: 14 },
  fab: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#075ee0ff", borderRadius: 10, padding: 13, alignSelf: "center", bottom: 20, width: 340 },
  fabText: { color: "#fff", fontWeight: "bold", fontSize: 20, marginLeft: 8 },
});
