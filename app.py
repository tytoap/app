from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Dicionários para armazenar os dados temporariamente
device_data = {}
location_data = {}

# Rota principal para renderizar o index.html
@app.route('/')
def index():
    return render_template('index.html')

# Rota para receber e armazenar informações do dispositivo
@app.route('/api/device_information', methods=['POST'])
def receive_device_information():
    global device_data
    device_data = request.json
    # Aqui você pode processar os dados como desejar (salvar em um banco de dados, etc.)
    print('Dados do dispositivo recebidos:', device_data)
    return jsonify({'message': 'Dados do dispositivo recebidos com sucesso'})

# Rota para receber e armazenar informações de localização
@app.route('/api/location_information', methods=['POST'])
def receive_location_information():
    global location_data
    location_data = request.json
    # Aqui você pode processar os dados como desejar (salvar em um banco de dados, etc.)
    print('Dados de localização recebidos:', location_data)
    return jsonify({'message': 'Dados de localização recebidos com sucesso'})

# Rota para consolidar e retornar todos os dados coletados
@app.route('/dados', methods=['GET'])
def get_all_data():
    global device_data, location_data
    all_data = {
        'device_information': device_data,
        'location_information': location_data
    }
    return jsonify(all_data)

if __name__ == '__main__':
    app.run(debug=True)
