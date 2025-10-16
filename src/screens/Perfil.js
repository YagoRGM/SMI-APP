import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, TextInput, Alert } from "react-native";
import Header from "../components/Header";
import { LinearGradient } from 'expo-linear-gradient';

export default function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("Lucas Machado");
  const [email, setEmail] = useState("lukzinisback@gmail.com");

  const salvarEdicao = () => {
    setModalVisible(false);
    Alert.alert("Sucesso", "Perfil editado com sucesso!");
  };

  const certificacoes = ['NR-10', 'NR-15', 'NR-35', 'NR-42']; // array declarado fora do JSX

  return (
    <View style={styles.view}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.avatarBox}>
            <Image source={require("../assets/img/avatar.png")} style={styles.avatar} />
            <Text style={styles.userName}>{nome}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.title}>Meu Perfil</Text>

            <Text style={styles.label}><Text style={styles.bold}>Nome: </Text><Text style={styles.value}>{nome}</Text></Text>
            <Text style={styles.label}><Text style={styles.bold}>ID: </Text><Text style={styles.value}>004589</Text></Text>
            <Text style={styles.label}><Text style={styles.bold}>Email: </Text><Text style={styles.value}>{email}</Text></Text>
            <Text style={styles.label}><Text style={styles.bold}>Profissão: </Text><Text style={styles.value}>Soldador</Text></Text>
            <Text style={styles.label}><Text style={styles.bold}>Status: </Text><Text style={styles.value}>Férias</Text></Text>
            <Text style={styles.label}><Text style={styles.bold}>Turno: </Text><Text style={styles.value}>Manhã</Text></Text>
            <Text style={styles.label}><Text style={styles.bold}>Supervisor: </Text><Text style={styles.value}>Craque Neto</Text></Text>
          </View>
        </View>

        {/* Certificações */}
        <Text style={styles.sectionTitle}>Certificações / Treinamentos concluídos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 30 }}>
          {certificacoes.map((cert, index) => (
            <LinearGradient
              key={index}
              colors={['#001943', '#003FA9']}
              style={styles.certCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.certText}>{cert}</Text>
            </LinearGradient>
          ))}
        </ScrollView>

        {/* Botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Desconectar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de edição */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <Text style={styles.modalLabel}>Nome</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />

            <Text style={styles.modalLabel}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

            <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { flex: 1 },
  container: { padding: 20, alignItems: "center", backgroundColor: "#fff" },
  header: { flexDirection: "row", backgroundColor: "#F5F5F5", borderRadius: 12, padding: 15, marginBottom: 20, width: "100%", alignItems: "center" },
  avatarBox: { alignItems: "center", marginRight: 15 },
  avatar: { width: 100, height: 100, borderRadius: 40, marginBottom: 4 },
  userName: { fontWeight: "600", fontSize: 18, textAlign: "center" },
  infoBox: { flex: 1, padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  title: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
  label: { fontSize: 14, marginBottom: 5 },
  bold: { fontWeight: 'bold' },
  value: { fontWeight: 'normal', fontSize: 13 },
  sectionTitle: { fontSize: 22, fontWeight: "600", marginBottom: 10, color: "#0C254E", textAlign: "center" },
  certCard: { width: 120, paddingVertical: 20, marginHorizontal: 5, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  certText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  editButton: { flex: 1, backgroundColor: "#0C254E", paddingVertical: 12, borderRadius: 25, alignItems: "center", marginRight: 10 },
  editText: { color: "#fff", fontWeight: "bold" },
  logoutButton: { flex: 1, backgroundColor: "#E53935", paddingVertical: 12, borderRadius: 25, alignItems: "center", marginLeft: 10 },
  logoutText: { color: "#fff", fontWeight: "bold" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { width: "85%", backgroundColor: "#fff", padding: 25, borderRadius: 15, alignItems: "center" },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeText: { fontSize: 18, fontWeight: "bold" },
  modalTitle: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  modalLabel: { alignSelf: "flex-start", marginBottom: 5, fontWeight: "600" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15 },
  saveButton: { backgroundColor: "#0C254E", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25, alignItems: "center", width: "100%" },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16, textAlign: "center" },
});
