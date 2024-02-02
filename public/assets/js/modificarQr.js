document.getElementById('colorForeground').addEventListener('change', cambiarColorQr);
document.getElementById('colorBackground').addEventListener('change', cambiarColorQr);

function cambiarColorQr() {
    var colorForeground = document.getElementById('colorForeground').value;
    var colorBackground = document.getElementById('colorBackground').value;
    var qrPreviewDiv = document.querySelector('.qr-preview');
    var qrData = qrPreviewDiv.dataset.qrData;
    var size = qrPreviewDiv.dataset.size; // Obtiene el tamaño desde el dataset

    // Actualiza el dataset con los nuevos colores
    qrPreviewDiv.dataset.colorForeground = colorForeground;
    qrPreviewDiv.dataset.colorBackground = colorBackground;

    if (!qrData) {
        console.error('No se ha generado ningún QR para actualizar.');
        return;
    }

    // Actualizar el QR con los colores y tamaño seleccionados
    fetch('/generar-qr?url=' + encodeURIComponent(qrData) + '&size=' + size + '&colorForeground=' + encodeURIComponent(colorForeground) + '&colorBackground=' + encodeURIComponent(colorBackground))
        .then(response => response.blob())
        .then(blob => {
            var url = URL.createObjectURL(blob);
            qrPreviewDiv.querySelector('img').src = url;
        })
        .catch(error => {
            console.error('Error al actualizar el QR:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('colorForeground').value = '#000000'; // Establece a negro
    document.getElementById('colorBackground').value = '#ffffff'; // Establece a blanco
});