from flask import Flask, jsonify

app = Flask(__name__)

# Lista qualquer (exemplo)
lista_qualquer = [1, 2, 3, 4, 5]

# Rota para retornar a lista em JSON
@app.route('/api/lista', methods=['GET'])
def get_lista():
    return jsonify(lista_qualquer)

if __name__ == '__main__':
    app.run(debug=True)
