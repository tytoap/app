from flask import Flask, jsonify, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/ip-location')
def ip_location():
    # Captura o IP do cliente
    client_ip = request.remote_addr
    try:
        # Requisição para a API ip-api usando o IP do cliente
        response = requests.get(f'http://ip-api.com/json/{client_ip}')
        response.raise_for_status()  # Verifica se a resposta foi bem-sucedida
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        return jsonify({'error': 'Failed to get IP location data'}), 500

if __name__ == '__main__':
    app.run(debug=True)
