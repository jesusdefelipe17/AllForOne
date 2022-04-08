$(document).ready(function () {

  controlURL();

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 10) {

      $('.navbar').addClass('bg-light');
    } else {
      $('.navbar').removeClass('bg-light');
    }
  });

  var url_string = window.location.href
  var url = new URL(url_string);

 
  var error_pagar_balance = url.searchParams.get("error_pagar_balance");
  
 
  if(error_pagar_balance!=null){
    Swal.fire({
      title: 'Balance insuficiente.Intenta otro metodo de pago',
     
      confirmButtonText: 'OK',
     
    }).then((result) => {
      
      if (result.isConfirmed) {
      
      } 
    })
  }



  var carrito = window.sessionStorage.getItem("carrito");
  var usuario = window.sessionStorage.getItem("usuario");

  var objUsuario = JSON.parse(usuario);



 

  var precioPorEth = window.sessionStorage.getItem("precioPorEth");

 


  if (carrito != null || carrito != undefined) {



    var arrayCarrito = JSON.parse(carrito);

    var precioTotal = 0;

    var tableBody = document.getElementById("carrito");

    $(' <div class="container">' +
      '<div class="row">' +
      '<div class="text-center col-3 text-uppercase font-weight-bold">' +
      ' Item' +
      '</div>' +
      '<div class="text-center col-3 text-uppercase font-weight-bold">' +
      ' Name' +
      '</div>' +
      '<div class="text-center col-3 text-uppercase font-weight-bold">' +
      ' QTY' +
      '</div>' +
      '<div class="text-center col-3 text-uppercase font-weight-bold">' +
      '  &euro;' +
      ' </div>' +
      ' </div>' +
      '</div>' +
      '<hr> '
    ).appendTo(tableBody);

    for (let index = 0; index < arrayCarrito.length; index++) {

      


      precioTotal = precioTotal + (arrayCarrito[index].cantidad * arrayCarrito[index].precioProducto);

      var precioCantidad = (arrayCarrito[index].cantidad * arrayCarrito[index].precioProducto);






      $(
        '<div class="row">' +
        ' <div class="col-3 text-center">' +
        '<img src="data:image/jpg;base64,' + arrayCarrito[index].imagenProducto + '" height="" width="100%">' +
        '</div>' +
        '<div class="col-3 text-center">' +
        '<h6>' + arrayCarrito[index].nombreProducto + '</h6>' +
        '</div>' +
        '<div class="col-3 text-center">' +
        '<h6>' + arrayCarrito[index].cantidad + '</h6>' +
        ' </div>' +
        '<div class="col-3 text-center">' +
        '<span class="text-uppercase font-weight-bold">' + precioCantidad + '&euro;</span>' +
        '<button type="button" class="close" aria-label="Close" onclick="eliminarCarrito(' + arrayCarrito[index].idProducto + ');"><span aria-hidden="true">&times;</span> </button>' +
        ' </div>' +
        ' </div>' +
        '<hr> '
      ).appendTo(tableBody);


    }


    $(
      '<div class="col-12 text-right">' +
      '<span>Total &euro; : </span>' +
      '<strong id="pTotal">' + precioTotal.toFixed(2) + '&euro;</strong>' +
      ' </div>'

    ).appendTo(tableBody);


    var cantidadProductos = document.getElementById("cantidadProductos");


    $('<span class="badge badge-secondary badge-pill">' + arrayCarrito.length + '</span>'
    ).appendTo(cantidadProductos);



    if (arrayCarrito.length == 0) {

    } else {

      var pay = document.getElementById("pay");

      $(' <div>' +
        '<img src="imagenes/payETH.jpg" onclick="pagarEthereum(' + precioTotal.toFixed(2) + ');"  id="payEthereum" width=280" height="100">' +
        '<div id="status"></div>' +
        '</div>'
      ).appendTo(pay);


      var pagarBalance = document.getElementById("pagarBalance");

      $(' <div>' +
        '<img src="imagenes/balance.png" onclick="pagarBalance(' + objUsuario.id + ',' + precioTotal.toFixed(2) + ',' + precioPorEth + ');"  id="payBalance" width=300" height="100">' +

        '<div id="status"></div>' +
        '</div>' +
        '</br>'
      ).appendTo(pagarBalance);

      var validatePaypal = document.getElementById("validePaypal");

      $(' <div>' +
        '<img src="imagenes/paypal.png" onclick="paypalPagar();" id="paypalValidate"   width=300" height="100">' +

        '</div>' +
        '</br>'
      ).appendTo(validatePaypal);


    }







    const CLIENT = 'AXVh-koQ0Pxkzsxyyenm2x8BzbChIz4GExaFHoao10gjuKSUKFGTzkAIlfM7oPnCVU-xinp6U3ZZhtXT';
    const SECRET = 'EMtWpR-RRqY6-EE7GYs9PkUK3Konmj7iMDwU2pgwPNlWhVaVfYFaZegThJwraEZuGsvbwNQw0jOlUEas';
    const API_PAYPAL = 'https://api-m.sandbox.paypal.com';
    const AUTH = { user: CLIENT, pass: SECRET };

    paypal.Button.render({
      env: 'sandbox', // sandbox | production
      style: {
        label: 'checkout',  // checkout | credit | pay | buynow | generic
        size: 'medium', // small | medium | large | responsive
        shape: 'pill',   // pill | rect
        color: 'blue'   // gold | blue | silver | black
      },

      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create

      client: {
        sandbox: CLIENT,
        production: SECRET
      },


      payment: function (data, actions) {


        return actions.payment.create({
          payment: {
            transactions: [
              {
                amount: { total: precioTotal.toFixed(2), currency: 'EUR' },
                description: "Compra de productos a AllForOne : " + precioTotal.toFixed(2) + "&euro;",
                custom: "Codigo"
              }
            ]
          }
        });


      },

      // Wait for the payment to be authorized by the customer

      onAuthorize: function (data, actions) {

        var carrito = window.sessionStorage.getItem("carrito");

        var arrayCarrito = JSON.parse(carrito);

        var arrayIds = [];
        var arrayCantidades = [];

        for (let index = 0; index < arrayCarrito.length; index++) {

          arrayIds.push(arrayCarrito[index].idProducto);
          arrayCantidades.push(arrayCarrito[index].cantidad);

        }

        var precioeth = window.sessionStorage.getItem("precioPorEth");
        var precioPorEth = JSON.parse(precioeth);


        return actions.payment.execute().then(function () {

          var nombre = document.getElementById("nombre").value;
          var direccion = document.getElementById("direccion").value;
          var ciudad = document.getElementById("ciudad").value;
          var provincia = document.getElementById("provincia").value;
          var codigoPostal = document.getElementById("codigoPostal").value;

          

          document.getElementById("paypal-button-container").remove();
          window.sessionStorage.removeItem('carrito');

         
          window.location = "../Controller/redireccion.php?paymentToken=" + data.paymentToken + "&paymentID=" + data.paymentID + "&accion=pagarPaypal" +
            "&nombre=" + nombre + "&direccion=" + direccion + "&ciudad=" + ciudad + "&provincia=" + provincia + "&codigoPostal=" + codigoPostal + "&ids=" + arrayIds + "&cantidades=" + arrayCantidades + "&idUsuario=" + objUsuario['id'] + "&precioPorETH=" + precioPorEth + "";



        });
      }

    }, '#paypal-button-container');

  } else {
    document.getElementById("paypal-button-container").remove();
    //document.getElementById("paypalValidate").style.display = "none";
    //document.getElementById("payBalance").style.display = "none";
    //document.getElementById("payEthereum").style.display = "none";
  }



  controllLogin();





});

function paypalPagar() {
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {

      if (!form.checkValidity()) {

      
        form.classList.add('was-validated')

      } else {

        document.getElementById("paypal-button-container").style.display = "inline";
        document.getElementById("paypal-button-container").style.width = '200px';
        document.getElementById("paypalValidate").style.display = "none";

        form.classList.add('was-validated')
        document.getElementById("nombre").disabled = true;
        document.getElementById("apellidos").disabled = true;
        document.getElementById("direccion").disabled = true;
        document.getElementById("direccion2").disabled = true;
        document.getElementById("ciudad").disabled = true;
        document.getElementById("provincia").disabled = true;
        document.getElementById("codigoPostal").disabled = true;

        Swal.fire({

          icon: 'success',
          title: 'Datos validados, puedes pagar con PayPal',
          showConfirmButton: false
        })


        document.getElementById("payBalance").style.display = "none";
        document.getElementById("payEthereum").style.display = "none";

      }


    })

}


function pagarEthereum(pTotal) {


  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {

      if (!form.checkValidity()) {

       
        form.classList.add('was-validated')
      } else {

        form.classList.add('was-validated')
        var usuario = window.sessionStorage.getItem("usuario");
        var objUsuario = JSON.parse(usuario);


        // https://api.coingecko.com/api/v3/coins/bitcoin?tickers=false&market_data=true

        $.ajax({
          url: 'https://api.coingecko.com/api/v3/coins/ethereum?tickers=false&market_data=true',
          type: 'GET',
          dataType: 'json',
          success: function (json) {

            if (pTotal < 20 && pTotal > 0) {


              Swal.fire({
                icon: 'error',
                title: 'Error al pagar',
                text: 'Para poder pagar con Ethereum, es necesario que el precio sea mayor a 20 euros'
              })

            } else if (pTotal == 0 || pTotal < 0) {

              Swal.fire({
                icon: 'error',
                title: 'Error al pagar',
                text: 'Primero debes tener productos que comprar'
              })

            } else {
              var precioPorEth = 1 / json.market_data.current_price.eur;
              pEther = (pTotal) / json.market_data.current_price.eur;

             

              if (typeof window.ethereum !== 'undefined') {


                ethereum
                  .request({ method: 'eth_requestAccounts' })
                  .then((result) => {
                    // paymentAddress is where funds will be send to
                    const paymentAddress = '0x067B2B29095401aA5e88C57a3eFf69c26De1c1b7'
                    const amountEth = pEther;

                    web3.eth.sendTransaction({
                      to: paymentAddress,
                      value: web3.toWei(amountEth, 'ether')
                    }, (err, transactionId) => {
                      if (err) {
                     
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al pagar',
                          text: 'Has cancelado el pago. No se cobro nada'
                        })

                      } else {
                      

                        var carrito = window.sessionStorage.getItem("carrito");

                        var arrayCarrito = JSON.parse(carrito);

                        var arrayIds = [];
                        var arrayCantidades = [];

                        for (let index = 0; index < arrayCarrito.length; index++) {

                          arrayIds.push(arrayCarrito[index].idProducto);
                          arrayCantidades.push(arrayCarrito[index].cantidad);
                        }

                        var nombre = document.getElementById("nombre").value;
                        var direccion = document.getElementById("direccion").value;
                        var ciudad = document.getElementById("ciudad").value;
                        var provincia = document.getElementById("provincia").value;
                        var codigoPostal = document.getElementById("codigoPostal").value;

                        window.sessionStorage.removeItem('carrito');

                        window.location = "../Controller/redireccion.php?idTransaccion=" + transactionId + "&precio=" + pTotal + "&accion=pagarEthereum" +
                          "&nombre=" + nombre + "&direccion=" + direccion + "&ciudad=" + ciudad + "&provincia=" + provincia + "&codigoPostal=" + codigoPostal + "&ids=" + arrayIds + "&cantidades=" + arrayCantidades + "&idUsuario=" + objUsuario['id'] + "&precioPorETH=" + precioPorEth + "";


                      }
                    })

                  })
                  .catch((err) => {
                    if (err.code === 4001) {
                      // EIP-1193 userRejectedRequest error
                      // If this happens, the user rejected the connection request.
                    
                    } else {
                      
                    }
                  });


              } else {
               
                Swal.fire({
                  icon: 'error',
                  title: 'No tienes instalado Metamask',
                  text: 'Para poder pagar con Ethereum, es necesario tener instalada la aplicacion de MetaMask'
                })
              }

            }





          },
          error: function (jqXHR, status, error) {
            Swal.fire({
              icon: 'error',
              title: 'Error de conexion',
              text: 'No se te ha cobrado nada. Vuelve a intentarlo'
            })
          }
        });


      }

    })






}

function pagarBalance(idUsuario, precioTotal, precioPorEth) {



  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {

      if (!form.checkValidity()) {

       
        form.classList.add('was-validated')
      } else {

        form.classList.add('was-validated')
        var carrito = window.sessionStorage.getItem("carrito");

        var arrayCarrito = JSON.parse(carrito);


        var arrayIds = [];
        var arrayCantidades = [];

        for (let index = 0; index < arrayCarrito.length; index++) {

          arrayIds.push(arrayCarrito[index].idProducto);
          arrayCantidades.push(arrayCarrito[index].cantidad);
        }

        var nombre = document.getElementById("nombre").value;
        var direccion = document.getElementById("direccion").value;
        var ciudad = document.getElementById("ciudad").value;
        var provincia = document.getElementById("provincia").value;
        var codigoPostal = document.getElementById("codigoPostal").value;

        var uniq = 'id-' + (new Date()).getTime();
      

        //window.sessionStorage.removeItem('carrito');

        window.location = "../Controller/redireccion.php?idTransaccion=" + uniq + "&precio=" + precioTotal + "&accion=pagarBalance" +
          "&nombre=" + nombre + "&direccion=" + direccion + "&ciudad=" + ciudad + "&provincia=" + provincia + "&codigoPostal=" + codigoPostal + "&ids=" + arrayIds + "&cantidades=" + arrayCantidades + "&idUsuario=" + idUsuario + "&precioPorETH=" + precioPorEth + "";




      }




    })








  /*
      $.ajax({
        url : '../Controller/redireccion.php',
        type : 'POST',
        data: { idUsuario: idUsuario, accion:'pagarBalance',precioTotal:precioTotal,precioPorEth:precioPorEth},
        dataType : 'json',
        success: function (json) {
  
        
    
          if(json==false){
            Swal.fire({
              icon: 'error',
              title: 'Error de compra',
              text: 'No se tiene el dinero correspondiente'
            })
          
          }
  
          
            
        },
        error : function(jqXHR, status, error) {
          
        }
    });
  
    */

}



function eliminarCarrito(idProducto) {


  var carrito = window.sessionStorage.getItem("carrito");

  var arrayCarrito = JSON.parse(carrito);

  var index = arrayCarrito.findIndex(o => o.idProducto === idProducto);

  arrayCarrito.splice(index, 1);

  window.sessionStorage.setItem("carrito", JSON.stringify(arrayCarrito));



  window.location.href = 'checkout.html';

}


function controllLogin() {

  var usuario = window.sessionStorage.getItem("usuario");
  

  if (usuario == null) {
    $('#perfil').remove();
    $('#carritoo').remove();


    var perfil = document.getElementById("perfil");
    $('#login').html('<a href="login.html" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="perfil">Login</a>')
      .appendTo(perfil)

  }
}

function controlURL() {

  var usuario = window.sessionStorage.getItem("usuario");


  if (usuario == null) {

    window.location.href = 'login.html';
  } else {
    var logout = document.getElementById("navB");

    $('<li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="logout" onclick="hacerLogout();">LogOut</a></li>').appendTo(logout);

  }
}


function hacerLogout() {

  sessionStorage.clear();
  window.location.href = 'login.html';
}