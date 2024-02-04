$(document).ready(function() {
    $('.option-button').click(function() {
        var type = $(this).data('type'); // Obtener el tipo de botón presionado
        $('.input-area').slideUp(); // Ocultar todas las áreas de entrada

        // Mostrar la correspondiente área de entrada
        switch (type) {
            case 'url':
                $('#qr-url-area').slideDown();
                break;
            case 'texto':
                $('#qr-texto-area').slideDown();
                break;
            case 'email':
                $('#qr-email-area').slideDown();
                break;
            case 'sms':
                $('#qr-sms-area').slideDown();
                break;
            case 'wifi':
                $('#qr-wifi-area').slideDown();
                break;
            default:
                break;
        }
    });
});