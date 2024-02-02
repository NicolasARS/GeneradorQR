// Event listener para el botón de descarga en formato JPG
document.getElementById('download-jpg').addEventListener('click', function () {
    descargarQR('jpg');
});

// Event listener para el botón de descarga en formato SVG/EPS
document.getElementById('download-vector').addEventListener('click', function () {
    descargarQR('svg');
});

function descargarQR(formato) {
    var qrData = document.querySelector('.qr-preview').dataset.qrData;
    var size = document.querySelector('.qr-preview').dataset.size; // Obtiene el tamaño del dataset
    var colorForeground = document.querySelector('.qr-preview').dataset.colorForeground || '#000000'; // Negro por defecto;
    var colorBackground = document.querySelector('.qr-preview').dataset.colorBackground || '#FFFFFF'; // Blanco por defecto;

    if (!qrData) {
        alert('No se ha generado ningún QR o se ha perdido la información.');
        return;
    }

    // Hacer la solicitud fetch al backend para generar el QR en el formato especificado
    fetch('/generar-qr?url=' + qrData + '&size=' + size + '&format=' + formato + '&colorForeground=' + encodeURIComponent(colorForeground) + '&colorBackground=' + encodeURIComponent(colorBackground))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.blob();
        })
        .then(blob => {
            // Crear un URL con el blob recibido y activar la descarga
            var url = URL.createObjectURL(blob);

            // Crear un elemento <a> oculto para la descarga
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'qr_code.' + formato;

            // Agregar el elemento <a> al DOM y simular un clic para iniciar la descarga
            document.body.appendChild(a);
            a.click();

            // Eliminar el elemento <a> después de la descarga
            document.body.removeChild(a);

            // No necesitas más el blob, así que liberamos la memoria
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error al generar/descargar el QR:', error);
            alert('Hubo un error al generar o descargar el código QR.');
        });
}