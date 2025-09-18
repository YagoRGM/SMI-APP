import React from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../components/Header";

export default function Notificacoes() {
  const notificacoes = [
    { id: 1, tipo: "Erro", setor: 5, maquinaId: "8769534", obs: "Alta temperatura" },
    { id: 2, tipo: "Cuidado", setor: 1, maquinaId: "1256123", obs: "Medida Protetiva desativada" },
    { id: 3, tipo: "Informação", setor: 6, maquinaId: "5641234", obs: "Produção em andamento" },
    { id: 4, tipo: "Sucesso", setor: 15, maquinaId: "9974245", obs: "Produto Finalizado" },
    { id: 5, tipo: "Sucesso", setor: 15, maquinaId: "9974245", obs: "Produto Finalizado" },
  ];

  const cores = {
    Erro: "#F8D7DA",
    Cuidado: "#FFF3CD",
    Informação: "#D1ECF1",
    Sucesso: "#D4EDDA",
  };

  const icones = {
    Erro: "alert-circle",
    Cuidado: "alert",
    Informação: "information",
    Sucesso: "check-circle",
  };

  return (
    <ScrollView style={styles.container}>
            <Header />
      
      <TextInput
        style={styles.search}
        placeholder="Pesquisar"
        placeholderTextColor="#999"
      />

      <View style={styles.tags}>
        <Text style={[styles.tag, { backgroundColor: "#007BFF" }]}>Todas</Text>
        <Text style={[styles.tag, { backgroundColor: "#28A745" }]}>Sucesso</Text>
        <Text style={[styles.tag, { backgroundColor: "#DC3545" }]}>Erro</Text>
        <Text style={[styles.tag, { backgroundColor: "#FFC107" }]}>Aviso</Text>
        <Text style={[styles.tag, { backgroundColor: "#17A2B8" }]}>Info</Text>
        <Text style={[styles.tag, { backgroundColor: "#001F3F" }]}>Sugestão</Text>
      </View>

      {notificacoes.map((item) => (
        <View
          key={item.id}
          style={[styles.notificacao, { backgroundColor: cores[item.tipo] }]}
        >
          <View style={styles.row}>
            <MaterialCommunityIcons
              name={icones[item.tipo]}
              size={24}
              color="#000"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.tipo}>{item.tipo}</Text>
          </View>
          <Text style={styles.maquina}>MÁQUINA ID: {item.maquinaId}</Text>
          <Text style={styles.setor}>SETOR: {item.setor}</Text>
          <Text style={styles.obs}>OBS: {item.obs}</Text>
        </View>
      ))}

      <Pressable style={styles.btnLimpar}>
        <MaterialCommunityIcons name="delete" size={20} color="#fff" />
        <Text style={styles.btnText}>Limpar notificações</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
  },
  notificacao: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  tipo: {
    fontWeight: "bold",
    fontSize: 16,
  },
  maquina: {
    fontSize: 14,
  },
  setor: {
    fontSize: 14,
  },
  obs: {
    fontSize: 14,
    fontStyle: "italic",
  },
  btnLimpar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
});
