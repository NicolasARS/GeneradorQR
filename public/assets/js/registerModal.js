document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('registroModal').style.display = 'block';
    }, 10000); // 10000 milisegundos = 10 segundos
});

function cerrarModal() {
    document.getElementById('registroModal').style.display = 'none';
}
