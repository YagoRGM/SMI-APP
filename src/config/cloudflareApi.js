const API_URL = "https://smi-app.yago-roberto2008.workers.dev";

// ---------------------
// USUÁRIOS
// ---------------------
export async function login(cpf, senha) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, senha }),
  });
  return res.json();
}

export async function atualizarUsuario(id, data) {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return { status: res.status, ok: res.ok, json }; // retorna tudo
}

export async function criarUsuario(data) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function listarUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
}

export async function recuperarSenha(cpf, senha_nova, confirmar_senha) {
  const res = await fetch(`${API_URL}/esqueci-senha`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, senha_nova, confirmar_senha }),
  });
  return res.json();
}

export async function excluirUsuario(id) {
  // retorna o mesmo padrão usado em atualizarUsuario (status, ok, json)
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  // tenta parsear JSON (algumas respostas podem não retornar body)
  let json = {};
  try {
    json = await res.json();
  } catch (e) {
    json = {};
  }

  return { status: res.status, ok: res.ok, json };
}

// ---------------------
// MÁQUINAS
// ---------------------
export async function criarMaquina(data) {
  const res = await fetch(`${API_URL}/maquinas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function atualizarMaquina(id, data) {
  const res = await fetch(`${API_URL}/maquinas/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function excluirMaquina(id) {
  const res = await fetch(`${API_URL}/maquinas/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function listarMaquinas() {
  const res = await fetch(`${API_URL}/maquinas`);
  return res.json();
}

export async function pegarMaquina(id) {
  const r = await fetch(`${API_URL}/maquinas/${id}`);
  return r.json();
}

// ---------------------
// LEITURAS
// ---------------------
export async function enviarLeitura(data) {
  const res = await fetch(`${API_URL}/salvar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function listarLeituras(limit = 1000) {
  const res = await fetch(`${API_URL}/listar?limit=${limit}`);
  return res.json();
}

export async function pegarUltimaLeituraDaMaquina(id) {
  const res = await fetch(`${API_URL}/leituras/maquina/${id}`);
  return res.json();
}

export async function pegarHistoricoDaMaquina(id, limit = 5) {
  const r = await fetch(`${API_URL}/maquinas/${id}/leituras?limit=${limit}`);
  const json = await r.json();
  if (!json.ok) return [];
  return json.leituras;
}

export async function pegarMediaLeituras() {
  const r = await fetch(`${API_URL}/leituras/media`);
  return r.json();
}

