import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Header from "../components/Header";

export default function Perfil({ navigation }) {
  return (
    <View style={styles.view} >

      <Header />

      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.header}>
          <View style={styles.avatarBox}>
            <Image
              source={require("../assets/img/avatar.png")}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Lucas Machado</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.title}>Meu Perfil</Text>

            <Text style={styles.label}>
              <Text style={styles.bold}>Nome: </Text>
              <Text style={styles.value}>Lucas Machado</Text>
            </Text>

            <Text style={styles.label}>
              <Text style={styles.bold}>ID: </Text>
              <Text style={styles.value}>004589</Text>
            </Text>

            <Text style={styles.label}>
              <Text style={styles.bold}>Email: </Text>
            </Text>
            <Text style={styles.value}>lukzinisback@gmail.com</Text>

            <Text style={styles.label}>
              <Text style={styles.bold}>Profissão: </Text>
              <Text style={styles.value}>Soldador</Text>
            </Text>

            <Text style={styles.label}>
              <Text style={styles.bold}>Status: </Text>
              <Text style={styles.value}>Férias</Text>
            </Text>

            <Text style={styles.label}>
              <Text style={styles.bold}>Turno: </Text>
              <Text style={styles.value}>Manhã</Text>
            </Text>

            <Text style={styles.label}>
              <Text style={styles.bold}>Supervisor: </Text>
              <Text style={styles.value}>Craque Neto</Text>
            </Text>
          </View>

        </View>

        {/* Certificações */}
        <Text style={styles.sectionTitle}>
          Certificações / Treinamentos concluídos
        </Text>

        <View style={styles.certContainer}>
          <View style={styles.certCard}>
            <Text style={styles.certText}>NR-10</Text>
          </View>
          <View style={styles.certCard}>
            <Text style={styles.certText}>NR-15</Text>
          </View>
          <View style={styles.certCard}>
            <Text style={styles.certText}>NR-35</Text>
          </View>
        </View>

        {/* Botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Desconectar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  avatarBox: {
    alignItems: "center",
    marginRight: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 4,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  infoBox: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#0C254E",
    textAlign: "center",
  },
  certContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  certCard: {
    flex: 1,
    backgroundColor: "#0C254E",
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  certText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#0C254E",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginRight: 10,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    flex: 1,
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginLeft: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
