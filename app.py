from flask import Flask, jsonify, render_template, request
import requests
from requests.auth import HTTPProxyAuth

app = Flask(__name__)

# Configurações do proxy com autenticação
PROXY_URL = 'http://proxy.educacao.parana:8080'  # Substitua pelo URL do seu proxy
PROXY_USER = 'joailson'           # Substitua pelo seu nome de usuário
PROXY_PASS = 'Axl130213a'           # Substitua pela sua senha

 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/ip-location', methods=['POST'])
def ip_location():
    data = request.json
    client_ip = data.get('ip')

    if not client_ip:
        return jsonify({'error': 'IP address not provided'}), 400

    try:
        # Requisição para a API ipinfo.io para obter a localização baseada no IP
        proxies = {
            'http': PROXY_URL,
            'https': PROXY_URL
        }
        response = requests.get(f'https://ipinfo.io/{client_ip}/json', proxies=proxies, auth=(PROXY_USER, PROXY_PASS))
        response.raise_for_status()  # Verifica se a resposta foi bem-sucedida
        location_data = response.json()
        return jsonify(location_data)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)