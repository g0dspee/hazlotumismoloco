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

//Footer

if (document.getElementById('footer')) {

    fetch('footer.html').then(response => {

        return response.text();

    }).then(htmlContent => {

        document.getElementById('footer').innerHTML = htmlContent;

        window.scrollTo(0, 0);

    });

};

//API

$(document).ready(function() {
    $.get('http://fakestoreapi.com/products', function(data) {
        const productContainer = $('#product-list');
        data.forEach(function(product) {
            const li = $('<li>');
            const img = $('<img>').attr('src', product.image).attr('alt', product.title).addClass('product-image');
            const title = $('<span>').text(product.title);
            li.append(img, title);
            productContainer.append(li);
        });
    }).fail(function(error) {
        console.log('Error:', error);
    });
});


