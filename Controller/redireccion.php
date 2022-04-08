<?php 

    
    if(isset($_POST['accion'])){

        $accion = $_POST['accion'];

    }else{

        $accion = $_GET['accion'];


        if(is_null($_GET['accion'])){

         $accion = $_POST['accion1'];
        }

      
    }

    include_once ('Controller_Aplicacion.php');
    $controller = new Controller_Aplicacion();



    if($accion=='listarProductosCategoria'){

        $categoria = $_POST['categoria'];

        $response = $controller->selectProductByCategory($categoria);
         echo json_encode($response);

    }else if($accion=='login'){

        $email = $_POST['email'];

        $password = $_POST['password'];

        $controller->selectUserById($email,$password);

    }else if($accion=='registro'){

        $email = $_POST['email'];

        $password = $_POST['password'];

        $passwordR = $_POST['passwordR'];

        
        $nombre = $_POST['nombre'];
        
        $imagen = $_FILES['imagen_user'];

        if($password!=$passwordR){

            header("Location: ../View/registro.html?error_registro_pass");

        }else{

            $usuario = $controller->selectUserByEmail($email);

            if($usuario!=null){

                header("Location: ../View/registro.html?error_registro_user");
               

            }else{
                $controller->insertUsuario($email,$password,$nombre,$imagen);
            }

            
        }

       

    }else if($accion=='getUser'){

        $idUsuario = $_POST['idUsuario'];

        $usuario = $controller->selectUserId($idUsuario);

        $response[] = array(
            "id" => $usuario ->__get("id"),
            "email" => $usuario ->__get("email"),
                    "nombre" => $usuario ->__get("nombre"),
                    "imagenUsuario" => $usuario ->__get("imagenUsuario"),
                    "balance" => $usuario ->__get("balance"),
                    "idPermisos" => $usuario ->__get("idPermisos")
            );
        
        $usuarioJSON = json_encode($response[0]);

        echo  $usuarioJSON;

    }else if($accion=='actualizarUser'){

        $email = $_POST['email'];

        $nombre = $_POST['nombre'];
        
        $id = $_POST['id'];
        
        $imagen = $_FILES['imagen_user'];
        
       

        $controller->updateUserById($email,$nombre,$id,$imagen);
        $controller->selectUserById($email,"x");



    }else if($accion=='pagarPaypal'){

        $precioPorETH = $_GET['precioPorETH'];

        $paymentId = $_GET['paymentID'];

        $paymentToken = $_GET['paymentToken'];

        $nombre = $_GET['nombre'];

        $ids =  $_GET['ids'];

        $cantidades =  $_GET['cantidades'];

        $idUsuario = $_GET["idUsuario"];

        $arrayIds = explode(",", $ids);

        $arrayCantidades = explode(",", $cantidades);
       

        include_once ('../Beans/pedidosObject.php');
        $pedidosObject = new pedidosObject();

         $idPedido = uniqid();

         
        $pedidosObject->__set("idPedido",$idPedido);
        $pedidosObject->__set("idUsuario",$idUsuario);
        $pedidosObject->__set("estado","Procesando");
        $pedidosObject->__set("nombre",$nombre);
        $pedidosObject->__set("direccion",$_GET['direccion']);
        $pedidosObject->__set("ciudad",$_GET['ciudad']);
        $pedidosObject->__set("provincia",$_GET['provincia']);
        $pedidosObject->__set("codigoPostal",$_GET['codigoPostal']);
        

        

        $objetoTransaccion = $controller->pagarPaypal($paymentId,$paymentToken,$pedidosObject);

        $controller->insertarProductoPedido($arrayIds,$idPedido,$arrayCantidades);


        $controller->restarCantidadesProducto($arrayIds,$arrayCantidades);
        

        sleep(1);

       

        $response2 = $controller->selectIdPedidoByPago($idPedido);


        $precio=0;
       
        foreach($response2 as $value){

            $precio = $value->precio;
            
        }

        
         $usuario = $controller->selectUserId($idUsuario);
         


         $balanceBBDD = $usuario ->__get("balance");
        


        $eth=0;
     
        
         if($precio<25){

           $eth =   floatval($balanceBBDD)+$precioPorETH;

         }elseif($precio>25 && $precio<100){

            $eth =  floatval($balanceBBDD)+($precioPorETH*3);

         }elseif($precio>100){

            $eth =    floatval($balanceBBDD)+($precioPorETH*5);
         }
       
         $controller->updateBalanceUserbyId($idUsuario,$eth);

      

        $controller->enviarMensajePedidoCorreo($idPedido,$usuario ->__get("email"));
        

       



    }else if($accion=='anadirProducto'){
         
        $controller->insertarProducto($_POST['identificador_producto'],$_POST['nombre_producto'],$_POST['descripcion_producto'],$_POST['precio_producto'],$_FILES['imagen_producto'],
        $_POST['talla_producto'],$_POST['color_producto'],$_POST['cantidad_producto'], $_POST['categoria_producto']);

    }else  if($accion=='listarProductosBaratos'){

        $barato = $_POST['barato'];

        $response = $controller->selectProductosBaratos($barato);
         echo json_encode($response);

    }else if($accion=='productoDetail'){

        $id = $_POST['id'];

        $response = $controller->selectProductById($id);

        echo json_encode($response);
    }else if($accion=='listarProductos'){

        $paginaId = $_POST['paginaId'];
        $categoria = $_POST['categoria'];
        
        
        $filtroMostrarProductos = $_POST['filtroMostrarProductos'];

        $response = $controller->selectProductos($paginaId,$categoria,$filtroMostrarProductos);
         echo json_encode($response);

    }else if($accion=='listarProductosPerfil'){

        $paginaId = $_POST['paginaId'];
        
        
        $response = $controller->selectProductosPerfil($paginaId);
         echo json_encode($response);

    }else if($accion=='contarProductos'){

        if(isset($_POST['categoria'])){
            $categoria = $_POST['categoria'];
            $filtro = $_POST['filtro'];
            $response = $controller->selectProductosCountCategoria($categoria,$filtro);
        }else{
            $busqueda = $_POST['busqueda'];
            $filtro = $_POST['filtro'];
            $response = $controller->selectProductosCountBusqueda($busqueda,$filtro);
        }

       
       
       
         echo json_encode($response);

    }else if($accion=='contarProductosPerfil'){

      
            $categoria = $_POST['categoria'];
           
            $response = $controller->selectProductosCountCategoriaPerfil($categoria);
        

       
       
       
         echo json_encode($response);

    }else if($accion=='pagarEthereum'){

        $precioPorETH = $_GET['precioPorETH'];

        $nombre = $_GET['nombre'];

        include_once ('../Beans/pedidosObject.php');
        $pedidosObject = new pedidosObject();

        $ids =  $_GET['ids'];

        $idUsuario = $_GET["idUsuario"];

        $arrayIds = explode(",", $ids);

        $cantidades =  $_GET['cantidades'];

        $arrayCantidades = explode(",", $cantidades);

        $idPedido = uniqid();

        
        $pedidosObject->__set("idPedido",$idPedido);
        $pedidosObject->__set("idUsuario",$idUsuario);
        $pedidosObject->__set("estado","Procesando");
        $pedidosObject->__set("nombre",$nombre);
        $pedidosObject->__set("direccion",$_GET['direccion']);
        $pedidosObject->__set("ciudad",$_GET['ciudad']);
        $pedidosObject->__set("provincia",$_GET['provincia']);
        $pedidosObject->__set("codigoPostal",$_GET['codigoPostal']);


        $objetoTransaccion = $controller->insertarPagoEthereum($pedidosObject, $_GET['idTransaccion'],$_GET['precio']);
         $controller->insertarProductoPedido($arrayIds,$idPedido,$arrayCantidades);

         sleep(2);

        $response = $controller->selectIdPedido($idPedido);

        $response2 = $controller->selectIdPedidoByPago($idPedido);

     

        $controller->restarCantidadesProducto($arrayIds,$arrayCantidades);


        $precio=0;
       
        foreach($response2 as $value){

            $precio = $value->precio;
            
        }

        
         $usuario = $controller->selectUserId($idUsuario);
         


         $balanceBBDD = $usuario ->__get("balance");
        


        $eth=0;
         if($precio<25){

           $eth =   floatval($balanceBBDD)+$precioPorETH;

         }elseif($precio>25 && $precio<100){

            $eth =  floatval($balanceBBDD)+($precioPorETH*3);

         }elseif($precio>100){

            $eth =    floatval($balanceBBDD)+($precioPorETH*5);
         }

         $controller->updateBalanceUserbyId($idUsuario,$eth);

         //Redirigimos al detalle de la compra

         $controller->enviarMensajePedidoCorreo($idPedido,$usuario ->__get("email"));
       
    }else if($accion=='detallePedido'){

        $idPedido = $_POST['idPedido'];
     
      
        $response = $controller->selectIdPedido($idPedido);

      
        
         echo json_encode($response);

    }else if($accion=='detallePedidoUsuario'){

        $id = $_POST['id'];
        $paginaId = $_POST['paginaId'];
        $estado = $_POST['estado'];


        $response = $controller->selectIdPedidoByUser($id,$estado,$paginaId);
         echo json_encode($response);

    }else if($accion=='detallePedidoUsuarioEnviadoCancelado'){

        $id = $_POST['id'];
        $paginaId = $_POST['paginaId'];
        $estado = $_POST['estado'];


        $response = $controller->detallePedidoUsuarioEnviadoCancelado($id,$estado,$paginaId);
         echo json_encode($response);

    }else if($accion=='detallePedidoProcesar'){


        $estado = $_POST['estado'];
        $paginaId = $_POST['paginaId'];
        
        $response = $controller->selectIdPedidoByManager( $paginaId,$estado);
         echo json_encode($response);

    }else if($accion=='actualizarPedido'){


        $estado = $_POST['estado'];
        $idPedido = $_POST['idPedido'];
        $controller->updatePedido($estado,$idPedido);

    }else if($accion=='pagarBalance'){

        $idUsuario = $_GET['idUsuario'];

        $precioTotal = $_GET['precio'];

        $precioPorEth = $_GET['precioPorETH'];

        $precioPagar = (floatval($precioTotal)*floatval($precioPorEth))/1;

        $usuario = $controller->selectUserId($idUsuario);


        $pagar = $controller->payBalance($usuario,$precioPagar);


        
        
        if($pagar==true){

        $nombre = $_GET['nombre'];

        include_once ('../Beans/pedidosObject.php');
        $pedidosObject = new pedidosObject();

        $ids =  $_GET['ids'];

     
        $arrayIds = explode(",", $ids);

        $cantidades =  $_GET['cantidades'];

        $arrayCantidades = explode(",", $cantidades);

        $idPedido = uniqid();

        
        $pedidosObject->__set("idPedido",$idPedido);
        $pedidosObject->__set("idUsuario",$idUsuario);
        $pedidosObject->__set("estado","Procesando");
        $pedidosObject->__set("nombre",$nombre);
        $pedidosObject->__set("direccion",$_GET['direccion']);
        $pedidosObject->__set("ciudad",$_GET['ciudad']);
        $pedidosObject->__set("provincia",$_GET['provincia']);
        $pedidosObject->__set("codigoPostal",$_GET['codigoPostal']);


        $objetoTransaccion = $controller->insertarPagoEthereum($pedidosObject, $_GET['idTransaccion'],$precioTotal);
        $controller->insertarProductoPedido($arrayIds,$idPedido,$arrayCantidades);

   
        $controller->restarCantidadesProducto($arrayIds,$arrayCantidades);


        $usuario = $controller->selectUserId($idUsuario);

        $controller->enviarMensajePedidoCorreo($idPedido,$usuario ->__get("email"));

        }else{
            
        
            header("Location: ../View/checkout.html?error_pagar_balance");
        }

        



    }else if($accion=='listarProductosBusqueda'){

        $paginaId = $_POST['paginaId'];
        $busqueda = $_POST['busqueda'];
        $filtroMostrarProductos = $_POST['filtroMostrarProductos'];
        
        
     
        $response = $controller->selectProductosBusqueda($paginaId,$busqueda,$filtroMostrarProductos);
         echo json_encode($response);

    }else if($accion=='enviarMensaje'){

        $correoDestino ="jesusdefelipe17@gmail.com";

        $nombre = $_POST['nombre'];

        $email = $_POST['email'];

        $telefono = $_POST['telefono'];

        $asunto = $_POST['asunto'];

        $mensaje = $_POST['mensaje'];

        $controller->enviarMensaje($nombre,$email,$telefono, $asunto,$mensaje, $correoDestino);


    }else if($accion=='enviarCorreoDetallePedido'){

        $id = $_POST['idPedido'];

       
        $controller->enviarMensajePedidoCorreo($id);
        echo json_encode($id);

    }else if($accion=='restarCantidadProductos'){

        $id = $_POST['idProducto'];
        $cantidadFinal = $_POST['cantidadFinal'];
        

        $controller->updateCantidadProducto($id,$cantidadFinal);

       
        

    }else if($accion=='actualizarProducto'){

        $arrayFinal = $_POST['arrayFinal'];


        $response = $controller->updateProducto($arrayFinal);

        echo json_encode($response);
        
    }else if($accion=='contarPedidos'){

             $estado = $_POST['estado'];
            
            $response = $controller->selectCountPedidosWithEstado($estado);
        
             echo json_encode($response);

    }else if($accion=='contarPedidosProcesarUser'){

        $estado = $_POST['estado'];
        $id = $_POST['id'];

       $response = $controller->selectCountPedidosWithEstadoWithUser($id,$estado);
   
        echo json_encode($response);

    }else if($accion=='contarUsuarios'){


        $response = $controller->selectCountUsuarios();

            echo json_encode($response);

    }else if($accion=='detalleUsuarios'){

        $paginaId = $_POST['paginaId'];

        $response = $controller->selectUsuariosPerfil($paginaId);
     
         echo json_encode($response);
     
         }else if($accion=='actualizarPermisosUsuario'){


            $idPermisos = $_POST['idPermisos'];
            $idUsuario = $_POST['idUsuario'];
            $controller->actualizarPermisosUsuario($idPermisos,$idUsuario);
    
        }else if($accion=='eliminarUsuarios'){

            $arrayFinal = $_POST['arrayFinal'];
    
    
            $response = $controller->deleteUsers($arrayFinal);
    
            echo json_encode($response);
            
        } else if($accion=='eliminarProducto'){

        $arrayFinal = $_POST['arrayFinal'];


        $response = $controller->deleteProducto($arrayFinal);

        echo json_encode($response);

    }

    

    
    
    
    
    


?>