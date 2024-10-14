window.onload = function() {
    let status = document.getElementById('status');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    language: navigator.language
                };

                // Enviar os dados coletados para o servidor
                fetch('/collect', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    status.innerText = "Data collected successfully!";
                })
                .catch((error) => {
                    console.error('Error:', error);
                    status.innerText = "Error collecting data.";
                });
            },
            function(error) {
                status.innerText = "Unable to retrieve your location.";
            }
        );
    } else {
        status.innerText = "Geolocation is not supported by your browser.";
    }
}
