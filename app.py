from flask import Flask, request, jsonify

app = Flask(__name__)

# Rota para receber o nome via POST
@app.route('/hello', methods=['POST'])
def hello():
    data = request.get_json()
    name = data.get('name')
    return jsonify({'message': f'Hello, {name}!'})

# Rota para exibir o nome recebido na URL
@app.route('/name/<name>')
def show_name(name):
    return f'Name: {name}'

if __name__ == '__main__':
    app.run(debug=True)
