$(document).ready(function () {

    controlURL();
    var usuario = window.sessionStorage.getItem("usuario");
    var obj = JSON.parse(usuario);


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


    if (obj['idPermisos'] == 1) {

        document.getElementById("pedidosProcesandoUsuario").style.display = 'none';
        document.getElementById("pedidoEnviadoRecibidoUsuario").style.display = 'none';


    } else {

        document.getElementById("menu1").style.display = 'none';
        document.getElementById("anadirProductos").style.display = 'none';
        document.getElementById("pedidosParaProcesar").style.display = 'none';
        document.getElementById("mostrarProductos").style.display = 'none';
        document.getElementById("mostrarUsuarios").style.display = 'none';
    }

    var url_string = window.location.href
    var url = new URL(url_string);
    var paginaId = url.searchParams.get("pagina");
    if (paginaId == null) {

        url_string = window.location.href = "?pagina=1";
        var url = new URL(url_string);
        var paginaId = url.searchParams.get("pagina");

    }
    //imagen del perfil 

    var imagenPerfil = document.getElementById("imagenPerfil");

    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/ethereum?tickers=false&market_data=true',
        type: 'GET',
        dataType: 'json',
        success: function (json) {

            var precioPorEther = json.market_data.current_price.eur;
            //alert(precioPorShiba);
            

            window.sessionStorage.setItem("ethereumPrice", JSON.stringify(precioPorEther));

        },
        error: function (jqXHR, status, error) {
            
        }
    });

    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { idUsuario: obj['id'], accion: 'getUser' },
        dataType: 'json',
        success: function (json) {



            sessionStorage.setItem('usuario', JSON.stringify(json));



            var precioeth = window.sessionStorage.getItem("ethereumPrice");
            var precioPorEther = JSON.parse(precioeth);


            if (json.imagenUsuario == null || json.imagenUsuario == "") {

                var redondeoBalance = parseFloat(json.balance).toFixed(5);

                var precioEuros = json.balance * precioPorEther;
                var precioEurosRedondeo = precioEuros.toFixed(3);
                $('<img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110"></img>' +
                    '<div class="mt-3">' +
                    ' <div>' +
                    '<h4>' + json.nombre + '</h4>' +
                    '<h6>Balance: ' + redondeoBalance + ' ETH<img src="imagenes/eth.png" alt="Admin" " width="20"></h6>' +
                    '<h6>Dinero: ' + precioEurosRedondeo + ' &euro;</h6>' +
                    '</div>' +

                    ' </div>'
                ).appendTo(imagenPerfil);


            } else {

                var redondeoBalance = parseFloat(json.balance).toFixed(5);

                var precioEuros = json.balance * precioPorEther;
                var precioEurosRedondeo = precioEuros.toFixed(3);

                $('  <img src="data:image/jpg;base64,' + json.imagenUsuario + '" alt="Admin" class="rounded-circle p-1 bg-primary" width="110"></img>' +
                    '<div class="mt-3">' +
                    ' <div>' +
                    '<h4>' + json.nombre + '</h4>' +
                    '<h6>Balance: ' + redondeoBalance + ' ETH<img src="imagenes/eth.png" alt="Admin" " width="20"></h6>' +
                    '<h6>Dinero: ' + precioEurosRedondeo + ' &euro;</h6>' +
                    '</div>' +

                    ' </div>'
                ).appendTo(imagenPerfil);
            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });







    //Datos del perfil 

    var formularioPerfil = document.getElementById("formularioPerfil");

    $('  <div class="form-group">' +
        ' <label class="col-lg-3 control-label">Nombre:</label>' +
        ' <div class="col-lg-8">' +
        ' <input class="form-control" type="text" value="' + obj.nombre + '" name="nombre" required>' +
        '  </div>' +
        ' </div>' +
        ' <div class="form-group">' +
        '  <label class="col-lg-3 control-label">Imagen:</label>' +
        ' <div class="col-lg-8">' +
        '  <input type="file" class="form-control-file" name="imagen_user" id="imagen_user" accept="image/jpeg" required>' +
        ' </div>' +
        ' </div>' +
        '  <input class="form-control" type="hidden" value="' + obj.email + '" name="email">' +
        '<div class="form-group">' +
        ' <div class="col-lg-8">' +
        ' <button type="submit" class="btn btn-dark">Actualizar datos</button>' +
        '<input type="hidden" name="id" id="accion" value="' + obj.id + '">' +
        ' </div>' +
        '  </div>'
    ).appendTo(formularioPerfil);

    var imagen_user = document.getElementById("imagen_user"); 
    imagen_user.onchange = validarImg;


   function validarImg(){
    var _URL = window.URL || window.webkitURL;
    var file, img;


    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
           

            if(this.width>=256){
                if(this.height>=256){
                      Swal.fire({
                          
                          icon: 'error',
                          title: 'La imagen tiene que ser menor o igual a 250x250',
                          showConfirmButton: false,
                          timer: 1500
                      })

                      document.getElementById('imagen_user').value = "";
              }
            
          }else if(this.height>=256){
              if(this.width>=256){
                  Swal.fire({
                          
                      icon: 'error',
                      title: 'La imagen tiene que ser menor o igual a 250x250',
                      showConfirmButton: false,
                      timer: 1500
                  })
                  document.getElementById('imagen_user').value = "";
              }

          }
        };
        img.onerror = function() {
           
        };
        img.src = _URL.createObjectURL(file);


    }
    }

    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { id: obj['id'], accion: 'contarPedidosProcesarUser', estado: 'procesando' },
        dataType: 'json',
        success: function (json) {



            var paginas;
            for (var valor of json) {

                paginas = valor.paginacion;
            }


            var paginasFinal = paginas / 6;

            paginasFinal = Math.ceil(paginasFinal)

            var paginasDiv = document.getElementById("pagicionPedidosProcesarUser");


            for (let index = 1; index < paginasFinal + 1; index++) {

                $('<li class="page-item"><a class="page-link" href="?pagina=' + index + '" >' + index + '</a></li>').appendTo(paginasDiv);


            }


        },
        error: function (jqXHR, status, error) {
        
        }
    });

    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { paginaId: paginaId, id: obj['id'], accion: 'detallePedidoUsuario', estado: 'procesando' },
        dataType: 'json',
        success: function (json) {


            for (var valor of json) {


                $('<li class="list-group-item d-flex justify-content-between lh-condensed">' +
                    '<div>' +
                    '<div class="row">' +
                    '<img src="imagenes/paquete.png" height="" width="15%" >' +

                    '<h6 style="margin-left:10%; margin-top:5%"><a href="detallePedido.html?idPedido=' + valor.idPedido + '">' + valor.idPedido + '</a></h6>' +
                    '<h6 style="margin-left:15%; margin-top:5%">' + valor.estado + '</h6>' +

                    '</div>' +
                    '</div>' +

                    '</li>'
                ).html(valor.html).appendTo(pedido);

            }






        },
        error: function (jqXHR, status, error) {
            
        }
    });


    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { id: obj['id'], accion: 'contarPedidosProcesarUser', estado: 'enviado/cancelado' },
        dataType: 'json',
        success: function (json) {



            var paginas;
            for (var valor of json) {

                paginas = valor.paginacion;
            }


            var paginasFinal = paginas / 6;

            paginasFinal = Math.ceil(paginasFinal)

            var paginasDiv = document.getElementById("pagicionPedidosEnviadoCanceladoUser");


            for (let index = 1; index < paginasFinal + 1; index++) {

                $('<li class="page-item"><a class="page-link" href="?pagina=' + index + '" >' + index + '</a></li>').appendTo(paginasDiv);


            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });


    var pedidoEnviadoRecibidoCard = document.getElementById("pedidoEnviadoRecibidoCard");

    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { paginaId: paginaId, id: obj['id'], accion: 'detallePedidoUsuarioEnviadoCancelado', estado: 'enviado' },
        dataType: 'json',
        success: function (json) {



            for (var valor of json) {



                $('<li class="list-group-item d-flex justify-content-between lh-condensed">' +
                    '<div>' +
                    '<div class="row">' +
                    '<img src="imagenes/paquete.png" height="" width="15%" >' +

                    '<h6 style="margin-left:10%; margin-top:5%"><a href="detallePedido.html?idPedido=' + valor.idPedido + '">' + valor.idPedido + '</a></h6>' +
                    '<h6 style="margin-left:15%; margin-top:5%">' + valor.estado + '</h6>' +

                    '</div>' +
                    '</div>' +

                    '</li>'
                ).html(valor.html).appendTo(pedidoEnviadoRecibidoCard);

            }






        },
        error: function (jqXHR, status, error) {
            
        }
    });

   


    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { accion: 'contarPedidos', estado: 'procesando' },
        dataType: 'json',
        success: function (json) {



            var paginas;
            for (var valor of json) {

                paginas = valor.paginacion;
            }


            var paginasFinal = paginas / 6;

            paginasFinal = Math.ceil(paginasFinal)

            var paginasDiv = document.getElementById("pagicionPedidosProcesar");


            for (let index = 1; index < paginasFinal + 1; index++) {

                $('<li class="page-item"><a class="page-link" href="?pagina=' + index + '" >' + index + '</a></li>').appendTo(paginasDiv);


            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });

    var pedidosParaProcesarCard = document.getElementById("pedidosParaProcesarCard");

    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { paginaId: paginaId, accion: 'detallePedidoProcesar', estado: 'procesando' },
        dataType: 'json',
        success: function (json) {



            for (var valor of json) {

                

                $('<li class="list-group-item d-flex justify-content-between lh-condensed">' +
                    '<div>' +
                    '<div class="row" >' +
                    '<img src="imagenes/paquete.png" height="" width="15%" >' +

                    '<h6 style="margin:auto"><a href="detallePedido.html?idPedido=' + valor.idPedido + '">' + valor.idPedido + '</a></h6>' +

                    '<h6  style="margin:auto">' + valor.nombre + '</h6>' +
                    '<h6  style="margin:auto">' + valor.pago + '</h6>' +
                    '<h6  style="margin:auto">' + valor.precio + '&euro;</h6>' +
                    '<select class="selectChangePedidos" aria-label="Default select example" style="margin:auto" onchange="jsFunction(this)">' +
                    '<option >Selecciona</option>' +
                    '<option value="Enviado-' + valor.idPedido + '">Enviado</option>' +
                    '<option value="Cancelado-' + valor.idPedido + '">Cancelado</option>' +
                    '</select>' +

                    '</div>' +
                    '</div>' +

                    '</li>'
                ).html(valor.html).appendTo(pedidosParaProcesarCard);

            }






        },
        error: function (jqXHR, status, error) {
            
        }
    });


    var categoria = null;

    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { categoria: categoria, accion: 'contarProductosPerfil' },
        dataType: 'json',
        success: function (json) {



            var paginas;
            for (var valor of json) {

                paginas = valor.paginacion;
            }


            var paginasFinal = paginas / 6;

            paginasFinal = Math.ceil(paginasFinal)

            var paginasDiv = document.getElementById("pagicionProductosPerfil");


            for (let index = 1; index < paginasFinal + 1; index++) {

                if (categoria != null) {
                    $('<li class="page-item"><a class="page-link" href="?pagina=' + index + '&categoria=' + categoria + '" >' + index + '</a></li>').appendTo(paginasDiv);
                } else {
                    $('<li class="page-item"><a class="page-link" href="?pagina=' + index + '" >' + index + '</a></li>').appendTo(paginasDiv);
                }

            }


        },
        error: function (jqXHR, status, error) {
        
        }
    });



    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { paginaId: paginaId, accion: 'listarProductosPerfil' },
        dataType: 'json',
        success: function (json) {

            var mostrarProductos = document.getElementById("productosMostrar");


            for (var valor of json) {




                $('<tr>' +
                    '<th><input type="checkbox"  class="checkboxes" value="' + valor.idProducto + '" id="idProducto" name="idProducto"></th>' +
                    '<td scope="row"><a href="producto.html?id=' + valor.idProducto + '" style="width:20%"><img src="data:image/jpg;base64,' + valor.imagenProducto + '" height="" width="100%"> </a></td>' +
                    '<td><h6 style="margin:auto"><a href="producto.html?id=' + valor.idProducto + '">' + valor.idProducto + '</a></h6></td>' +
                    '<td><input style="margin:auto" value="' + valor.nombreProducto + '"  size="4" id="nombreProducto_' + valor.idProducto + '"></td>' +
                    '<td><input style="margin:auto" value="' + valor.descripcionProducto + '"  size="8"  id="descripcionProducto_' + valor.idProducto + '"></td>' +
                    '<td><input  style="margin:auto"  value="' + valor.precioProducto + '"  size="2"  id="precioProducto_' + valor.idProducto + '"></td>' +
                    '<td><input  style="margin:auto"  value="' + valor.colorProducto + '"  size="4"  id="colorProducto_' + valor.idProducto + '"></td>' +
                    '<td><input  style="margin:auto"  value="' + valor.cantidadProducto + '"  size="2"  id="cantidadProducto_' + valor.idProducto + '"></td>' +
                    '<td><input  style="margin:auto"  value="' + valor.categoriaProducto + '" size="6"  id="categoriaProducto_' + valor.idProducto + '"></td>' +
                    '</tr>'
                ).html(valor.html).appendTo(mostrarProductos);


            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });


    var a = $("#paquetes option:selected").text();
    $('#paquetes').on('change', function () {
        alert(this.value);
        var a = $("#paquetes option:selected").text();
    })



    //MOSTRAR USUARIOS Y PAGINACION DE USUARIOS
    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { accion: 'contarUsuarios' },
        dataType: 'json',
        success: function (json) {



            var paginas;
            for (var valor of json) {

                paginas = valor.paginacion;
            }


            var paginasFinal = paginas / 6;

            paginasFinal = Math.ceil(paginasFinal)

            var paginasDiv = document.getElementById("paginacionUsuarios");


            for (let index = 1; index < paginasFinal + 1; index++) {

                $('<li class="page-item"><a class="page-link" href="?pagina=' + index + '" >' + index + '</a></li>').appendTo(paginasDiv);


            }


        },
        error: function (jqXHR, status, error) {
            
        }
    });




    var usuarios = document.getElementById("usuarios");

    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { paginaId: paginaId, accion: 'detalleUsuarios' },
        dataType: 'json',
        success: function (json) {



            for (var valor of json) {

            



                $(
                    '<div class="row" style="text-align:center;">' +
                    '<div class="col-sm">' +
                    ' <input type="checkbox"  class="checkboxes" value="' + valor.id + '" id="idUsuario_' + valor.id + '" name="idUsuario"></input>' +
                    ' </div>' +
                    '<div class="col-sm">' +
                    '<h6>' + valor.nombre + '</h6>' +
                    ' </div>' +
                    ' <div class="col-sm">' +
                    '<h6>' + valor.email + '</h6>' +
                    ' </div>' +
                    '<div class="col-sm">' +
                    '<select class="selectUsuarios" id="selectUsuarios' + valor.id + '" onchange="cambiarPermisos(this)">' +

                    '</select>' +
                    '</div>' +
                    ' </div>' +
                    '<hr/>'
                ).html(valor.html).appendTo(usuarios);

                var x = document.getElementById("selectUsuarios" + valor.id);


                var option = document.createElement("option");
                option.value = valor.idPermisos + "-" + valor.id;

                if (valor.idPermisos == 1) {
                    option.text = "SuperUsuario";
                } else {
                    option.text = "Consultas";
                }
                x.add(option);

                var option2 = document.createElement("option");
                option2.value = valor.idPermisos + "-" + valor.id;

                if (valor.idPermisos != 1) {
                    option2.text = "SuperUsuario";
                    option2.value = 1 + "-" + valor.id;;
                } else {
                    option2.text = "Consultas";
                    option2.value = 2 + "-" + valor.id;;
                }
                x.add(option2);
            }






        },
        error: function (jqXHR, status, error) {
            
        }
    });

    var imgProdu =  document.getElementById("imagen_producto");
    imgProdu.onchange=validarImgProducto;
    

});


function jsFunction(valor) {

    

    const myArr = valor.options[valor.selectedIndex].value.split("-");

    if (myArr[0] == "Enviado" || myArr[0] == "Cancelado") {

        $.ajax({
            url: '../Controller/redireccion.php',
            type: 'POST',
            data: { accion: 'actualizarPedido', estado: myArr[0], idPedido: myArr[1] },
            dataType: 'json',
            success: function (json) {



            },
            error: function (jqXHR, status, error) {
                
            }
        });


        window.setTimeout(function () {
            window.location = "../View/perfil.html";
        }, 1000);

    }



}

function cambiarPermisos(valor) {



    const myArr = valor.options[valor.selectedIndex].value.split("-");



    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { accion: 'actualizarPermisosUsuario', idPermisos: myArr[0], idUsuario: myArr[1] },
        dataType: 'json',
        success: function (json) {



        },
        error: function (jqXHR, status, error) {
            
        }
    });


    window.setTimeout(function () {
        window.location = "../View/perfil.html";
    }, 1000);





}


function cortarTextoConPuntos(texto, limite) {
    var puntosSuspensivos = "...";
    if (texto.length > limite) {
        texto = texto.substring(0, limite) + puntosSuspensivos;
    }

    return texto;
}


function editarId() {

    var arrayFinal = [];


    $.each($("input[name='idProducto']:checked"), function () {
        var arrayProducto = [];

        var nombreProducto = document.getElementById("nombreProducto_" + $(this).val()).value;
        var descripcionProducto = document.getElementById("descripcionProducto_" + $(this).val()).value;
        var precioProducto = document.getElementById("precioProducto_" + $(this).val()).value;
        var colorProducto = document.getElementById("colorProducto_" + $(this).val()).value;
        var cantidadProducto = document.getElementById("cantidadProducto_" + $(this).val()).value;
        var categoriaProducto = document.getElementById("categoriaProducto_" + $(this).val()).value;

        arrayProducto.push($(this).val());
        arrayProducto.push(nombreProducto);
        arrayProducto.push(descripcionProducto);
        arrayProducto.push(precioProducto);
        arrayProducto.push(colorProducto);
        arrayProducto.push(cantidadProducto);
        arrayProducto.push(categoriaProducto);

        arrayFinal.push(arrayProducto);
    });



    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { accion: 'actualizarProducto', arrayFinal: arrayFinal },
        dataType: 'json',
        success: function (json) {

            location.reload();


        },
        error: function (jqXHR, status, error) {
            
        }
    });


}
function borrarId() {

    
        var arrayFinal = [];
       
       
        $.each($("input[name='idProducto']:checked"), function(){
            
    
            arrayFinal.push($(this).val());      
           
          
        });
        
    
    
        $.ajax({
            url : '../Controller/redireccion.php',
            type : 'POST',
            data: { accion:'eliminarProducto',arrayFinal:arrayFinal},
            dataType : 'json',
            success : function(json) {
        
                location.reload();
              
             
            },
            error : function(jqXHR, status, error) {
                location.reload();
            }
        });
        
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

function validarImgProducto(){
    var _URL = window.URL || window.webkitURL;
    var file, img;


    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
           

            if(this.width!=500){
                  if(this.height!=500){
                        Swal.fire({
                            
                            icon: 'error',
                            title: 'La imagen tiene que ser 500x500',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        document.getElementById('imagen_producto').value = "";
                }
              
            }else if(this.height!=500){
                if(this.width!=500){
                    Swal.fire({
                            
                        icon: 'error',
                        title: 'La imagen tiene que ser 500x500',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    document.getElementById('imagen_producto').value = "";
                }

            }
        };
        img.onerror = function() {
           
        };
        img.src = _URL.createObjectURL(file);


    }
}

function eliminarUser(){
    var arrayFinal = [];


    $.each($("input[name='idUsuario']:checked"), function () {
        var arrayUsuarios = [];

        var idUsuario = document.getElementById("idUsuario_" + $(this).val()).value;
        
        arrayUsuarios.push(idUsuario);
  
        arrayFinal.push(arrayUsuarios);
    });



    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { accion: 'eliminarUsuarios', arrayFinal: arrayFinal },
        dataType: 'json',
        success: function (json) {

            location.reload();


        },
        error: function (jqXHR, status, error) {
            
        }
    });

}