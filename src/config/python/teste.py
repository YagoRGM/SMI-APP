import requests

API = "https://smi-app.yago-roberto2008.workers.dev"

def detalhes(id_maquina):
    url = f"{API}/maquinas/{id_maquina}/leituras?limit=5"
    print(">> Chamando:", url)

    r = requests.get(url)

    try:
        json = r.json()
    except:
        print("❌ Resposta não é JSON.")
        print("Resposta bruta:", r.text)
        return

    print("\n=== RESPOSTA BRUTA ===")
    print(json)

    # DEBUG: ver exatamente o que veio
    if not isinstance(json, dict):
        print("\n❌ Resposta inesperada — não é um objeto JSON.")
        return

    if not json.get("ok"):
        print("\n❌ API NÃO RETORNOU { ok: true }")
        print("Conteúdo recebido da API:")
        print(json)
        return

    # se chegou aqui, ok é true
    leituras = json.get("leituras", [])

    if not leituras:
        print("\n❌ Nenhuma leitura encontrada.")
        return

    temperaturas = [l.get("temperatura") for l in leituras]
    consumos = [l.get("consumo_eletrico") for l in leituras]

    print("\n=== TEMPERATURAS ===")
    print(temperaturas)

    print("\n=== CONSUMOS ===")
    print(consumos)

detalhes(1)
