from flask import Flask, request, jsonify, render_template


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/wt')
def wt():
    return render_template('dashboard.html')

@app.route('/api/device_information', methods=['POST'])
def device_information():
    global device_data
    device_data = request.get_json()
    # Aqui você pode processar os dados do dispositivo recebidos
    # por exemplo, salvar em um banco de dados ou realizar outras operações
    print('Dados do dispositivo recebidos:', device_data)
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
     # Construir a URL usando latitude e longitude
    if location_data and 'latitude' in location_data and 'longitude' in location_data:
        latitude = location_data['latitude']
        longitude = location_data['longitude']
        url = f'https://www.google.com/maps?q={latitude},{longitude}'
    else:
        url = 'Dados de localização não disponíveis'
    
    return jsonify({
        'location_data': location_data,
        'device_data': device_data,
        'url': url
    })

if __name__ == '__main__':
    app.run(debug=True)
