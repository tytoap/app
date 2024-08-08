from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Configura o CORS para permitir todas as origens. Pode ser configurado mais especificamente se necessário.

# Variável global para armazenar os dados
stored_data = {}

@app.route('/submit_data', methods=['POST'])
def submit_data():
    global stored_data
    try:
        data = request.json
        stored_data = data  # Armazena os dados recebidos na variável global
        print(f"Data received and stored: {data}")  # Adiciona uma mensagem de log
        return jsonify({"status": "success", "data": data}), 200
    except Exception as e:
        print(f"Error receiving data: {str(e)}")  # Adiciona uma mensagem de log de erro
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/display_results', methods=['GET'])
def display_results():
    global stored_data
    if stored_data:
        print(f"Data being returned: {stored_data}")  # Adiciona uma mensagem de log
        return jsonify(stored_data), 200
    else:
        print("No data available")  # Adiciona uma mensagem de log
        return jsonify({"status": "error", "message": "No data available"}), 404

if __name__ == '__main__':
    app.run(debug=True)
