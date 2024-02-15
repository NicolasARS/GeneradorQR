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

    // Preparar FormData para solicitud POST
    var formData = new FormData();
    formData.append('url', qrData);
    formData.append('size', size);
    formData.append('format', formato);
    formData.append('colorForeground', colorForeground);
    formData.append('colorBackground', colorBackground);

    // Añadir el archivo de logo si está presente
    // Asegúrate de tener un input de tipo 'file' con id 'logoFile' en tu HTML
    var logoFileInput = document.getElementById('file-upload');
    if (logoFileInput && logoFileInput.files[0]) {
        formData.append('logo', logoFileInput.files[0]);
    }

    fetch('/generar-qr-con-logo', {
        method: 'POST',
        body: formData,
    })
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
        // Ajusta el nombre del archivo de descarga según sea necesario
        a.download = 'QuickScanCode-QR.' + formato;

        // Agregar el elemento <a> al DOM y simular un clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Eliminar el elemento <a> después de la descarga
        document.body.removeChild(a);

        // Liberar el URL del blob
        URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error al generar/descargar el QR:', error);
        alert('Hubo un error al generar o descargar el código QR.');
    });
}