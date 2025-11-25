import requests

API = "https://smi-app.yago-roberto2008.workers.dev"

payload = {
    "id_maquina": 3,
    "gas": 360,
    "temperatura": 34.5,
    "umidade": 28,
    "vibracao": 1,
    "consumo_eletrico": 36
}

r = requests.post(f"{API}/leituras", json=payload)

print("Status:", r.status_code)
print("Resposta:", r.json())
