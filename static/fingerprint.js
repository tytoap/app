// Função para obter o IP público do cliente
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return null;
    }
}

// Função para enviar o IP para o servidor
async function sendIPToServer(ip) {
    try {
        const response = await fetch('/api/ip-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ip: ip })
        });
        const data = await response.json();
        console.log('Server response:', data);
    } catch (error) {
        console.error('Error sending IP to server:', error);
    }
}

// Função principal para executar as ações
async function main() {
    const ip = await getClientIP();
    if (ip) {
        await sendIPToServer(ip);
    }
}

// Executa a função principal quando a página é carregada
window.onload = main;
