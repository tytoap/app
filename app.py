from flask import Flask, request, jsonify, render_template
import json
import os
from datetime import datetime

app = Flask(__name__)


@app.route('/')
def index():
    
    return render_template('index.html')

 

@app.route('/api/device_information', methods=['POST'])
def device_information():
    global location_data, device_data
    device_data = request.get_json()
    # Aqui você pode processar os dados do dispositivo recebidos
    # por exemplo, salvar em um banco de dados ou realizar outras operações
    print('Dados do dispositivo recebidos:', device_data)
   

    if location_data and 'latitude' in location_data and 'longitude' in location_data:
        latitude = location_data['latitude']
        longitude = location_data['longitude']
        url = f'https://www.google.com/maps?q={latitude},{longitude}'
    else:
        url = 'Dados de localização não disponíveis'

    # Dados para adicionar ao arquivo JSON
    data_to_add = {
        'location_data': location_data,
        'device_data': device_data,
        'url': url
    }

    # Nome do arquivo JSON
    json_file_name = 'dados.json'

    # Carregar o conteúdo existente do arquivo JSON (se existir)
    if os.path.exists(json_file_name):
        with open(json_file_name, 'r') as json_file:
            all_data = json.load(json_file)
    else:
        all_data = {}

    # Usar timestamp como chave única
    timestamp = datetime.now().isoformat()
    all_data[timestamp] = data_to_add

    # Salvar os dados atualizados no arquivo JSON
    with open(json_file_name, 'w') as json_file:
        json.dump(all_data, json_file, indent=4)


    return jsonify({'message': 'Dados do dispositivo recebidos com sucesso!'})

@app.route('/api/location_information', methods=['POST'])
def location_information():
    global location_data
    location_data = request.get_json()
    # Aqui você pode processar os dados de localização recebidos
    # por exemplo, salvar em um banco de dados ou realizar outras operações
    print('Dados de localização recebidos:', location_data)
    return jsonify({'message': 'Dados de localização recebidos com sucesso!'})

@app.route('/dados', methods=['GET'])
def get_data():
    # Nome do arquivo JSON
    json_file_name = 'dados.json'

    # Verificar se o arquivo JSON existe
    if os.path.exists(json_file_name):
        # Ler o conteúdo do arquivo JSON salvo
        with open(json_file_name, 'r') as json_file:
            saved_data = json.load(json_file)
        return jsonify(saved_data)
    else:
        dataadd = {
        'location_data': location_data,
        'device_data': device_data,
        'url': url
    }
        return jsonify({dataadd}) 


if __name__ == '__main__':
    app.run(debug=True)
