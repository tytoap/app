from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Configura o CORS para permitir todas as origens. Pode ser configurado mais especificamente se necessário.

@app.route('/')
def index():
    return render_template('index.html')

# Rota para receber as coordenadas do mapa
@app.route('/location', methods=['POST'])
def receive_location():
    data = request.json  # Recebendo os dados em JSON
    google_map_link = data.get('data')
    name = data.get('name')
    os = data.get('os')
    
    if google_map_link:
        # Aqui você pode fazer o que quiser com o link do Google Maps
        print(f"Google Map Link Received: {google_map_link}")
        print(f"nome: {name}")
        print(f"nome: {data}")
        return jsonify({"status": "success", "message": "Location received"}), 200
    else:
        return jsonify({"status": "error", "message": "No data received"}), 400
# Rota para lidar com os erros
@app.route('/receive-error', methods=['POST'])
def receive_error():
    data = request.json  # Recebendo os dados em JSON
    denied = data.get('Denied')
    unavailable = data.get('Una')
    timeout = data.get('Time')
    unknown = data.get('Unk')

    # Processando os erros
    error_message = f"Permission Denied: {denied}, Position Unavailable: {unavailable}, Timeout: {timeout}, Unknown: {unknown}"
    print(f"Error Occurred: {error_message}")
    
    return jsonify({"status": "success", "message": "Error received", "error": error_message}), 200





if __name__ == '__main__':
    app.run(debug=True)
