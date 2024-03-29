document.addEventListener('DOMContentLoaded', function () {
    
    function generarQR() {
    var type = this.dataset.type; // esto asumirá que el botón presionado tiene un data-type atributo
    
    if (!type) {
        alert('Por favor, selecciona el tipo de QR que deseas generar.');
        return; // Detiene la ejecución de la función si no se ha seleccionado un tipo
    }

    var isValid = true;

    switch(type) {
        case 'url':
            isValid = $("#qr-url-form").valid();
            break;
        case 'email':
            isValid = $("#qr-email-form").valid();
            break;
        case 'texto':
            isValid = $("#qr-text-form").valid();
            break;
        case 'sms':
            isValid = $("#qr-sms-form").valid();
            break;
        case 'wifi':
            isValid = $("#qr-wifi-form").valid();
            break;
        default:
            console.error('Tipo no reconocido:', type);
            isValid = false; // Si el tipo no es reconocido, marca la validación como fallida.
    }

    if (!isValid) {
        alert('Por favor, corrige los errores antes de generar el QR.');
        return; // Detiene la ejecución si la validación falla
    }
    
    var qrData = '';

    switch (type) {
        case 'url':
            // Lógica para URLs
            var url = document.getElementById('qr-url-input').value;
            if (!url) {
                alert('Por favor, ingresa una URL.');
                return;
            }
            qrData = encodeURIComponent(url);
            break;

        case 'email':
            // Lógica para Emails
            var emailAddress = document.getElementById('email-address').value;
            var emailSubject = document.getElementById('email-subject').value;
            var emailMessage = document.getElementById('email-message').value;

            if (!emailAddress) {
                alert('Por favor, ingresa una Correo.');
                return;
            }

            qrData = 'mailto:' + encodeURIComponent(emailAddress);
            var params = [];
            if (emailSubject) {
                params.push('subject=' + encodeURIComponent(emailSubject));
            }
            if (emailMessage) {
                params.push('body=' + encodeURIComponent(emailMessage));
            }
            if (params.length) {
                qrData += '?' + params.join('&');
            }
            break;

        case 'wifi':
            // Lógica para WiFi
            var ssid = document.getElementById('wifi-red').value;
            var password = document.getElementById('wifi-contraseña').value;
            var securityType = document.querySelector('input[name="wifi-seguridad"]:checked').value;

            if (!ssid) {
                alert('Por favor, ingresa el nombre de la red WiFi.');
                return;
            }

            qrData = 'WIFI:S:' + encodeURIComponent(ssid) + ';';
            if (securityType !== 'ninguna') {
                qrData += 'T:' + securityType + ';';
                if (password) {
                    qrData += 'P:' + encodeURIComponent(password) + ';';
                }
            }
            qrData += ';';
            break;

        case 'sms':
            // Lógica para Mensajes
            var telefono = document.getElementById('sms-phone').value;
            var mensaje = document.getElementById('sms-message').value;

            if (!telefono) {
                alert('Por favor, ingresa un número de teléfono.');
                return;
            }
            qrData = 'sms:' + encodeURIComponent(telefono) + '?body=' + encodeURIComponent(mensaje);
            break;

        case 'texto':
            // Lógica para Texto
            var texto = document.getElementById('qr-text-input').value; // Asegúrate de que este es el ID correcto
            qrData = encodeURIComponent(texto);
            break;
        default:
            console.error('Tipo no reconocido:', type);
            return;
    }

    // Encuentra el selector de tamaño activo basado en el tipo de QR
    var sizeSelector = document.querySelector('#qr-' + type + '-area .sizeqr');
    var size = sizeSelector ? sizeSelector.value : '300'; // Usar un valor por defecto si no se encuentra

    // Hacer la solicitud fetch al backend para generar el QR
    fetch('/generar-qr?url=' + qrData + '&size=' + size)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.blob();
        })
        .then(blob => {
            // Crear un URL con el blob recibido y mostrarlo en el img
            var newImg = document.createElement('img');
            var url = URL.createObjectURL(blob);

            newImg.onload = function () {
                // No necesitas más el blob, así que liberamos la memoria
                URL.revokeObjectURL(url);
            };

            newImg.src = url;
            var qrPreviewDiv = document.querySelector('.qr-preview');
            qrPreviewDiv.innerHTML = ''; // Limpia el contenido actual
            qrPreviewDiv.appendChild(newImg); // Añade la nueva imagen QR
            qrPreviewDiv.dataset.qrData = qrData;
            qrPreviewDiv.dataset.size = size; // Guarda el tamaño en el dataset

            // Borrar el contenido del campo basado en el tipo de QR
            switch (type) {
                case 'url':
                    document.getElementById('qr-url-input').value = '';
                    break;
                case 'email':
                    document.getElementById('email-address').value = '';
                    document.getElementById('email-subject').value = '';
                    document.getElementById('email-message').value = '';
                    break;
                case 'wifi':
                    document.getElementById('wifi-red').value = '';
                    document.getElementById('wifi-contraseña').value = '';
                    break;
                case 'sms':
                    document.getElementById('sms-phone').value = '';
                    document.getElementById('sms-message').value = '';
                    break;
                case 'texto':
                    document.getElementById('qr-text-input').value = '';
                    break;
                // No es necesario un caso 'default' aquí
            }
        })
        .catch(error => {
            console.error('Error al generar el QR:', error);
            alert('Hubo un error al generar el código QR.');
        });
}


// Event listener para el botón de generar QR
document.getElementById('generate-qr').addEventListener('click', generarQR);

 // Obtener el valor del parámetro 'type' de la URL
 var urlParams = new URLSearchParams(window.location.search);
 var typeToShow = urlParams.get('type');

 // Mostrar la sección correspondiente y ocultar las demás
 var inputArea = document.getElementById('qr-url-area');
 var emailForm = document.getElementById('qr-email-area');
 var textArea = document.getElementById('qr-texto-area');
 var smsArea = document.getElementById('qr-sms-area');
 var wifiArea = document.getElementById('qr-wifi-area');

 // Ocultar todas las áreas
 inputArea.style.display = 'none';
 emailForm.style.display = 'none';
 textArea.style.display = 'none';
 smsArea.style.display = 'none';
 wifiArea.style.display = 'none';

 // Mostrar el área correspondiente al tipo proporcionado en la URL
 if (typeToShow === 'url') {
     inputArea.style.display = 'block';
 } else if (typeToShow === 'email') {
     emailForm.style.display = 'block';
 } else if (typeToShow === 'texto') {
     textArea.style.display = 'block';
 } else if (typeToShow === 'sms') {
     smsArea.style.display = 'block';
 } else if (typeToShow === 'wifi') {
     wifiArea.style.display = 'block';
 }
});