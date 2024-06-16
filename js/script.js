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
        required: true
      }
    },
    messages: {
      cuenta: {
        required: "Por favor, ingresa tu cuenta.",
        email: "Por favor, ingresa un correo electrónico válido."
      },
      password: {
        required: "Por favor, ingresa tu contraseña."
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


  $("#formProductos").validate({
    rules: {
      id: {
        required: true,
        digits: true
      },
      nombre: {
        required: true,
        minlength: 2
      },
      descripcion: {
        required: true,
        minlength: 10
      },
      precio: {
        required: true,
        number: true,
        min: 0
      },
      descuentoSub: {
        required: true,
        number: true,
        min: 0,
        max: 100
      },
      descuentoOferta: {
        required: true,
        number: true,
        min: 0,
        max: 100
      }
    },
    messages: {
      id: {
        required: "Por favor, ingresa el ID del producto.",
        digits: "El ID debe ser un número entero."
      },
      nombre: {
        required: "Por favor, ingresa el nombre del producto.",
        minlength: "El nombre debe tener al menos 2 caracteres."
      },
      descripcion: {
        required: "Por favor, ingresa una descripción del producto.",
        minlength: "La descripción debe tener al menos 10 caracteres."
      },
      precio: {
        required: "Por favor, ingresa el precio del producto.",
        number: "El precio debe ser un número válido.",
        min: "El precio debe ser mayor o igual a 0."
      },
      descuentoSub: {
        required: "Por favor, ingresa el descuento de suscripción.",
        number: "El descuento debe ser un número válido.",
        min: "El descuento debe ser mayor o igual a 0.",
        max: "El descuento no puede ser mayor a 100."
      },
      descuentoOferta: {
        required: "Por favor, ingresa el descuento de oferta.",
        number: "El descuento debe ser un número válido.",
        min: "El descuento debe ser mayor o igual a 0.",
        max: "El descuento no puede ser mayor a 100."
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


  $("#formUsuarios").validate({
    rules: {
        id: {
            required: true,
            digits: true
        },
        tipoUsuario: {
            required: true
        },
        rut: {
            required: true,
            minlength: 8
        },
        nombres: {
            required: true,
            minlength: 2
        },
        apellidos: {
            required: true,
            minlength: 2
        },
        correo: {
            required: true,
            email: true
        },
        direccion: {
            required: true,
            minlength: 10
        },
        contrasena: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        id: {
            required: "Por favor, ingresa el ID del usuario.",
            digits: "El ID debe ser un número entero."
        },
        tipoUsuario: {
            required: "Por favor, selecciona el tipo de usuario."
        },
        rut: {
            required: "Por favor, ingresa el Rut.",
            minlength: "El Rut debe tener al menos 8 caracteres."
        },
        nombres: {
            required: "Por favor, ingresa los nombres.",
            minlength: "Los nombres deben tener al menos 2 caracteres."
        },
        apellidos: {
            required: "Por favor, ingresa los apellidos.",
            minlength: "Los apellidos deben tener al menos 2 caracteres."
        },
        correo: {
            required: "Por favor, ingresa el correo electrónico.",
            email: "Por favor, ingresa un correo electrónico válido."
        },
        direccion: {
            required: "Por favor, ingresa la dirección.",
            minlength: "La dirección debe tener al menos 10 caracteres."
        },
        contrasena: {
            required: "Por favor, ingresa la contraseña.",
            minlength: "La contraseña debe tener al menos 6 caracteres."
        }
    },
    errorClass: "is-invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
        error.addClass("invalid-feedback");
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.next("label"));
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        if ($(element).prop("type") === "radio") {
            $(element).closest(".form-check").addClass(errorClass);
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
        if ($(element).prop("type") === "radio") {
            $(element).closest(".form-check").removeClass(errorClass);
        }
    },
    submitHandler: function (form) {
        alert("Formulario válido y listo para ser enviado!");
        form.submit();
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
