import requests
import re  # <<--- IMPORTANTE: pra limpar caracteres estranhos

API = "https://smi-app.yago-roberto2008.workers.dev"

def listar_maquinas():
    resp = requests.get(f"{API}/maquinas")
    maquinas = resp.json()   # ← É UMA LISTA, NÃO TEM "data" AQUI
    
    print("\n=== LISTA DE MÁQUINAS ===")
    for m in maquinas:
        print(f"[{m['id_maquina']}] - {m['nome_maquina']} ({m['modelo_maquina']})")
    
    return maquinas


def escolher_maquina(maquinas):
    escolha = input("\nDigite o ID da máquina ou parte do nome: ").strip()

    # 🔥 Remove tudo que NÃO for número ou letra
    escolha_limpa = re.sub(r"[^0-9A-Za-zÀ-ÿ ]", "", escolha)

    # --- SE FOR SÓ NÚMERO → ID ---
    if escolha_limpa.isdigit():
        id_escolhido = int(escolha_limpa)

        for m in maquinas:
            if m["id_maquina"] == id_escolhido:
                return m["id_maquina"]

        print("ID não encontrado.")
        return escolher_maquina(maquinas)

    # --- SE FOR TEXTO → BUSCA POR NOME ---
    escolha_lower = escolha_limpa.lower()
    filtradas = [m for m in maquinas if escolha_lower in m["nome_maquina"].lower()]

    if len(filtradas) == 0:
        print("Nenhuma máquina encontrada com esse nome.")
        return escolher_maquina(maquinas)

    elif len(filtradas) == 1:
        print(f"Selecionado: {filtradas[0]['nome_maquina']}")
        return filtradas[0]["id_maquina"]

    else:
        print("\nVárias máquinas encontradas:")
        for m in filtradas:
            print(f"[{m['id_maquina']}] - {m['nome_maquina']}")
        return escolher_maquina(maquinas)


def enviar_leitura(id_maquina, gas, temperatura, umidade, vibracao, consumo_eletrico):
    payload = {
        "id_maquina": id_maquina,
        "gas": gas,
        "temperatura": temperatura,
        "umidade": umidade,
        "vibracao": vibracao,
        "consumo_eletrico": consumo_eletrico
    }

    r = requests.post(f"{API}/leituras", json=payload)
    print("Resposta API:", r.json())


# -----------------------------
# FLUXO PRINCIPAL
# -----------------------------
if __name__ == "__main__":
    maquinas = listar_maquinas()
    id_maquina = escolher_maquina(maquinas)

    print("\nEnviando leitura...\n")

    enviar_leitura(
        id_maquina=id_maquina,
        gas=120.5,
        temperatura=28,
        umidade=60,
        vibracao=1,
        consumo_eletrico=12.4
    )
