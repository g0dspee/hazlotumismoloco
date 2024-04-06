// Copia los productos de index.html 20 veces

if (document.getElementById('mini_producto')) {

    var tarjeta = document.getElementById('mini_producto').outerHTML;

    var tarjetas = '';

    for (i = 0; i < 20; i++) {

        tarjetas = tarjetas + tarjeta;

    }

    document.getElementById('mini_producto').outerHTML = tarjetas;

}

// Lee el contenido de un archivo llamado "menu_superior.html" donde está el código del menú de las páginas y lo copia al inicio de cada página

if (document.getElementById('menu')) {

    fetch('menu_superior.html').then(response => {

        return response.text();

    }).then(htmlContent => {

        document.getElementById('menu').innerHTML = htmlContent;

        window.scrollTo(0, 0);

    });

};

//Cambiar estado de logged/unlogged

function iniciarSesion() {

    // Agregar clase de usuario registrado
    document.body.classList.add("registrado");

    // Quitar clase de usuario anonimo 
    document.body.classList.remove("anonimo");

}


function cerrarSesion() {

    // Quitar clase registrado
    document.body.classList.remove("registrado");

    // Agregar clase anonimo
    document.body.classList.add("anonimo");
}



