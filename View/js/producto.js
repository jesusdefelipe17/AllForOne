$( document ).ready(function() {

    var url_string = window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");

    var nombreP;
    var precioP;
    var imagenP;
    var idP;

    $.ajax({
        url : '../Controller/redireccion.php',
        type : 'POST',
        data: { id: id , accion:'productoDetail'},
        dataType : 'json',
        success : function(json) {

            var nombreProducto = document.getElementById("nombreProducto");
            var precioProducto = document.getElementById("precioProducto");
            var descripcionProducto = document.getElementById("descripcionProducto");
            var colorProducto = document.getElementById("colorProducto");
            var imagenProducto = document.getElementById("imagenProducto");
            var imgRotada1 = document.getElementById("imgRotada1");
            var imgRotada2 = document.getElementById("imgRotada2");
            var imgRotada3 = document.getElementById("imgRotada3");
            var imgRotada4 = document.getElementById("imgRotada4");
            var botonCarrito = document.getElementById("botonCarrito");
            

            for (var valor of json) {
              



                
                $( '<h3 class="title mb-3">'+valor.nombreProducto+'</h3>' ).html(valor.html).appendTo(nombreProducto);
                $( ' <span class="currency"></span><span class="text-dark text-uppercase font-weight-bold">'+valor.precioProducto+'&euro;</span>' ).html(valor.html).appendTo(precioProducto);
                $( ' <p>'+valor.descripcionProducto+'</p>' ).html(valor.html).appendTo(descripcionProducto);
                $( ' <p>'+valor.colorProducto+'</p>' ).html(valor.html).appendTo(colorProducto);
                $( '  <img src="data:image/jpg;base64,'+valor.imagenProducto+'"></img>' ).html(valor.html).appendTo(imagenProducto);
                $( '  <img src="data:image/jpg;base64,'+valor.imagenProducto+'" id="rot1"></img>' ).html(valor.html).appendTo(imgRotada1);
                $( '  <img src="data:image/jpg;base64,'+valor.imagenProducto+'" id="rot2"></img>' ).html(valor.html).appendTo(imgRotada2);
                $( '  <img src="data:image/jpg;base64,'+valor.imagenProducto+'" id="rot3"></img>' ).html(valor.html).appendTo(imgRotada3);
                $( '  <img src="data:image/jpg;base64,'+valor.imagenProducto+'" id="rot4"></img>' ).html(valor.html).appendTo(imgRotada4);

                if (valor.cantidadProducto <= 0) {
                    $( '  <a href="#" class="btn btn-lg btn-outline-primary text-uppercase" style="margin-top: 3%;"> AGOTADO</a>' ).html(valor.html).appendTo(botonCarrito);

                }else{
                    $( '  <a href="#" class="btn btn-lg btn-outline-primary text-uppercase" style="margin-top: 3%;" onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto + ')" > <i class="fa fa-shopping-cart"></i> A&ntilde;ade al carrito</a>' ).html(valor.html).appendTo(botonCarrito);
                }
               
                document.getElementById('rot1').style.transform = 'rotate(' + 0 + 'deg)';
                document.getElementById('rot2').style.transform = 'rotate(' + 60 + 'deg)';
                document.getElementById('rot3').style.transform = 'rotate(' + 120 + 'deg)';
                document.getElementById('rot4').style.transform = 'rotate(' + 180 + 'deg)';
                
            
            }
            
  
        },
        error : function(jqXHR, status, error) {
           
        }
    });

    

    $.ajax({
        url : '../Controller/redireccion.php',
        type : 'POST',
        data: { barato: 200, accion:'listarProductosBaratos'},
        dataType : 'json',
        success : function(json) {

            var productos = document.getElementById("baratoWeb");

            for (var valor of json) {

                if (valor.cantidadProducto <= 0) {
                    $(' <div class="col-6 col-md-6 col-lg-4" style="margin-top:3%;">' +
                        '<div class="card" style="height: 100%;">' +
                        '<div class="d-flex justify-content-between align-items-center">' +
                        ' <div > <i class="fa fa-clock-o"></i> </div> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Emoji_u1f525.svg/1200px-Emoji_u1f525.svg.png" width="30">' +
                        '</div>' +
                        ' <div class="text-center"> <a href="producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
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
                        ' <div class="text-center"> <a href="producto.html?id=' + valor.idProducto + '"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="50%"> </a></div>' +
                        '<div class="text-center">' +
                        ' <h5>' + valor.nombreProducto + '</h5> <span class="text-uppercase font-weight-bold" style="margin-right:5%; margin-left:5%;" >' + valor.precioProducto + '&euro;</span>' +
                        '<button class="buy font-weight-bold pl-5 pr-5 py-2 border-0"  onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto +')" >  <i class="fa fa-shopping-cart"></i> </button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(productos);
                }

            }
            
  
        },
        error : function(jqXHR, status, error) {
        
        }
    });

    controllLogin();
   

});
window.addEventListener("resize", displayWindowSize);
displayWindowSize();


function displayWindowSize(){
    // Get width and height of the window excluding scrollbars
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    
    
    if(screen.width<768){
        if(document.getElementById("borde_derecho")!=null){
            document.getElementById("borde_derecho").className = "col-sm-5";
            document.getElementById("linea").className = "card-body p-5 border-top";

        }
       
       
    }else{
        if(document.getElementById("borde_derecho")!=null){
            document.getElementById("borde_derecho").className = "col-sm-5 border-right";
            document.getElementById("linea").className = "card-body p-5";

        }
       

        
    }
    
}

function controllLogin() {

    var usuario = window.sessionStorage.getItem("usuario");
    

    if (usuario == null) {
        $('#perfil').remove();
        $('#carrito').remove();
       
       
        var perfil = document.getElementById("perfil");
        $('#login').html('<a href="login.html" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="perfil">Login</a>')
            .appendTo(perfil)

    } else {
        var logout = document.getElementById("navB");
    
        $('<li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="logout" onclick="hacerLogout();">LogOut</a></li>').appendTo(logout);
    
      }
    }
    
    
    function hacerLogout() {
    
        sessionStorage.clear();
      window.location.href = 'login.html';
    }