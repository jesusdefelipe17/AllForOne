$( document ).ready(function() {

  controlURL();
  window.sessionStorage.removeItem('carrito');

    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
         
            $('.navbar').addClass('bg-light');
        } else {
            $('.navbar').removeClass('bg-light');
        }
    });

    var url_string = window.location.href;
    var url = new URL(url_string);
    var idPedido = url.searchParams.get("idPedido");

    var pedido = document.getElementById("pedido");

    var direccionPedido = document.getElementById("direccionPedido");

    var usuario = window.sessionStorage.getItem("usuario");
    var obj = JSON.parse(usuario);
   

    //Consulta para shiba
  
   
 

    $.ajax({
        url : '../Controller/redireccion.php',
        type : 'POST',
        data: { idPedido: idPedido, accion:'detallePedido'},
        dataType : 'json',
        success : function(json) {

            
            
            var precioTotal=0;
            for (var valor of json) {

              
            precioTotal = precioTotal+parseFloat(valor.precioProducto*valor.cantidad);

            
            


                $( '<hr> '+
                '<div class="row">'+
                ' <div class="col-sm">'+
                '<img class="text-center" src="data:image/jpg;base64,'+valor.imagenProducto+'" height="" width="50%">'+
                '</div>'+
                '<div class="col-sm">'+
                '<h6 class="text-center">'+valor.nombreProducto+'</h6>'+
                '</div>'+
                '<div class="col-sm">'+
                '<h6 class="text-center">'+valor.descripcionProducto+'</h6>'+
                ' </div>'+
                '<div class="col-sm">'+
                '<h6 class="text-center">'+valor.cantidad+'</h6>'+
                ' </div>'+
                '<div class="col-sm">'+
                '<span class="text-center text-uppercase font-weight-bold col-sm" style="margin-right :3%;">'+valor.precioProducto*valor.cantidad+'&euro;</span>'+
                ' </div>'+
                ' </div>'
                 ).html(valor.html).appendTo(pedido);
              
            }

            
          

             $(   '</br>'+
             '<button type="button" class="btn btn-danger" style="margin-top:4%;" onclick="cancelarPedido(\'' + valor.idPedido + '\');" id="cancelarPedido">Cancelar Pedido</button>'+
            
             '<div class="row" style="margin-top:4%;">'+
                '<div class="col-sm-6">'+
                ' <div class="card">'+
                ' <div class="card-body">'+
                '<h5 class="card-title">Resumen del pedido</h5>'+
                '<p class="card-text">Pedido: '+valor.idPedido+'</p>'+
                '<p class="card-text">Estado: '+valor.estado +'</p>'+
                '<p class="card-text">Precio Total: '+precioTotal+'&euro;</p>'+
                '</div>'+
                ' </div>'+
                ' </div>'+
                '<div class="col-sm-6">'+
                ' <div class="card">'+
                ' <div class="card-body">'+
                ' <h5 class="card-title">Direccion de envio:</h5>'+
                
                ' <p class="card-text">'+valor.nombreyapellido+'</p>'+
                ' <p class="card-text">'+valor.direccion+', '+valor.codigoPostal+'</p>'+
                ' <p class="card-text">'+valor.ciudad+' , '+valor.provincia+'</p>'+
              
                ' </div>'+
                '  </div>'+
                ' </div>'+
                ' </div>'


                 ).html(valor.html).appendTo(direccionPedido);
         
              

                 if(valor.estado=='Cancelado' || valor.estado=='cancelado'){
                    //Pasamos el pedido a cancelado
                    document.getElementById("cancelarPedido").remove();
                    }

        },
        error : function(jqXHR, status, error) {
           
        }
    });

    controllLogin();

   

});


function cancelarPedido(idPedido){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Deseas cancelar el pedido?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          

          //Pasamos el pedido a cancelado
          document.getElementById("cancelarPedido").remove();

          $.ajax({
            url : '../Controller/redireccion.php',
            type : 'POST',
            data: { accion:'actualizarPedido',estado: "Cancelado", idPedido: idPedido},
            dataType : 'json',
            success : function(json) {
        
               
             
            },
            error : function(jqXHR, status, error) {
               
            }
        });

        location.reload();
          

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'OK',
            'No se cancelo tu pedido',
            'error'
          )
        }
      })

}

function controllLogin() {

  var usuario = window.sessionStorage.getItem("usuario");
  

  if (usuario == null) {
      $('#perfil').remove();
      $('#carrito').remove();
     
    
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