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

$(document).ready(function () {
  $.get('http://fakestoreapi.com/products', function (data) {
    var productList = $('#product-list');

    var row = $('<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"></div>');
    productList.append(row);

    data.forEach(function (product, index) {
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
      cardColumn.append(image);
      cardColumn.append(card);
      row.append(cardColumn);
    });
  });
});

function formatPrice(price) {
  return '$' + price.toFixed(2);
}

function formatDescription(description) {
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

//////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  // Configurar validación del formulario de bodega
  $("#formulario-bodega").validate({
    rules: {
      selectCantidad: {
        required: true,
        number: true,
        min: 1
      }
    },
    messages: {
      selectCantidad: {
        required: "Por favor, ingresa una cantidad.",
        number: "Por favor, ingresa un número válido.",
        min: "La cantidad debe ser mayor a 0."
      }
    },
    errorClass: "is-invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
    submitHandler: function (form) {
      alert("Formulario válido y listo para ser enviado!");
      form.submit();
    }
  });

  // Agregar el controlador de eventos para el clic en el botón #btnAgregar
  $("#btnAgregar").click(function () {
    if ($("#formulario-bodega").valid()) {
      $("#formulario-bodega").submit();
    }
  });

  // Configurar validación del formulario de ingreso
  $("#formulario-ingresar").validate({
    rules: {
      cuenta: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 8
      }
    },
    messages: {
      cuenta: {
        required: "Por favor, ingresa tu cuenta.",
        email: "Por favor, ingresa un correo electrónico válido."
      },
      password: {
        required: "Por favor, ingresa tu contraseña.",
        minlength: "La contraseña debe tener al menos 8 caracteres."
      }
    },
    errorClass: "is-invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
    submitHandler: function (form) {
      alert("Inicio de sesión exitoso!");
      form.submit();
    }
  });

  // Agregar el controlador de eventos para el clic en el botón de ingresar
  $(".btnIngresar").click(function () {
    if ($("#formulario-ingresar").valid()) {
      $("#formulario-ingresar").submit();
    }
  });


  $.validator.addMethod("rutChileno", function (value, element) {
    // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
    var rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(value)) {
      return false;
    }

    // Validar el dígito verificador
    var rutSinGuion = value.replace("-", "");
    var rut = rutSinGuion.slice(0, -1);
    var dv = rutSinGuion.slice(-1);
    var factor = 2;
    var sum = 0;
    for (var i = rut.length - 1; i >= 0; i--) {
      sum += parseInt(rut.charAt(i)) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    var dvCalculado = 11 - (sum % 11);
    dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

    return dv === dvCalculado;
  }, "El RUT no es válido (escriba sin puntos y con guión)");
  $.validator.addMethod("emailCompleto", function (value, element) {
    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);
  }, 'El formato del correo no es válido');
  $.validator.addMethod("soloLetras", function (value, element) {
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
  }, "Sólo se permiten letras y espacios en blanco.");
  document.getElementById('rut').addEventListener('keyup', function (e) {
    e.target.value = e.target.value.toUpperCase();
  });

  $("#formulario-registro").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true
      },
      nombre: {
        required: true,
        soloLetras: true
      },
      apellidos: {
        required: true,
        soloLetras: true
      },
      correo: {
        required: true,
        emailCompleto: true,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 15,
      },
      password2: {
        required: true,
        minlength: 5,
        maxlength: 15,
        equalTo: "password",
      },
      direccion: {
        required: true
      },
    },
    messages: {
      rut: {
        required: "El RUT es un campo requerido",
        rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
      },
      nombre: {
        required: "El nombre es un campo requerido",
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
      },
      apellidos: {
        required: "Los apellidos son un campo requerido",
        soloLetras: "Los apellidos sólo pueden contener letras y espacios en blanco",
      },
      correo: {
        required: "El correo es un campo requerido",
        email: "El formato del correo no es válido",
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      password2: {
        required: "Repetir contraseña es un campo requerido",
        minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
        equalTo: "Debe repetir la contraseña escrita anteriormente",
      },
      direccion: {
        required: "Dirección es un campo requerido",
      },
    },
    errorClass: "is-invalid", // Clase CSS para estilizar los errores
    errorElement: "div", // Elemento HTML en el que se mostrará el mensaje de error
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },
    submitHandler: function (form) {
      // Handle form submission here
      form.submit();
    }
  });


});
