let carrito = new Carrito();




function anadirCarrito(nombreProducto,precioProducto,imagenProducto,idProducto,pagina){

    var urlF;
    if(pagina=="index"){
        urlF ='Controller/redireccion.php';
    }else{
        urlF ='../Controller/redireccion.php';
    }

    var usuario = window.sessionStorage.getItem("usuario");
    console.log(usuario)

    if (usuario == null) {

        Swal.fire({
                        
            icon: 'error',
            title: 'Para poder comprar necesitas hacer login',
            showConfirmButton: false,
            timer: 2000
          })

    }else{

    var cantidad =1;

    var cantidadFinal = 1;

    $.ajax({
        url: urlF,
        type: 'POST',
        data: { id: idProducto,accion: 'productoDetail' },
        dataType: 'json',
        success: function (json) {

            for (var valor of json) {

                if( valor.cantidadProducto==0){

                    Swal.fire({
                        
                        icon: 'error',
                        title: 'Este producto se ha agotado',
                        showConfirmButton: false,
                        timer: 1500
                      })
            
                }else{
            
                    const producto = {nombreProducto:nombreProducto,precioProducto:precioProducto,imagenProducto:imagenProducto,idProducto:idProducto,cantidad:cantidad};
            
                    carrito.addProducto(producto);
                
                    console.log(JSON.parse(carrito.getProductos()));

                    /*
                    $.ajax({
                        url: '../Controller/redireccion.php',
                        type: 'POST',
                        data: { idProducto: idProducto, cantidadFinal:cantidadFinal,accion: 'restarCantidadProductos' },
                        dataType: 'json',
                        success: function (json) {
                
                
                        },
                        error: function (jqXHR, status, error) {
                            console.log("Error");
                        }
                    });

                    */



                }
            }

        },
        error: function (jqXHR, status, error) {
            console.log("Error");
        }
    });
    
    
}
  

    
    
}

