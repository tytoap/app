// Detecção de plugins instalados
function detectPlugins() {
    const pluginNames = ["Shockwave Flash", "Java", "QuickTime", "Silverlight", "Adobe Acrobat"];
    const detectedPlugins = [];

    for (let i = 0; i < pluginNames.length; i++) {
        const pluginName = pluginNames[i];
        const pluginInstalled = Array.from(navigator.plugins).some(plugin => plugin.name.includes(pluginName));

        if (pluginInstalled) {
            detectedPlugins.push(pluginName);
        }
    }
    return detectedPlugins;
}

// Detecção de propriedades básicas do navegador e do dispositivo
function detectBasicInfo() {
    var ver = navigator.userAgent;
    return {
        userAgent: ver,
        language: navigator.language,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency || 'Not Available',
        deviceMemory: navigator.deviceMemory || 'Not Available',
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        graphics: navigator.gpu || navigator.graphics || 'Not Available',
        vendor: navigator.vendor,
        windowWidth: window.screen.width,
        windowHeight: window.screen.height,
        os: detectOS(ver),
        browser: detectBrowser(ver),
        isMobile: /Mobi|Android/i.test(ver),
        timezoneOffset: new Date().getTimezoneOffset()
    };
}

// Funções auxiliares para detectar o sistema operacional e navegador
function detectOS(userAgent) {
    if (userAgent.indexOf('Win') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
    if (userAgent.indexOf('X11') !== -1) return 'UNIX';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    return 'Unknown';
}

function detectBrowser(userAgent) {
    if (userAgent.indexOf('Chrome') !== -1) return 'Chrome';
    if (userAgent.indexOf('Firefox') !== -1) return 'Firefox';
    if (userAgent.indexOf('Safari') !== -1) return 'Safari';
    if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1) return 'Internet Explorer';
    return 'Unknown';
}

// Impressão digital do Canvas
function detectCanvasFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Browser Fingerprint", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Browser Fingerprint", 4, 17);

    return canvas.toDataURL();
}

// Detecção da localização do usuário com precisão adicional
function detectLocation() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            const options = {
                enableHighAccuracy: true, // Tenta obter a localização mais precisa
                timeout: 10000,           // Tempo máximo para obter a localização (10 segundos)
                maximumAge: 0            // Não usa a localização em cache
            };
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    reject('Geolocation permission denied or unavailable');
                },
                options
            );
        } else {
            reject('Geolocation not supported by this browser');
        }
    });
}

// Requisição para obter localização por IP
function getLocationByIP() {
    return fetch('http://ip-api.com/json/')
        .then(response => response.json())
        .then(data => ({
            ip: data.query,
            city: data.city,
            region: data.regionName,
            country: data.country,
            latitude: data.lat,
            longitude: data.lon,
            isp: data.isp,
            organization: data.org
        }))
        .catch(() => ({
            ip: 'Not available',
            city: 'Not available',
            region: 'Not available',
            country: 'Not available',
            latitude: 'Not available',
            longitude: 'Not available',
            isp: 'Not available',
            organization: 'Not available'
        }));
}

// Função para renderizar os resultados
async function displayResults() {
    const basicInfo = detectBasicInfo();
    const plugins = detectPlugins();
    const canvasFingerprint = detectCanvasFingerprint();
    const ipLocation = await getLocationByIP();

    let output = `
        <h2>Informações Básicas</h2>
        <ul>
            <li><strong>User Agent:</strong> ${basicInfo.userAgent}</li>
            <li><strong>Idioma:</strong> ${basicInfo.language}</li>
            <li><strong>Plataforma:</strong> ${basicInfo.platform}</li>
            <li><strong>Sistema Operacional:</strong> ${basicInfo.os}</li>
            <li><strong>Navegador:</strong> ${basicInfo.browser}</li>
            <li><strong>Processadores (Threads):</strong> ${basicInfo.hardwareConcurrency}</li>
            <li><strong>Memória do Dispositivo:</strong> ${basicInfo.deviceMemory} GB</li>
            <li><strong>Resolução da Tela:</strong> ${basicInfo.screenResolution}</li>
            <li><strong>Profundidade de Cor:</strong> ${basicInfo.colorDepth}</li>
            <li><strong>GPU/Gráficos:</strong> ${basicInfo.graphics}</li>
            <li><strong>Fornecedor:</strong> ${basicInfo.vendor}</li>
            <li><strong>Dimensões da Janela:</strong> ${basicInfo.windowWidth}x${basicInfo.windowHeight}</li>
            <li><strong>Fuso Horário (Offset):</strong> ${basicInfo.timezoneOffset}</li>
            <li><strong>Dispositivo Móvel:</strong> ${basicInfo.isMobile ? 'Sim' : 'Não'}</li>
        </ul>
        <h2>Plugins Detectados</h2>
        <ul>
            ${plugins.length ? plugins.map(plugin => `<li>${plugin}</li>`).join('') : '<li>Nenhum plugin detectado</li>'}
        </ul>
        <h2>Impressão Digital do Canvas</h2>
        <img src="${canvasFingerprint}" alt="Canvas Fingerprint"/>
        <h2>Localização por IP</h2>
        <ul>
            <li><strong>IP:</strong> ${ipLocation.ip}</li>
            <li><strong>Cidade:</strong> ${ipLocation.city}</li>
            <li><strong>Região:</strong> ${ipLocation.region}</li>
            <li><strong>País:</strong> ${ipLocation.country}</li>
            <li><strong>Latitude:</strong> ${ipLocation.latitude}</li>
            <li><strong>Longitude:</strong> ${ipLocation.longitude}</li>
            <li><strong>ISP:</strong> ${ipLocation.isp}</li>
            <li><strong>Organização:</strong> ${ipLocation.organization}</li>
            <li><strong>Google Maps:</strong> <a href="https://www.google.com/maps/place/${ipLocation.latitude},${ipLocation.longitude}" target="_blank">Ver no Google Maps</a></li>
        </ul>
    `;

    try {
        const location = await detectLocation();
        const mapsUrl = `https://www.google.com/maps/place/${location.latitude},${location.longitude}`;
        output += `
            <h2>Localização do Usuário (GPS)</h2>
            <ul>
                <li><strong>Latitude:</strong> ${location.latitude}</li>
                <li><strong>Longitude:</strong> ${location.longitude}</li>
                <li><strong>Precisão:</strong> ${location.accuracy} metros</li>
                <li><strong>Google Maps:</strong> <a href="${mapsUrl}" target="_blank">Ver no Google Maps</a></li>
            </ul>
        `;
    } catch (error) {
        output += `
            <h2>Localização do Usuário (GPS)</h2>
            <p>${error}</p>
        `;
    }

    document.getElementById('output').innerHTML = output;
}

// Chama a função para exibir os resultados quando a página é carregada
window.onload = displayResults;
