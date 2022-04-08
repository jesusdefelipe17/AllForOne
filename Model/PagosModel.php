<?php

class PagosModel{

    function crearConexion(){

        include_once ('../Configuracion/conexion.php');
        $conexion = new conexion();
        $conexionReturn = $conexion->crearConexion();
        return $conexionReturn;
    }

    function insertPayPaypal($paypalObject){



        $pagosModel = new PagosModel();

        $conexion = $pagosModel->crearConexion();
     
        include_once ('../Beans/paypalObject.php');
	

            if($conexion->connect_error){
                die("Conexion fallida: ".$conexion->connect_error);
                
            }else{
                
                $sql = "INSERT INTO paypal VALUES( 
                    '".$paypalObject ->__get("idPaypal")."',
                     '".$paypalObject ->__get("idPedido")."',
                    '".$paypalObject ->__get("paymentToken")."',
                    '".$paypalObject ->__get("accessToken")."',
                    ".$paypalObject ->__get("precio").",
                    '".$paypalObject ->__get("pago")."')" ;
            
                  
                $result = $conexion->query($sql);
                
                if(mysqli_query($conexion,$sql)){
                   
                }
                
                
            }
        
    }
    function insertPayEthereum($paypalObject){



        $pagosModel = new PagosModel();

        $conexion = $pagosModel->crearConexion();
     
        include_once ('../Beans/paypalObject.php');
	

            if($conexion->connect_error){
                die("Conexion fallida: ".$conexion->connect_error);
                
            }else{
                
                $sql = "INSERT INTO paypal VALUES( 
                    '".$paypalObject ->__get("idPaypal")."',
                     '".$paypalObject ->__get("idPedido")."',
                    '".$paypalObject ->__get("paymentToken")."',
                    '".$paypalObject ->__get("accessToken")."',
                    ".$paypalObject ->__get("precio").",
                    '".$paypalObject ->__get("pago")."')" ;
            
                 
                $result = $conexion->query($sql);
               
                if(mysqli_query($conexion,$sql)){
                   
                }
                
                
            }
        
    }

    function insertPedido($pedidosObject){



        $pagosModel = new PagosModel();

        $conexion = $pagosModel->crearConexion();
     
        include_once ('../Beans/paypalObject.php');
	

            if($conexion->connect_error){
                die("Conexion fallida: ".$conexion->connect_error);
                
            }else{
                
                $sql = "INSERT INTO pedidos VALUES( 
                    '".$pedidosObject ->__get("idPedido")."',
                    '".$pedidosObject ->__get("idUsuario")."',
                    '".$pedidosObject ->__get("estado")."',
                    '".$pedidosObject ->__get("nombre")."',
                    '".$pedidosObject ->__get("direccion")."',
                    '".$pedidosObject ->__get("ciudad")."',
                    '".$pedidosObject ->__get("provincia")."',
                    '".$pedidosObject ->__get("codigoPostal")."')";
                   
            
                  
                $result = $conexion->query($sql);
                if(mysqli_query($conexion,$sql)){
                   
                }
                
                
            }
        
    }

    function insertProductoPedidos($productoPedidos){

            $pagosModel = new PagosModel();

            $conexion = $pagosModel->crearConexion();
     
            if($conexion->connect_error){
                die("Conexion fallida: ".$conexion->connect_error);
                
            }else{
                
                $sql = "INSERT INTO productopedidos VALUES( 
                    '".$productoPedidos ->__get("idPedido")."',
                     '".$productoPedidos ->__get("idProducto")."',
                     ".$productoPedidos ->__get("cantidad").")" ;
            
             
                $result = $conexion->query($sql);
               
                if(mysqli_query($conexion,$sql)){
                   
                }
                
                
            }
        
    }



}
    ?>