import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header_stack";
import { useNavigation } from "@react-navigation/native";

export default function GerenciarUsuarios() {
    const [usuarios, setUsuarios] = useState([
        { id: "1", nome: "Lucas Machado", email: "lucas@gmail.com", cargo: "Administrador" },
        { id: "2", nome: "Ana Costa", email: "ana.costa@gmail.com", cargo: "Funcionário" },
        { id: "3", nome: "Pedro Lima", email: "pedro.lima@gmail.com", cargo: "Funcionário" },
    ]);

    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [novoNome, setNovoNome] = useState("");
    const [novoEmail, setNovoEmail] = useState("");
    const [novoCargo, setNovoCargo] = useState("");

    const navigation = useNavigation();

    const abrirEdicao = (usuario) => {
        setUsuarioSelecionado(usuario);
        setNovoNome(usuario.nome);
        setNovoEmail(usuario.email);
        setNovoCargo(usuario.cargo);
        setEditModalVisible(true);
    };

    const salvarEdicao = () => {
        setUsuarios((prev) =>
            prev.map((u) =>
                u.id === usuarioSelecionado.id
                    ? { ...u, nome: novoNome, email: novoEmail, cargo: novoCargo }
                    : u
            )
        );
        setEditModalVisible(false);
        setSuccessMessage("Usuário atualizado com sucesso!");
        setSuccessModalVisible(true);
    };

    const confirmarExclusao = (usuario) => {
        setUsuarioSelecionado(usuario);
        setDeleteModalVisible(true);
    };

    const excluirUsuario = () => {
        setUsuarios((prev) => prev.filter((u) => u.id !== usuarioSelecionado.id));
        setDeleteModalVisible(false);
        setSuccessMessage("Usuário excluído com sucesso!");
        setSuccessModalVisible(true);
    };

    return (
        <View style={styles.view}>
            <Header title="Gerenciar Usuários" onPressBack={() => navigation.goBack()} />
            <View style={styles.container}>
                <Text style={styles.title}>Gerenciar Usuários</Text>


                <View style={styles.card}>
                    {usuarios.length === 0 ? (
                        <Text style={styles.emptyMessage}>Nenhum usuário cadastrado.</Text>
                    ) : (
                        <FlatList
                            data={usuarios}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.userItem}>
                                    <View>
                                        <Text style={styles.userName}>{item.nome}</Text>
                                        <Text style={styles.userEmail}>{item.email}</Text>
                                        <Text style={styles.userCargo}>{item.cargo}</Text>
                                    </View>
                                    <View style={styles.actions}>
                                        <TouchableOpacity
                                            style={[styles.iconButton, { backgroundColor: "#34A853" }]}
                                            onPress={() => abrirEdicao(item)}
                                        >
                                            <Ionicons name="pencil" size={20} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.iconButton, { backgroundColor: "#E53935" }]}
                                            onPress={() => confirmarExclusao(item)}
                                        >
                                            <Ionicons name="trash" size={20} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    {/* === BOTÃO CADASTRAR USUÁRIO === */}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate("CadastrarUsuario")}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="person-add" size={22} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.addButtonText}>Cadastrar Usuário</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* MODAL DE EDIÇÃO */}
            <Modal animationType="slide" transparent visible={editModalVisible}>
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { backgroundColor: "#fff" }]}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="#222" />
                        </TouchableOpacity>

                        <Ionicons name="create-outline" size={40} color="#34A853" />
                        <Text style={styles.modalTitle}>Editar Usuário</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={novoNome}
                            onChangeText={setNovoNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={novoEmail}
                            onChangeText={setNovoEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cargo"
                            value={novoCargo}
                            onChangeText={setNovoCargo}
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
                            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* MODAL DE EXCLUSÃO */}
            <Modal animationType="fade" transparent visible={deleteModalVisible}>
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { backgroundColor: "#FFF7F7" }]}>
                        <Ionicons name="warning-outline" size={45} color="#E53935" />
                        <Text style={styles.modalTitle}>Excluir Usuário</Text>
                        <Text style={styles.modalText}>
                            Deseja realmente excluir{" "}
                            <Text style={{ fontWeight: "bold" }}>{usuarioSelecionado?.nome}</Text>?
                        </Text>

                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity
                                style={[styles.saveButton, { backgroundColor: "#ccc", flex: 1 }]}
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={[styles.saveButtonText, { color: "#333" }]}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveButton, { backgroundColor: "#E53935", flex: 1 }]}
                                onPress={excluirUsuario}
                            >
                                <Text style={styles.saveButtonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* MODAL DE SUCESSO */}
            <Modal animationType="fade" transparent visible={successModalVisible}>
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { backgroundColor: "#fff" }]}>
                        <Ionicons name="checkmark-circle" size={60} color="#34A853" />
                        <Text style={styles.modalTitle}>{successMessage}</Text>
                        <TouchableOpacity
                            style={[styles.saveButton, { backgroundColor: "#34A853" }]}
                            onPress={() => setSuccessModalVisible(false)}
                        >
                            <Text style={styles.saveButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    view: { flex: 1, backgroundColor: "#fff" },
    container: { padding: 20 },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#0C254E",
        marginBottom: 15,
        textAlign: "center",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0C254E",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#F3F4F6",
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    emptyMessage: {
        textAlign: "center",
        color: "#666",
        fontSize: 16,
        fontStyle: "italic",
        marginVertical: 20,
    },
    userItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    userName: { fontSize: 16, fontWeight: "600", color: "#0C254E" },
    userEmail: { color: "#555", fontSize: 14 },
    userCargo: { color: "#777", fontSize: 13 },
    actions: { flexDirection: "row", gap: 10 },
    iconButton: {
        padding: 10,
        borderRadius: 8,
        elevation: 3,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: "85%",
        padding: 25,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#eee",
        borderRadius: 20,
        padding: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15,
        color: "#0C254E",
        textAlign: "center",
    },
    modalText: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#333" },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    saveButton: {
        backgroundColor: "#0C254E",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },
    saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
