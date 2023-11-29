function generarQR() {
    var url = document.getElementById('qr-input').value;
    if (url) {
        // Hacer una solicitud AJAX al backend para generar el QR
        fetch('/generar-qr?url=' + encodeURIComponent(url))
            .then(response => response.blob())
            .then(blob => {
                // Crear un URL con el blob recibido y mostrarlo en el img
                var newImg = document.createElement('img'),
                    url = URL.createObjectURL(blob);

                newImg.onload = function() {
                    // No necesitas más el blob, así que liberamos la memoria
                    URL.revokeObjectURL(url);
                };

                newImg.src = url;
                var qrPreviewDiv = document.querySelector('.qr-preview');
                qrPreviewDiv.innerHTML = ''; // Limpia el contenido actual
                qrPreviewDiv.appendChild(newImg); // Añade la nueva imagen QR
            })
            .catch(error => console.error('Error al generar el QR:', error));
    } else {
        alert('Por favor, ingresa una URL.');
    }
}