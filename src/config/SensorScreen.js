import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

// COLOQUE A URL DO SEU RAILWAY AQUI
const API_URL = "https://smi-app-production.up.railway.app/sensores/atual"; 

export default function SensorScreen() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      const r = await fetch(API_URL);
      if (!r.ok) {
        throw new Error(`Erro de rede: ${r.status}`);
      }
      const json = await r.json();
      setDados(json);
    } catch (e) {
      console.error("Falha ao buscar dados da API:", e);
    } finally {
      setLoading(false); // Sempre para o loading, mesmo se der erro
    }
  }

  // O useEffect executa a função carregarDados quando o componente é montado.
  // O setInterval faz com que a função seja executada novamente a cada 2 segundos.
  useEffect(() => {
    carregarDados(); 
    const timer = setInterval(() => carregarDados(), 2000); 

    // O "return" limpa o intervalo quando a tela é fechada, evitando erros.
    return () => clearInterval(timer);
  }, []); // O array vazio [] garante que isso só rode na montagem inicial

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Conectando à API...</Text>
      </View>
    );
  }

  // Se não há dados, mostra uma mensagem de erro
  if (!dados || !dados.id_maquina) {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Aguardando o primeiro dado da API...</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Máquina: {dados.nome_maquina} ({dados.id_maquina})</Text>
      
      <View style={styles.dataBlock}>
        <Text style={styles.label}>Temperatura:</Text>
        <Text style={styles.value}>{dados.temperatura} °C</Text>
      </View>
      
      <View style={styles.dataBlock}>
        <Text style={styles.label}>Nível de Gás:</Text>
        <Text style={styles.value}>{dados.gas}</Text>
      </View>

      <View style={styles.dataBlock}>
        <Text style={styles.label}>Vibração:</Text>
        <Text style={styles.value}>{dados.vibracao === 1 ? 'ALERTA' : 'Normal'}</Text>
      </View>
      
      <Text style={styles.timestamp}>Última Leitura: {new Date(dados.timestamp).toLocaleTimeString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: '#f0f0f0' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
    dataBlock: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, marginVertical: 8, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    label: { fontSize: 16, fontWeight: '500', color: '#555' },
    value: { fontSize: 16, fontWeight: 'bold', color: '#007bff' },
    timestamp: { textAlign: 'center', marginTop: 25, fontSize: 12, color: '#999' },
    errorText: { fontSize: 16, color: 'red', textAlign: 'center' }
});