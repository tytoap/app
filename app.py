from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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
    return jsonify({
        'location_data': location_data,
        'device_data': device_data
          
    })
    

if __name__ == '__main__':
    app.run(debug=True)
