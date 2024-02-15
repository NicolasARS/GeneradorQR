$(document).ready(function() {
    // Establecer el tipo de QR por defecto como 'url'
    var generateQRButton = $('#generate-qr');
    if (generateQRButton.length) {
        generateQRButton.attr('data-type', 'url');
    }

    // Mostrar automáticamente el área de entrada para URLs
    var currentActiveArea = $('#qr-url-area').show();

    // Establece el valor por defecto de los selectores
    $('.sizeqr').val('300');

    // Event listeners para botones de tipo de QR
    $('.option-button').click(function() {
        var type = $(this).attr('data-type'); // Uso de .attr() para recuperar el valor

        var newActiveArea;
        switch(type) {
            case 'email':
                newActiveArea = $('#qr-email-area');
                break;
            case 'url':
                newActiveArea = $('#qr-url-area');
                break;
            case 'texto':
                newActiveArea = $('#qr-texto-area');
                break;
            case 'sms':
                newActiveArea = $('#qr-sms-area');
                break;
            case 'wifi':
                newActiveArea = $('#qr-wifi-area');
                break;
        }

        // Si el nuevo área activa es diferente al área actualmente visible, animar el cambio
        if (!currentActiveArea.is(newActiveArea)) {
            currentActiveArea.slideUp(function() {
                // Esta función de callback se ejecuta después de completar slideUp
                newActiveArea.slideDown();
                currentActiveArea = newActiveArea; // Actualizar el área activa actual
            });
        }

        // Establecer el tipo de QR a generar
        generateQRButton.attr('data-type', type);
    });
});