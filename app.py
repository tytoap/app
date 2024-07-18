from flask import Flask, jsonify, request

app = Flask(__name__)

# Lista para armazenar os dados recebidos
dados_usuarios = []

@app.route('/')
def home():
    return render_template('index.html')

    
# Rota para receber dados via POST
@app.route('/api/cadastrar', methods=['POST'])
def cadastrar_usuario():
    # Verifica se os dados foram enviados corretamente como JSON
    if request.is_json:
        # Obtém os dados do corpo da requisição
        dados = request.get_json()

        # Verifica se os campos 'nome' e 'email' estão presentes nos dados
        if 'nome' in dados and 'email' in dados:
            nome = dados['nome']
            email = dados['email']

            # Adiciona os dados à lista
            dados_usuarios.append({'nome': nome, 'email': email})

            # Retorna os dados adicionados em JSON
            return jsonify({'message': 'Dados cadastrados com sucesso!', 'nome': nome, 'email': email}), 201
        else:
            # Caso os campos 'nome' e 'email' não estejam presentes
            return jsonify({'error': 'Campos \'nome\' e \'email\' são obrigatórios.'}), 400
    else:
        # Caso os dados não estejam no formato JSON
        return jsonify({'error': 'Dados devem ser enviados no formato JSON.'}), 400

# Rota para mostrar todos os dados cadastrados
@app.route('/dados', methods=['GET'])
def mostrar_dados():
    return jsonify(dados_usuarios)

if __name__ == '__main__':
    app.run(debug=True)
