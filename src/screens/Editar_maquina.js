import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import Header from "../components/Header_stack";

export default function AtualizarMaquina({ navigation }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [serie, setSerie] = useState("");

    const [sensorTemp, setSensorTemp] = useState(true);
    const [sensorEnergia, setSensorEnergia] = useState(true);
    const [sensorUmidade, setSensorUmidade] = useState(false);
    const [sensorPressao, setSensorPressao] = useState(false);
    const [sensorVibracao, setSensorVibracao] = useState(false);
    const [observacao, setObservacao] = useState("");

    const [monitoramento, setMonitoramento] = useState(true);
    const [alertas, setAlertas] = useState(true);
    const [limiteTemp, setLimiteTemp] = useState("");
    const [responsavel, setResponsavel] = useState("");

    // Componente auxiliar para seção com emoji
    const SectionTitle = ({ emoji, title }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionEmoji}>{emoji}</Text>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <Header
                title="Atualizar Máquina C4-23"
                onPressBack={() => navigation.goBack()}
            />
            <ScrollView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Atualizar informações</Text>

                    {/* Dados básicos */}
                    <Text style={styles.label}>Nome da máquina</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Máquina de empacotamento"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Text style={styles.label}>Descrição (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Máquina responsável por fechar os pacotes"
                        value={descricao}
                        onChangeText={setDescricao}
                    />

                    <Text style={styles.label}>Localização</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Setor Leste G4"
                        value={localizacao}
                        onChangeText={setLocalizacao}
                    />

                    <Text style={styles.label}>Número de série/ID interno</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MQ-2025-001"
                        value={serie}
                        onChangeText={setSerie}
                    />

                    <View style={styles.divider} />
                    {/* Seção Sensores */}
                    <SectionTitle emoji="🛠️" title="Configuração de sensores" />
                    <Text style={styles.label}>Tipos de sensores</Text>
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={sensorTemp} onValueChange={setSensorTemp} />
                        <Text style={styles.checkboxLabel}>Temperatura</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={sensorEnergia} onValueChange={setSensorEnergia} />
                        <Text style={styles.checkboxLabel}>Energia</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={sensorUmidade} onValueChange={setSensorUmidade} />
                        <Text style={styles.checkboxLabel}>Umidade</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={sensorPressao} onValueChange={setSensorPressao} />
                        <Text style={styles.checkboxLabel}>Pressão</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox value={sensorVibracao} onValueChange={setSensorVibracao} />
                        <Text style={styles.checkboxLabel}>Vibração</Text>
                    </View>

                    <Text style={styles.label}>Observação (opcional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Necessário sensor DHT11 no interior"
                        value={observacao}
                        onChangeText={setObservacao}
                    />

                    <View style={styles.divider} />
                    {/* Seção Monitoramento */}
                    <SectionTitle emoji="📡" title="Configuração de monitoramento" />
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
                    <TextInput
                        style={styles.input}
                        placeholder="Carlos Silva"
                        value={responsavel}
                        onChangeText={setResponsavel}
                    />

                    <View style={styles.divider} />
                    {/* Seção Informações adicionais */}
                    <SectionTitle emoji="ℹ️" title="Informações adicionais" />
                    <TouchableOpacity style={styles.buttonGray}>
                        <Text style={styles.buttonText}>Configurar sensores</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Imagem da máquina</Text>
                    <TouchableOpacity style={styles.imageBox}>
                        <Image
                            source={require("../assets/img/maquina.png")}
                            style={styles.image}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonBlue}>
                        <Text style={styles.buttonText}>Salvar máquina</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRed}>
                        <Text style={styles.buttonText}>Excluir máquina</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
        elevation: 8, // sombra no Android
        shadowColor: "#000", // sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
    sectionHeader: { flexDirection: "row", alignItems: "center", marginTop: 20, marginBottom: 6 },
    sectionEmoji: { fontSize: 20, marginRight: 8 },
    sectionTitle: { fontSize: 18, fontWeight: "600" },
    divider: { height: 1, backgroundColor: "#eee", marginVertical: 10, borderRadius: 1 },
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
    buttonGray: {
        backgroundColor: "#ccc",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginVertical: 6,
    },
    buttonBlue: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginVertical: 6,
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
});
