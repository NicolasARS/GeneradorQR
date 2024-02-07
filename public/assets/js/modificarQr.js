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
    fetch('/generar-qr?url=' + qrData + '&size=' + size + '&colorForeground=' + encodeURIComponent(colorForeground) + '&colorBackground=' + encodeURIComponent(colorBackground))
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

    document.getElementById('file-upload').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var file = this.files[0];
            subirLogoYActualizarQR(file);
        };
    });

    function subirLogoYActualizarQR(file) {
        var formData = new FormData();
        formData.append('logo', file);
    
        // Asumiendo que otros datos como 'url', 'size', etc. ya están definidos
        var qrPreviewDiv = document.querySelector('.qr-preview');
        var qrData = qrPreviewDiv.dataset.qrData;
        var size = qrPreviewDiv.dataset.size; // Obtiene el tamaño desde el dataset
        var colorForeground = qrPreviewDiv.dataset.colorForeground || '#000000';
        var colorBackground = qrPreviewDiv.dataset.colorBackground || '#ffffff';
    
        if (!qrData) {
            console.error('No se ha generado ningún QR para actualizar.');
            return;
        }
    
        // Añadir otros datos al formData si es necesario
        formData.append('url', qrData);
        formData.append('size', size);
        formData.append('colorForeground', colorForeground);
        formData.append('colorBackground', colorBackground);
    
        fetch('/generar-qr-con-logo', {
            method: 'POST',
            body: formData
        })
        .then(response => response.blob())
        .then(blob => {
            var url = URL.createObjectURL(blob);
            qrPreviewDiv.querySelector('img').src = url;
        })
        .catch(error => {
            console.error('Error al actualizar el QR con el logo:', error);
        });
    }
});