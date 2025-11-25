import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header_stack";
import * as ImagePicker from 'expo-image-picker';
import { atualizarMaquina, excluirMaquina, listarUsuarios } from "../config/cloudflareApi";
import { List } from "react-native-paper";

export default function AtualizarMaquina({ route, navigation }) {
    const { maquina } = route.params;

    const [nome, setNome] = useState(maquina.nome_maquina);
    const [descricao, setDescricao] = useState(maquina.descricao_maquina || "");
    const [localizacao, setLocalizacao] = useState(maquina.localizacao_maquina || "");
    const [serie, setSerie] = useState(maquina.modelo_maquina);
    const [observacao, setObservacao] = useState(maquina.observacao_maquina || "");
    const [status, setStatus] = useState(maquina.status_maquina);
    // const [foto, setFoto] = useState(maquina.foto_maquina || null);

    const [sensorTemp, setSensorTemp] = useState(true);
    const [sensorEnergia, setSensorEnergia] = useState(true);
    const [sensorUmidade, setSensorUmidade] = useState(false);
    const [sensorPressao, setSensorPressao] = useState(false);
    const [sensorVibracao, setSensorVibracao] = useState(false);
    const [monitoramento, setMonitoramento] = useState(true);
    const [alertas, setAlertas] = useState(true);
    const [limiteTemp, setLimiteTemp] = useState("");
    const [responsavel, setResponsavel] = useState({
        id: maquina.operante_maquina || null,
        nome: maquina.nome_operante || "Selecione um responsável"
    });
    const [imagemEscolhida, setImagemEscolhida] = useState(maquina.imagem_maquina);

    const [usuarios, setUsuarios] = useState([]);
    const [modalUsuarios, setModalUsuarios] = useState(false);


    const [foto, setFoto] = useState(null);

    // estados dos modais
    const [modalSalvarVisible, setModalSalvarVisible] = useState(false);
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
    const [modalSucesso, setModalSucesso] = useState({ visible: false, mensagem: "" });

    useEffect(() => {
        async function carregarUsuarios() {
            const res = await listarUsuarios();
            setUsuarios(res);
        }
        carregarUsuarios();
    }, []);

    const imagens = {
        1: require("../assets/img/imagem_maquina1.png"),
        2: require("../assets/img/imagem_maquina2.png"),
        3: require("../assets/img/imagem_maquina3.png"),
        4: require("../assets/img/imagem_maquina4.png"),
    };

    const handleSalvar = async () => {
        try {
            const body = {
                nome_maquina: nome,
                modelo_maquina: serie,
                localizacao_maquina: localizacao,
                status_maquina: status,
                descricao_maquina: descricao,
                observacao_maquina: observacao,
                operante_maquina: responsavel.id,
                imagem_maquina: imagemEscolhida, // 👈 AQUI!
            };

            const res = await atualizarMaquina(maquina.id_maquina, body);

            if (res.error) {
                alert("Erro ao atualizar: " + res.error);
                return;
            }

            setModalSalvarVisible(false);
            setModalSucesso({ visible: true, mensagem: "Máquina editada com sucesso!" });

        } catch (err) {
            alert("Erro inesperado: " + err.message);
        }
    };

    const handleExcluir = async () => {
        try {
            const res = await excluirMaquina(maquina.id_maquina);

            if (res.error) {
                alert("Erro ao excluir: " + res.error);
                return;
            }

            setModalExcluirVisible(false);
            setModalSucesso({ visible: true, mensagem: "Máquina excluída com sucesso!" });

            // volta para a tela anterior após excluir
            setTimeout(() => {
                navigation.goBack();
            }, 1000);

        } catch (err) {
            alert("Erro inesperado: " + err.message);
        }
    };

    const handlePickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    const SectionTitle = ({ title }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Header
                title={`Atualizar ${maquina.nome_maquina}`}
                onPressBack={() => navigation.goBack()}
            />

            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Atualizar informações</Text>

                    <Text style={styles.label}>Nome da máquina</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Máquina de empacotamento"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.label}>Modelo da Máquina</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="C4-23"
                        value={serie}
                        onChangeText={setSerie}
                    />

                    <Text style={styles.label}>Localização</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Setor Leste G4"
                        value={localizacao}
                        onChangeText={setLocalizacao}
                    />

                    <Text style={styles.label}>Status da máquina</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => {
                            // Aqui você pode abrir um modal ou ActionSheet para escolher o status
                            // Pra simplificar, vou só alternar entre Ativa/Inativa
                            setStatus(status === "Ativa" ? "Inativa" : "Ativa");
                        }}
                    >
                        <Text>{status}</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Observação (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Observações sobre a máquina"
                        value={observacao}
                        onChangeText={setObservacao}
                    />

                    {/* <View style={styles.divider} /> */}

                    {/* <SectionTitle title="Configuração de sensores" /> */}
                    {/* 
                    {[
                        { label: "Temperatura", state: sensorTemp, set: setSensorTemp },
                        { label: "Energia", state: sensorEnergia, set: setSensorEnergia },
                        { label: "Umidade", state: sensorUmidade, set: setSensorUmidade },
                        { label: "Pressão", state: sensorPressao, set: setSensorPressao },
                        { label: "Vibração", state: sensorVibracao, set: setSensorVibracao },
                    ].map((item, i) => (
                        <View key={i} style={styles.checkboxContainer}>
                            <Checkbox value={item.state} onValueChange={item.set} />
                            <Text style={styles.checkboxLabel}>{item.label}</Text>
                        </View>
                    ))} */}


                    <View style={styles.divider} />
                    <SectionTitle title="Configuração de monitoramento" />

                    <View style={styles.checkboxContainer}>
                        <Checkbox value={monitoramento} onValueChange={setMonitoramento} />
                        <Text style={styles.checkboxLabel}>Ativar monitoramento em tempo real</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={alertas} onValueChange={setAlertas} />
                        <Text style={styles.checkboxLabel}>Receber alertas da IA</Text>
                    </View>

                    <Text style={styles.label}>Limites personalizados</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Temperatura máxima de 45°C"
                        value={limiteTemp}
                        onChangeText={setLimiteTemp}
                    />

                    <Text style={styles.label}>Responsável técnico</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setModalUsuarios(true)}
                    >
                        <Text>{responsavel.nome || "Selecione um responsável"}</Text>
                    </TouchableOpacity>


                    <View style={styles.divider} />
                    <SectionTitle title="Imagem da Máquina" />
                    <Text style={styles.label}>Escolher nova imagem</Text>

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



                    {/* Botões com modais */}
                    <TouchableOpacity style={styles.buttonBlue} onPress={() => setModalSalvarVisible(true)}>
                        <Text style={styles.buttonText}>Salvar máquina</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonRed} onPress={() => setModalExcluirVisible(true)}>
                        <Text style={styles.buttonText}>Excluir máquina</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            {/* Modal de seleção de usuários */}
            <Modal visible={modalUsuarios} transparent animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalUsuariosContainer}>

                        <Text style={styles.modalTitle}>Selecionar Operante</Text>

                        <ScrollView style={{ maxHeight: 300, width: "100%" }}>
                            {usuarios.map((u) => (
                                <TouchableOpacity
                                    key={u.id_usuario}
                                    style={styles.usuarioCard}
                                    onPress={() => {
                                        setResponsavel({ id: u.id_usuario, nome: u.nome_usuario });
                                        setModalUsuarios(false);
                                    }}

                                >
                                    <Ionicons name="person-circle" size={32} color="#1976D2" />
                                    <Text style={styles.usuarioNome}>{u.nome_usuario}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalUsuarios(false)}
                        >
                            <Text style={styles.modalCloseText}>Fechar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            {/* Modal SALVAR */}
            <Modal animationType="fade" transparent visible={modalSalvarVisible}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalSalvarVisible(false)}>
                            <Ionicons name="close" size={22} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Salvar Alterações</Text>
                        <Text style={styles.modalText}>
                            Deseja salvar as alterações feitas na máquina{" "}
                            <Text style={{ fontWeight: "bold" }}>{nome || "C4-23"}</Text>?
                        </Text>

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalSalvarVisible(false)}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleSalvar}>
                                <Text style={styles.confirmText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            
            {/* Modal SUCESSO */}
<Modal visible={modalSucesso.visible} transparent animationType="fade">
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            
            {/* Botão de X */}
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                    setModalSucesso({ visible: false, mensagem: "" });
                    navigation.goBack();
                }}
            >
                <Ionicons name="close" size={26} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{modalSucesso.mensagem}</Text>

            {/* Botão OK */}
            <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                    setModalSucesso({ visible: false, mensagem: "" });
                    navigation.goBack();
                }}
            >
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>

        </View>
    </View>
</Modal>

{/* Modal EXCLUIR */}
<Modal visible={modalExcluirVisible} transparent animationType="fade">
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            
            {/* Botão X */}
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalExcluirVisible(false)}
            >
                <Ionicons name="close" size={26} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Deseja realmente excluir?</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalExcluirVisible(false)}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleExcluir}
                >
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>

            </View>
        </View>
    </View>
</Modal>


        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        margin: 12,
        marginBottom: 80,
        elevation: 8,
    },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
    sectionHeader: { flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 6 },
    sectionTitle: { fontSize: 18, fontWeight: "600" },
    divider: { height: 2, backgroundColor: "#eee", marginVertical: 10 },
    label: { fontSize: 14, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
    checkboxLabel: { marginLeft: 8 },
    buttonBlue: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 16,
        marginBottom: 2,
    },
    buttonRed: {
        backgroundColor: "#dc3545",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginVertical: 6,
    },
    buttonText: { color: "#fff", fontWeight: "bold" },
    imageBox: {
        height: 120,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    image: { width: 100, height: 100, resizeMode: "contain" },

    // MODAIS
    modalUsuariosContainer: {
        width: "85%",
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 18,
        alignItems: "center",
        elevation: 6,
    },
    usuarioCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#f2f6ff",
        borderRadius: 12,
        marginBottom: 10,
    },
    usuarioNome: {
        fontSize: 17,
        marginLeft: 10,
        color: "#1b1b1b",
    },
    modalCloseButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        backgroundColor: "#E53935",
    },
    modalCloseText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 14,
        right: 14,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 6,
        elevation: 3,
    },
    modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    modalText: { textAlign: "center", fontSize: 15, marginBottom: 20 },
    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        gap: 10,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: "#0C254E",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#ddd",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    confirmText: { color: "#fff", fontWeight: "bold" },
    cancelText: { color: "#333", fontWeight: "600" },
    modalSucessoBox: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },

    modalSuccessText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginVertical: 6,
        color: "#333",
    },
    okButton: {
        marginTop: 20,
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 12,
    },
    okButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    modalExcluirContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        elevation: 10,
    },

    modalMsg: {
        textAlign: "center",
        color: "#444",
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
    },

    modalButtonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },

    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: "#b0b0b0",
        borderRadius: 10,
        marginRight: 8,
        alignItems: "center",
    },

    cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    deleteButton: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: "#d9534f",
        borderRadius: 10,
        marginLeft: 8,
        alignItems: "center",
    },

    deleteButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
    },
modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
},
modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    position: "relative",
},
modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 15,
},

closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
},

okButton: {
    marginTop: 20,
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
},
okButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
},

cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
},
cancelButtonText: {
    color: "#333",
    fontSize: 16,
},

deleteButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
},
deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
},

});
