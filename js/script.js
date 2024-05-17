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
        var productList = $('#product-list');

        var row = $('<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"></div>');
        productList.append(row);

        data.forEach(function(product, index) {
            var formattedPrice = formatPrice(product.price);
            var formattedDescription = formatDescription(product.description);

            var cardColumn = $('<div class="col"></div>');
            var card = $('<div class="card"></div>');
            var image = $('<img class="card-img-top" src="' + product.image + '" alt="' + product.title + '">');
            var cardBody = $('<div class="card-body"></div>');
            var title = $('<h5 class="card-title">' + product.title + '</h5>');
            var description = $('<p class="card-text">' + formattedDescription + '</p>');
            var price = $('<p class="card-price">' + formattedPrice + '</p>');
            var button = $('<a href="#" class="btn btn-primary">Ver</a>');

            cardBody.append(title);
            cardBody.append(description);
            cardBody.append(price);
            cardBody.append(button);
            card.append(cardBody);
            cardColumn.append(image); // Mueve la imagen dentro de la columna de la tarjeta
            cardColumn.append(card);
            row.append(cardColumn);
        });
    });
});

function formatPrice(price) {
    // Formatear el precio según tus necesidades
    return '$' + price.toFixed(2);
}

function formatDescription(description) {
    // Formatear la descripción según tus necesidades
    return description.substring(0, 100) + '...';
}

fetch('http://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const cardsContainer = document.getElementById('cards-container');
        
        data.forEach(product => {
          const card = document.createElement('div');
          card.className = 'card';

          const image = document.createElement('img');
          image.src = product.image;
          card.appendChild(image);

          const title = document.createElement('h3');
          title.textContent = product.title;
          card.appendChild(title);

          const price = document.createElement('p');
          price.textContent = `$${product.price}`;
          card.appendChild(price);

          cardsContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error:', error));

      $(document).ready(function() {
        $("#formRegistro").submit(function(event) {
          event.preventDefault();
          var form = $(this);
          var isValid = true;
      
          // Validación del campo "Nombres"
          var nombres = $("#nombre").val();
          if (nombres.trim() === "") {
            isValid = false;
            $("#nombre").addClass("is-invalid");
          } else {
            $("#nombre").removeClass("is-invalid");
          }
      
          // Validación del campo "Apellidos"
          var apellidos = $("#apellidos").val();
          if (apellidos.trim() === "") {
            isValid = false;
            $("#apellidos").addClass("is-invalid");
          } else {
            $("#apellidos").removeClass("is-invalid");
          }
      
          // Validación del campo "Rut"
          var rut = $("#rut").val();
          if (rut.trim() === "") {
            isValid = false;
            $("#rut").addClass("is-invalid");
          } else {
            $("#rut").removeClass("is-invalid");
          }
      
          // Validación del campo "Email"
          var email = $("#email").val();
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (email.trim() === "" || !emailPattern.test(email)) {
            isValid = false;
            $("#email").addClass("is-invalid");
          } else {
            $("#email").removeClass("is-invalid");
          }
      
          // Validación del campo "Contraseña"
          var password = $("#password").val();
          var passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          if (password.trim() === "" || !passwordPattern.test(password)) {
            isValid = false;
            $("#password").addClass("is-invalid");
          } else {
            $("#password").removeClass("is-invalid");
          }
      
          // Validación del campo "Repetir contraseña"
          var password2 = $("#password2").val();
          if (password2.trim() === "" || password2 !== password) {
            isValid = false;
            $("#password2").addClass("is-invalid");
          } else {
            $("#password2").removeClass("is-invalid");
          }
      
          // Validación del campo "Dirección"
          var direccion = $("#direccion").val();
          if (direccion.trim() === "") {
            isValid = false;
            $("#direccion").addClass("is-invalid");
          } else {
            $("#direccion").removeClass("is-invalid");
          }
      
          // Validación del campo "Imagen de perfil"
          var imagenPerfil = $("#imagenPerfil").val();
          if (imagenPerfil.trim() === "") {
            isValid = false;
            $("#imagenPerfil").addClass("is-invalid");
          } else {
            $("#imagenPerfil").removeClass("is-invalid");
          }
      
          if (isValid) {
            // El formulario es válido, puedes realizar acciones adicionales aquí
            alert("Formulario válido");
          } else {
            // El formulario no es válido, puedes mostrar mensajes de error o realizar otras acciones
            alert("Formulario inválido");
          }
      
          form.addClass("was-validated");
        });
      });



      

      function validarRut(rut) {
        rut = rut.replace(/[^\dkK]/g, ''); // Eliminar caracteres no válidos
        if (rut.length < 2) {
          return false; // Rut inválido si es muy corto
        }
        
        var cuerpo = rut.slice(0, -1); // Obtener el cuerpo del rut (sin el dígito verificador)
        var dv = rut.slice(-1).toUpperCase(); // Obtener el dígito verificador (último caracter, convertido a mayúscula)
        
        var suma = 0;
        var multiplicador = 2;
        for (var i = cuerpo.length - 1; i >= 0; i--) {
          suma += parseInt(cuerpo.charAt(i)) * multiplicador;
          multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        
        var resultado = 11 - (suma % 11);
        var digitoVerificadorCalculado = resultado === 11 ? '0' : resultado === 10 ? 'K' : resultado.toString();
        
        return dv === digitoVerificadorCalculado;
      }