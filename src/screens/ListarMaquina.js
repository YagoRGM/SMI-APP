import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "../components/Header";

const maquinas = [
  {
    id: "1",
    nome: "Torneadora",
    modelo: "ASMOTIC",
    setor: "1",
    status: "ATIVA",
    img: require("../assets/img/maquina.png"),
  },
  {
    id: "2",
    nome: "Torneadora",
    modelo: "ASMOTIC",
    setor: "2",
    status: "INATIVA",
    img: require("../assets/img/maquina.png"),
  },
  {
    id: "3",
    nome: "Torneadora",
    modelo: "ASMOTIC",
    setor: "3",
    status: "ATIVA",
    img: require("../assets/img/maquina.png"),
  },
  {
    id: "4",
    nome: "Torneadora",
    modelo: "ASMOTIC",
    setor: "4",
    status: "INATIVA",
    img: require("../assets/img/maquina.png"),
  },
];

export default function ListarMaquina() {
  const [tab, setTab] = useState("todas");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.img} style={styles.cardImg} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cardText}><Text style={styles.bold}>Nome: </Text>{item.nome}</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Modelo: </Text>{item.modelo}</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Setor: </Text>{item.setor}</Text>
        <Text style={[styles.cardText, { color: item.status === "ATIVA" ? "#00e676" : "#ff1744" }]}>
          Operação: {item.status}
        </Text>
      </View>
      <View>
        <Pressable style={styles.editBtn}><Text style={styles.btnText}>Editar</Text></Pressable>
        <Pressable style={styles.detailBtn}><Text style={styles.btnText}>Detalhes</Text></Pressable>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Máquinas Listadas</Text>

        <View style={styles.searchBox}>
          <MaterialCommunityIcons name="magnify" size={20} color="#999" />
          <TextInput placeholder="Pesquisar" placeholderTextColor="#999" style={styles.input} />
        </View>

        <View style={styles.tabs}>
          {["todas", "salvas"].map((t) => (
            <Pressable key={t} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.activeTab]}>{t[0].toUpperCase() + t.slice(1)}</Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          data={maquinas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

      </View>
        <Pressable style={styles.fab}>
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
          <Text style={styles.fabText}>Cadastrar nova máquina</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 32, fontWeight: "bold", color: "#012d5c", marginBottom: 14, marginTop: 10,alignContent: "center", textAlign: "center" },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", borderRadius: 8, paddingHorizontal: 10, marginBottom: 14, height: 40 },
  input: { flex: 1, marginLeft: 6, color: "#000" },
  tabs: { flexDirection: "row",marginBottom: 16, alignContent: "center", justifyContent: "center" },
  tabText: { fontSize: 20, fontWeight: "600", color: "#999", marginRight: 20 },
  activeTab: { color: "#012d5c", textDecorationLine: "underline" },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#012d5c", borderRadius: 12, padding: 12, marginBottom: 12 },
  cardImg: { width: 60, height: 60, marginLeft: 10 },
  cardText: { color: "#fff", fontSize: 14, marginLeft: 20 },
  bold: { fontWeight: "bold" },
  editBtn: { backgroundColor: "#00c853", padding: 10, borderRadius: 8, marginBottom: 6, marginRight: 12 },
  detailBtn: { backgroundColor: "#075ee0ff", padding: 10, borderRadius: 8, marginRight: 12 },
  btnText: { color: "#fff", fontWeight: "700", alignSelf: "center", fontSize: 14 },
  fab: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#075ee0ff", borderRadius: 10, padding: 10, alignSelf: "center", bottom: 20, left: 16, right: 26, elevation: 3, width: 300 },
  fabText: { color: "#fff", fontWeight: "bold", fontSize: 20, marginLeft: 8 },
});
