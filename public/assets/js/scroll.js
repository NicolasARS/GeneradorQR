window.onload = resetScroll;
window.onscroll = scrollFunction;

function resetScroll() {
    // Esta función restablece la visibilidad del botón cuando la página se carga
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function scrollFunction() {
    // Esta función maneja la visibilidad del botón durante el desplazamiento
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// Cuando el usuario hace clic en el botón, desplaza hacia la parte superior de la página de manera suave
function topFunction() {
    window.scrollTo({
        top: 10,
        behavior: 'smooth' // Esto hace que el desplazamiento sea suave
    });
}
