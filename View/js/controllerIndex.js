$(document).ready(function () {
    checkAcceptCookies();


    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/ethereum?tickers=false&market_data=true',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
    
          var precioPorEth = 1 / json.market_data.current_price.eur;
          //alert(precioPorShiba);
          
    
          window.sessionStorage.setItem("precioPorEth", JSON.stringify(precioPorEth));
    
        },
        error: function (jqXHR, status, error) {
          
        }
      });
    //Apartado de pcs

    $.ajax({
        url: 'Controller/redireccion.php',
        type: 'POST',
        data: { categoria: 'ordenador', accion: 'listarProductosCategoria' },
        dataType: 'json',
        success: function (json) {

            var productos = document.getElementById("carta1");




            for (var valor of json) {

                if (valor.cantidadProducto <= 0) {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-2 pr-2 py-2 border-0" >AGOTADO</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);

                } else {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-5 pr-5 py-2 border-0"  onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto +',\''+"index"+'\')" >  <i class="fa fa-shopping-cart"></i> </button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);
                }

            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });



    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 10) {

            $('.navbar').addClass('bg-light');
        } else {
            $('.navbar').removeClass('bg-light');
        }
    });

    //Apartado de android


    $.ajax({
        url: 'Controller/redireccion.php',
        type: 'POST',
        data: { categoria: 'android', accion: 'listarProductosCategoria' },
        dataType: 'json',
        success: function (json) {

            var productos = document.getElementById("carta2");

            for (var valor of json) {

                if (valor.cantidadProducto <= 0) {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-2 pr-2 py-2 border-0" >AGOTADO</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);

                } else {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-5 pr-5 py-2 border-0"  onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto +',\''+"index"+'\')" >  <i class="fa fa-shopping-cart"></i> </button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);
                }



            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });

    //Apartado de apple

    $.ajax({
        url: 'Controller/redireccion.php',
        type: 'POST',
        data: { categoria: 'apple', accion: 'listarProductosCategoria' },
        dataType: 'json',
        success: function (json) {

            var productos = document.getElementById("carta3");

            for (var valor of json) {

                if (valor.cantidadProducto <= 0) {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-2 pr-2 py-2 border-0" >AGOTADO</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);

                } else {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-5 pr-5 py-2 border-0"  onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto +',\''+"index"+'\')" >  <i class="fa fa-shopping-cart"></i> </button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);
                }





            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });


    //Apartado de informatica

    $.ajax({
        url: 'Controller/redireccion.php',
        type: 'POST',
        data: { categoria: 'informatica', accion: 'listarProductosCategoria' },
        dataType: 'json',
        success: function (json) {

            var productos = document.getElementById("carta4");

            for (var valor of json) {

                if (valor.cantidadProducto <= 0) {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-2 pr-2 py-2 border-0" >AGOTADO</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);

                } else {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-5 pr-5 py-2 border-0"  onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto +',\''+"index"+'\')" >  <i class="fa fa-shopping-cart"></i> </button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);
                }





            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });


    //RECOMENDADOS SQL

    $.ajax({
        url: 'Controller/redireccion.php',
        type: 'POST',
        data: { barato: 50, accion: 'listarProductosBaratos' },
        dataType: 'json',
        success: function (json) {

            var productos = document.getElementById("baratoWeb");

            for (var valor of json) {

                if (valor.cantidadProducto <= 0) {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-2 pr-2 py-2 border-0" >AGOTADO</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);

                } else {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="View/producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-5 pr-5 py-2 border-0"  onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto +',\''+"index"+'\')" >  <i class="fa fa-shopping-cart"></i> </button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);
                }




            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });


    controllLogin();




});

function controllLogin() {

    var usuario = window.sessionStorage.getItem("usuario");


    if (usuario == null) {
        $('#perfil').remove();
        $('#carrito').remove();
       
      
        var perfil = document.getElementById("perfil");
        $('#login').html('<a href="View/login.html" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="perfil">Login</a>').appendTo(perfil)

       
       
    }else{
        var logout = document.getElementById("navB");

        $('<li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="logout" onclick="hacerLogout();">LogOut</a></li>').appendTo(logout);
        
    }
}


function hacerLogout(){
   
    sessionStorage.clear();
    window.location.href = 'View/login.html';
}

function checkAcceptCookies() {
    if (localStorage.acceptCookies == 'true') {} else {
        $('#div-cookies').show();
    }
}

function acceptCookies() {
    localStorage.acceptCookies = 'true';
    $('#div-cookies').hide();
}