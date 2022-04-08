$(document).ready(function () {


    controllLogin();

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 10) {

            $('.navbar').addClass('bg-light');
        } else {
            $('.navbar').removeClass('bg-light');
        }
    });


    /*
    var url_string = window.location.href
    var paginaId = null;
    if (paginaId == null) {
        url_string = window.location.href = "?pagina=1";
    }
   

    if (url_string.includes("?pagina")) {
        var division = url_string.split("#");

        var division2 = division[1];


        var divisionId = division2.split("=");

        paginaId = divisionId[1];
    }
 */
    var url_string = window.location.href
    var url = new URL(url_string);
    var paginaId = url.searchParams.get("pagina");
    var categoria = url.searchParams.get("categoria");
    var busqueda = url.searchParams.get("busqueda");
    var precioMin = url.searchParams.get("precioMin");
    var precioMax = url.searchParams.get("precioMax");
    var color1 = url.searchParams.get("color1");
    var color2 = url.searchParams.get("color2");
    var color3 = url.searchParams.get("color3");
    var color4 = url.searchParams.get("color4");
    var color5 = url.searchParams.get("color5");
    var color6 = url.searchParams.get("color6");
    if (paginaId == null) {

        url_string = window.location.href = "?pagina=1";
        var url = new URL(url_string);
        var paginaId = url.searchParams.get("pagina");

    }
    var filtroDondeEstas = "";
    var filtroBanner = new Map()
  
    var filtrar = document.getElementById("filtrar");

    var filtro = "SELECT COUNT(*) as paginacion FROM productos WHERE 1";
    var filtroMostrarProductos = "SELECT * FROM productos WHERE 1";
    if (categoria != null) {

        filtroBanner.set("categoria",categoria);
        filtroDondeEstas += "&categoria=" + categoria + "";

        filtro += " and categoriaProducto='" + categoria + "'";
        filtroMostrarProductos += " and categoriaProducto='" + categoria + "'";
    }
    

    var contadorAnd = 0;
    if (precioMin != null && precioMin != "") {
        filtroBanner.set("precioMin",precioMin);
        filtroDondeEstas += "&precioMin=" + precioMin + "";
        filtro += " and precioProducto>=" + precioMin + "";
        filtroMostrarProductos += " and precioProducto>=" + precioMin + "";
    }

    if (precioMax != null && precioMax != "") {
        filtroBanner.set("precioMax",precioMax);
        filtroDondeEstas += "&precioMax=" + precioMax + "";
        filtro += " and precioProducto<=" + precioMax + "";
        filtroMostrarProductos += " and precioProducto<=" + precioMax + "";

    }

    if (color1 != null && color1 != "") {
        filtroBanner.set("color1","Rojo");
        filtroDondeEstas += "&color1=rojo";

        filtro += " and colorProducto LIKE '%rojo%'";
        filtroMostrarProductos += " and colorProducto LIKE '%rojo%'";

    }
    if (color2 != null && color2 != "") {
        filtroBanner.set("color2","Verde");
        filtro += " and colorProducto LIKE '%verde%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%verde%'";

    }
    if (color3 != null && color3 != "") {
        filtroBanner.set("color3","Azul");
        filtroDondeEstas += "&color3=azul";


        filtro += " and colorProducto LIKE '%azul%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%azul%'";

    }
    if (color4 != null && color4 != "") {
        filtroBanner.set("color4","Gris");
        filtroDondeEstas += "&color4=gris";


        filtro += " and colorProducto LIKE '%gris%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%gris%'";


    }
    if (color5 != null && color5 != "") {
        filtroBanner.set("color5","Negro");
        filtroDondeEstas += "&color5=negro";


        filtro += " and colorProducto LIKE '%negro%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%negro%'";

    }
    if (color6 != null && color6 != "") {
        filtroBanner.set("color6","Blanco");
        filtroDondeEstas += "&color6=blanco";


        filtro += " and colorProducto LIKE '%blanco%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%blanco%'";


    }
    
    


    if (busqueda != null && busqueda !="") {

        busquedaBarra();
    } else {
        var concat="";
    for (const [key, value] of filtroBanner.entries()) {
       
         concat +=  "&"+key+"="+value;
        $('  <li class="breadcrumb-item" active"><a href="productos.html?pagina=1' +concat + '">' + value + '</a></li>').appendTo(filtrar);
      }
        $.ajax({
            url: '../Controller/redireccion.php',
            type: 'POST',
            data: { categoria: categoria, filtro: filtro, accion: 'contarProductos' },
            dataType: 'json',
            success: function (json) {



                var paginas;
                for (var valor of json) {

                    paginas = valor.paginacion;
                }


                var paginasFinal = paginas / 6;

                paginasFinal = Math.ceil(paginasFinal)

                var paginasDiv = document.getElementById("paginas");


                for (let index = 1; index < paginasFinal + 1; index++) {

                    if (categoria != null) {
                        $('<li class="page-item"><a class="page-link" href="?pagina=' + index + filtroDondeEstas + '" >' + index + '</a></li>').appendTo(paginasDiv);
                    } else {
                        $('<li class="page-item"><a class="page-link" href="?pagina=' + index + filtroDondeEstas+'" >' + index + '</a></li>').appendTo(paginasDiv);
                    }

                }


            },
            error: function (jqXHR, status, error) {
                

            }
        });


        $.ajax({
            url: '../Controller/redireccion.php',
            type: 'POST',
            data: { paginaId: paginaId, categoria: categoria, filtroMostrarProductos: filtroMostrarProductos, accion: 'listarProductos' },
            dataType: 'json',
            success: function (json) {

                var todosProductos = document.getElementById("todosProductos");


                for (var valor of json) {

                    if (valor.cantidadProducto <= 0) {

                        $('<div class="col-6 col-md-6 col-lg-4 productosBorrar" id="productosBorrar" style="margin-top:1%;">' +
                            '<div class="card">' +
                            '<a href="producto.html?id=' + valor.idProducto + '"><img class="card-img-top" src="data:image/jpg;base64,' + valor.imagenProducto + '" alt="Card image cap"></a>' +
                            '<div class="card-body">' +
                            '<h4 class="card-title"><a href="producto.html?id=' + valor.idProducto + '" title="View Product">' + cortarTextoConPuntos(valor.nombreProducto, 15) + '</a></h4>' +
                            '<p class="card-text">' + cortarTextoConPuntos(valor.descripcionProducto, 25) + '</p>' +
                            '<div class="row">' +
                            '<div class="col">' +
                            '<p class="btn btn-danger btn-block">' + valor.precioProducto + '&euro;</p>' +
                            '</div>' +
                            '<div class="col">' +
                            '<button type="button" class="btn btn-info"><i class="fa fa-shopping-cart">Agotado</i></button>' +
                            '</div>' +
                            '</div>' +
                            ' </div>' +
                            '</div>' +
                            '</div>'
                        ).html(valor.html).appendTo(todosProductos);

                    } else {
                        $('<div class="col-6 col-md-6 col-lg-4 productosBorrar" id="productosBorrar" style="margin-top:1%;">' +
                            '<div class="card">' +
                            '<a href="producto.html?id=' + valor.idProducto + '"><img class="card-img-top" src="data:image/jpg;base64,' + valor.imagenProducto + '" alt="Card image cap"></a>' +
                            '<div class="card-body">' +
                            '<h4 class="card-title"><a href="producto.html?id=' + valor.idProducto + '" title="View Product">' + cortarTextoConPuntos(valor.nombreProducto, 15) + '</a></h4>' +
                            '<p class="card-text">' + cortarTextoConPuntos(valor.descripcionProducto, 25) + '</p>' +
                            '<div class="row">' +
                            '<div class="col">' +
                            '<p class="btn btn-danger btn-block">' + valor.precioProducto + '&euro;</p>' +
                            '</div>' +
                            '<div class="col">' +
                            '<button type="button" class="btn btn-success" onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto + ')" ><i class="fa fa-shopping-cart"> Carrito</i></button>' +
                            '</div>' +
                            '</div>' +
                            ' </div>' +
                            '</div>' +
                            '</div>'
                        ).html(valor.html).appendTo(todosProductos);
                    }



                }





            },
            error: function (jqXHR, status, error) {
               
            }
        });

    }



});


function cortarTextoConPuntos(texto, limite) {
    var puntosSuspensivos = "...";
    if (texto.length > limite) {
        texto = texto.substring(0, limite) + puntosSuspensivos;
    }

    return texto;
}

function busquedaBarra() {

    var url_string = window.location.href
    var url = new URL(url_string);

    var paginaId = url.searchParams.get("pagina");
    var busqueda = url.searchParams.get("busqueda");

    var categoria = url.searchParams.get("categoria");
    var precioMin = url.searchParams.get("precioMin");
    var precioMax = url.searchParams.get("precioMax");
    var color1 = url.searchParams.get("color1");
    var color2 = url.searchParams.get("color2");
    var color3 = url.searchParams.get("color3");
    var color4 = url.searchParams.get("color4");
    var color5 = url.searchParams.get("color5");
    var color6 = url.searchParams.get("color6");
    if (paginaId == null) {

        url_string = window.location.href = "?pagina=1";
        var url = new URL(url_string);
        var paginaId = url.searchParams.get("pagina");

    }
    var filtroDondeEstas = "";
    var filtroBanner = new Map()
  
    var filtrar = document.getElementById("filtrar");

    var filtro = "SELECT COUNT(*) as paginacion FROM productos WHERE 1";
    var filtroMostrarProductos = "SELECT * FROM productos WHERE 1";
    if (busqueda != null) {

        filtroBanner.set("busqueda",busqueda);
        filtroDondeEstas += "&busqueda=" + busqueda + "";

        filtro += " and nombreProducto LIKE '%" + busqueda + "%'";
        filtroMostrarProductos += " and nombreProducto LIKE '%" + busqueda + "%'";
    }
    if (categoria != null) {

        filtroBanner.set("categoria",categoria);
        filtroDondeEstas += "&categoria=" + categoria + "";

        filtro += " and categoriaProducto='" + categoria + "'";
        filtroMostrarProductos += " and categoriaProducto='" + categoria + "'";
    }

    var contadorAnd = 0;
    if (precioMin != null && precioMin != "") {
        filtroBanner.set("precioMin",precioMin);
        filtroDondeEstas += "&precioMin=" + precioMin + "";
        filtro += " and precioProducto>=" + precioMin + "";
        filtroMostrarProductos += " and precioProducto>=" + precioMin + "";
    }

    if (precioMax != null && precioMax != "") {
        filtroBanner.set("precioMax",precioMax);
        filtroDondeEstas += "&precioMax=" + precioMax + "";
        filtro += " and precioProducto<=" + precioMax + "";
        filtroMostrarProductos += " and precioProducto<=" + precioMax + "";

    }

    if (color1 != null && color1 != "") {
        filtroBanner.set("color1","Rojo");
        filtroDondeEstas += "&color1=rojo";

        filtro += " and colorProducto LIKE '%rojo%'";
        filtroMostrarProductos += " and colorProducto LIKE '%rojo%'";

    }
    if (color2 != null && color2 != "") {
        filtroBanner.set("color2","Verde");
        filtro += " and colorProducto LIKE '%verde%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%verde%'";

    }
    if (color3 != null && color3 != "") {
        filtroBanner.set("color3","Azul");
        filtroDondeEstas += "&color3=azul";


        filtro += " and colorProducto LIKE '%azul%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%azul%'";

    }
    if (color4 != null && color4 != "") {
        filtroBanner.set("color4","Gris");
        filtroDondeEstas += "&color4=gris";


        filtro += " and colorProducto LIKE '%gris%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%gris%'";


    }
    if (color5 != null && color5 != "") {
        filtroBanner.set("color5","Negro");
        filtroDondeEstas += "&color5=negro";


        filtro += " and colorProducto LIKE '%negro%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%negro%'";

    }
    if (color6 != null && color6 != "") {
        filtroBanner.set("color6","Blanco");
        filtroDondeEstas += "&color6=blanco";


        filtro += " and colorProducto LIKE '%blanco%'";
        filtroMostrarProductos+= " and colorProducto LIKE '%blanco%'";


    }
    var concat="";
    for (const [key, value] of filtroBanner.entries()) {
       
         concat +=  "&"+key+"="+value;
        $('  <li class="breadcrumb-item" active"><a href="productos.html?pagina=1' +concat + '">' + value + '</a></li>').appendTo(filtrar);
      }
    



    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { busqueda: busqueda,filtro: filtro, accion: 'contarProductos' },
        dataType: 'json',
        success: function (json) {



            var paginas;
            for (var valor of json) {

                paginas = valor.paginacion;
            }


            var paginasFinal = paginas / 6;

            paginasFinal = Math.ceil(paginasFinal)

            var paginasDiv = document.getElementById("paginas");


            for (let index = 1; index < paginasFinal + 1; index++) {


               
                if (busqueda != null) {
                    $('<li class="page-item"><a class="page-link" href="?pagina=' + index + filtroDondeEstas + '" >' + index + '</a></li>').appendTo(paginasDiv);
                } else {
                    $('<li class="page-item"><a class="page-link" href="?pagina=' + index + filtroDondeEstas+'" >' + index + '</a></li>').appendTo(paginasDiv);
                }

            }


        },
        error: function (jqXHR, status, error) {
           
        }
    });





    $.ajax({
        url: '../Controller/redireccion.php',
        type: 'POST',
        data: { paginaId: paginaId, busqueda: busqueda,filtroMostrarProductos: filtroMostrarProductos, accion: 'listarProductosBusqueda' },
        dataType: 'json',
        success: function (json) {

            var todosProductos = document.getElementById("todosProductos");


            for (var valor of json) {

                if (valor.cantidadProducto <= 0) {

                    $('<div class="col-6 col-md-6 col-lg-4 productosBorrar" id="productosBorrar" style="margin-top:1%;">' +
                        '<div class="card">' +
                        '<a href="producto.html?id=' + valor.idProducto + '"><img class="card-img-top" src="data:image/jpg;base64,' + valor.imagenProducto + '" alt="Card image cap"></a>' +
                        '<div class="card-body">' +
                        '<h4 class="card-title"><a href="producto.html?id=' + valor.idProducto + '" title="View Product">' + cortarTextoConPuntos(valor.nombreProducto, 15) + '</a></h4>' +
                        '<p class="card-text">' + cortarTextoConPuntos(valor.descripcionProducto, 25) + '</p>' +
                        '<div class="row">' +
                        '<div class="col">' +
                        '<p class="btn btn-danger btn-block">' + valor.precioProducto + '&euro;</p>' +
                        '</div>' +
                        '<div class="col">' +
                        '<button type="button" class="btn btn-info"><i class="fa fa-shopping-cart">Agotado</i></button>' +
                        '</div>' +
                        '</div>' +
                        ' </div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(todosProductos);

                } else {
                    $('<div class="col-6 col-md-6 col-lg-4 productosBorrar" id="productosBorrar" style="margin-top:1%;">' +
                        '<div class="card">' +
                        '<a href="producto.html?id=' + valor.idProducto + '"><img class="card-img-top" src="data:image/jpg;base64,' + valor.imagenProducto + '" alt="Card image cap"></a>' +
                        '<div class="card-body">' +
                        '<h4 class="card-title"><a href="producto.html?id=' + valor.idProducto + '" title="View Product">' + cortarTextoConPuntos(valor.nombreProducto, 15) + '</a></h4>' +
                        '<p class="card-text">' + cortarTextoConPuntos(valor.descripcionProducto, 25) + '</p>' +
                        '<div class="row">' +
                        '<div class="col">' +
                        '<p class="btn btn-danger btn-block">' + valor.precioProducto + '&euro;</p>' +
                        '</div>' +
                        '<div class="col">' +
                        '<button type="button" class="btn btn-success" onclick="anadirCarrito(\'' + valor.nombreProducto + '\',' + valor.precioProducto + ',\'' + valor.imagenProducto + '\',' + valor.idProducto + ')" ><i class="fa fa-shopping-cart"> Carrito</i></button>' +
                        '</div>' +
                        '</div>' +
                        ' </div>' +
                        '</div>' +
                        '</div>'
                    ).html(valor.html).appendTo(todosProductos);
                }


            }





        },
        error: function (jqXHR, status, error) {
           
        }
    });

}


function quitarfiltros(){
    window.location.href = "?pagina=1";
}

function filtros() {

    var url_string = window.location.href
    var url = new URL(url_string);
    var categoria = url.searchParams.get("categoria");
    var busqueda = url.searchParams.get("busqueda");
    var precioMin = $('input[name=precioMin]').val();
    var precioMax = $('input[name=precioMax]').val();
    

    var filtros = "?pagina=1";
    if (busqueda != null && busqueda != "") {

        filtros += "&busqueda=" + busqueda + "";
    }
    if (categoria != null && categoria != "") {

        filtros += "&categoria=" + categoria + "";
    }

    if (precioMin != null && precioMin != "") {

        filtros += "&precioMin=" + precioMin + "";
    }

    if (precioMax != null && precioMax != "") {

        filtros += "&precioMax=" + precioMax + "";
    }

    if ($('input[name=rojo]').is(':checked')) {
        filtros += "&color1=rojo";
    }
    if ($('input[name=verde]').is(':checked')) {
        filtros += "&color2=verde";
    }
    if ($('input[name=azul]').is(':checked')) {
        filtros += "&color3=azul";
    }
    if ($('input[name=gris]').is(':checked')) {
        filtros += "&color4=gris";
    }
    if ($('input[name=negro]').is(':checked')) {
        filtros += "&color5=negro";
    }
    if ($('input[name=blanco]').is(':checked')) {
        filtros += "&color6=blanco";
    }
    window.location.href = filtros;
}

function filtrosCategoria(categoria) {
    var url_string = window.location.href
    var url = new URL(url_string);
    
    var busqueda = url.searchParams.get("busqueda");

    var precioMin = $('input[name=precioMin]').val();
    var precioMax = $('input[name=precioMax]').val();
    

    var filtros = "?pagina=1";

    if (busqueda != null && busqueda != "") {

        filtros += "&busqueda=" + busqueda + "";
    }

    if (categoria != null && categoria != "") {

        filtros += "&categoria=" + categoria + "";
    }

    if (precioMin != null && precioMin != "") {

        filtros += "&precioMin=" + precioMin + "";
    }

    if (precioMax != null && precioMax != "") {

        filtros += "&precioMax=" + precioMax + "";
    }

    if ($('input[name=rojo]').is(':checked')) {
        filtros += "&color1=rojo";
    }
    if ($('input[name=verde]').is(':checked')) {
        filtros += "&color2=verde";
    }
    if ($('input[name=azul]').is(':checked')) {
        filtros += "&color3=azul";
    }
    if ($('input[name=gris]').is(':checked')) {
        filtros += "&color4=gris";
    }
    if ($('input[name=negro]').is(':checked')) {
        filtros += "&color5=negro";
    }
    if ($('input[name=blanco]').is(':checked')) {
        filtros += "&color6=blanco";
    }
    window.location.href = filtros;
}

function cargarURL() {

    var busqueda = $('input[name=busqueda]').val();
    window.location.href = "?pagina=1&busqueda=" + busqueda + "";
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


function controlURL() {

    var usuario = window.sessionStorage.getItem("usuario");
    

    if (usuario == null) {

        window.location.href = 'login.html';
    }
}