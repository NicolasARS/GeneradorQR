document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('registerWindow').style.display = 'block';
    }, 10000); // 10000 milisegundos = 10 segundos
});

function cerrarVentana() {
    document.getElementById('registerWindow').style.display = 'none';
}
