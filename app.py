from flask import Flask, jsonify, send_from_directory, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/ip-location')
def ip_location():
    try:
        response = requests.get('http://ip-api.com/json/')
        response.raise_for_status()  # Verifica se a resposta foi bem-sucedida
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        return jsonify({'error': 'Failed to get IP location data'}), 500

if __name__ == '__main__':
    app.run(debug=True)
