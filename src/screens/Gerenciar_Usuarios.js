import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    Alert,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header_stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listarUsuarios, atualizarUsuario, excluirUsuario } from "../config/cloudflareApi";

export default function GerenciarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [novoNome, setNovoNome] = useState("");
    const [novoSetor, setNovoSetor] = useState("");
    const [novoStatus, setNovoStatus] = useState("ATIVO");

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const userStr = await AsyncStorage.getItem("@user_data");
            if (!userStr) return navigation.navigate("Login");

            const userObj = JSON.parse(userStr);
            const current = userObj.usuario || userObj;

            if (current.tipo_usuario !== "ADMINISTRADOR") {
                Alert.alert("Acesso negado", "Apenas administradores podem acessar esta tela.");
                navigation.goBack();
                return;
            }
            carregarUsuarios();
        })();
    }, []);

    async function carregarUsuarios() {
        try {
            const res = await listarUsuarios();
            setUsuarios(Array.isArray(res) ? res : []);
        } catch (e) {
            Alert.alert("Erro", "Não foi possível carregar usuários.");
        }
    }

    const abrirEdicao = (usuario) => {
        setUsuarioSelecionado(usuario);
        setNovoNome(usuario.nome_usuario ?? "");
        setNovoSetor(usuario.setor_usuario ?? "");
        setNovoStatus(usuario.status_usuario ?? "ATIVO");
        setEditModalVisible(true);
    };

    const salvarEdicao = async () => {
        if (!usuarioSelecionado) return;

        if (!novoNome.trim() || !novoSetor.trim() || !novoStatus.trim()) {
            Alert.alert("Erro", "Todos os campos devem estar preenchidos!");
            return;
        }

        const updatedUser = {
            nome_usuario: novoNome,
            setor_usuario: novoSetor,
            status_usuario: novoStatus,
        };

        try {
            // usa o mesmo padrão que Perfil: retorna JSON
            const res = await atualizarUsuario(usuarioSelecionado?.id_usuario, updatedUser);
            if (res.ok && res.json.ok) {
                // sucesso
            } else {
                Alert.alert("Erro", res.json.erro || "Não foi possível atualizar.");
            }

        } catch (e) {
            console.log("Erro ao atualizar usuário:", e);
            Alert.alert("Erro", "Algo deu errado, tente novamente.");
        }
    };

    const confirmarExclusao = (usuario) => {
        setUsuarioSelecionado(usuario);
        setDeleteModalVisible(true);
    };

    const excluirUsuarioAction = async () => {
        try {
            const res = await excluirUsuario(usuarioSelecionado.id_usuario);
            if (res.ok) {
                setDeleteModalVisible(false);
                carregarUsuarios();
                Alert.alert("Sucesso", "Usuário excluído.");
            } else {
                Alert.alert("Erro", res.erro || "Não foi possível excluir.");
            }
        } catch (e) {
            console.log(e);
            Alert.alert("Erro", "Falha ao excluir usuário.");
        }
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
                            keyExtractor={(item) => String(item.id_usuario)}
                            renderItem={({ item }) => (
                                <View style={styles.userItem}>
                                    <View>
                                        <Text style={styles.userName}>{item.nome_usuario}</Text>
                                        <Text style={styles.userEmail}>
                                            {item.cpf_usuario}
                                        </Text>
                                        <Text style={styles.userCargo}>
                                            {item.tipo_usuario} • {item.status_usuario ?? "ATIVO"}
                                        </Text>
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
            </View>

            <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("CadastrarUsuario")}
                    activeOpacity={0.8}
                >
                    <Ionicons name="person-add" size={22} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.addButtonText}>Cadastrar Usuário</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL EDIÇÃO */}
            <Modal animationType="slide" transparent visible={editModalVisible}>
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { backgroundColor: "#fff" }]}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setEditModalVisible(false)}>
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
                            placeholder="Setor"
                            value={novoSetor}
                            onChangeText={setNovoSetor}
                        />
                        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                            <TouchableOpacity
                                style={[styles.statusBtn, novoStatus === "ATIVO" ? styles.statusActive : null]}
                                onPress={() => setNovoStatus("ATIVO")}
                            >
                                <Text style={novoStatus === "ATIVO" ? styles.statusTextActive : styles.statusText}>
                                    ATIVO
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.statusBtn, novoStatus === "INATIVO" ? styles.statusInactive : null]}
                                onPress={() => setNovoStatus("INATIVO")}
                            >
                                <Text style={novoStatus === "INATIVO" ? styles.statusTextActive : styles.statusText}>
                                    INATIVO
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={salvarEdicao}>
                            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* MODAL EXCLUIR */}
            <Modal animationType="fade" transparent visible={deleteModalVisible}>
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { backgroundColor: "#FFF7F7" }]}>
                        <Ionicons name="warning-outline" size={45} color="#E53935" />
                        <Text style={styles.modalTitle}>Excluir Usuário</Text>
                        <Text style={styles.modalText}>
                            Deseja realmente excluir <Text style={{ fontWeight: "bold" }}>{usuarioSelecionado?.nome_usuario}</Text>?
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
                                onPress={excluirUsuarioAction}
                            >
                                <Text style={styles.saveButtonText}>Excluir</Text>
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
