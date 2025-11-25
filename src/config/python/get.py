import requests

API = "https://smi-app.yago-roberto2008.workers.dev"

def testar_get_leituras(id_maquina):
    url = f"{API}/maquinas/{id_maquina}/leituras"
    resp = requests.get(url)

    print("Status:", resp.status_code)
    print("Resposta:")
    print(resp.json())

if __name__ == "__main__":
    testar_get_leituras(2)  # coloque o ID da máquina que você quer testar
