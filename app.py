from flask import Flask, request, jsonify, render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Configura o CORS para permitir todas as origens. Pode ser configurado mais especificamente se necessário.

@app.route('/')
def index():
    return render_template('index.html')

# Rota para coletar as informações
@app.route('/collect', methods=['POST'])
def collect():
    data = request.json
    # Aqui você pode salvar as informações coletadas em um arquivo ou banco de dados
    with open('data_collected.json', 'a') as f:
        json.dump(data, f)
        f.write('\n')
    return jsonify({"status": "success", "message": "Data collected successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
