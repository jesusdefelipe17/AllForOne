<?php

class ProductosModel{

    function crearConexion(){

        include_once ('../Configuracion/conexion.php');
        $conexion = new conexion();
        $conexionReturn = $conexion->crearConexion();
        return $conexionReturn;
    }

    function selectProductoCategoria($categoria){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		$sql = "SELECT * FROM productos where categoriaProducto='".$categoria."' ORDER BY RAND() LIMIT 6";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$producto = new producto();
				$producto->__set("idProducto",$row["idProducto"]);
				$producto->__set("nombreProducto",$row["nombreProducto"]);
				$producto->__set("descripcionProducto",$row["descripcionProducto"]);
				$producto->__set("precioProducto",$row["precioProducto"]);
				$producto->__set("imagenProducto",base64_encode($row["imagenProducto"]));
				$producto->__set("tallaProducto",$row["tallaProducto"]);
				$producto->__set("colorProducto",$row["colorProducto"]);
				$producto->__set("cantidadProducto",$row["cantidadProducto"]);
				$producto->__set("categoriaProducto",$row["categoriaProducto"]);
				
				
				array_push($productos,$producto);
			}
				return $productos;
		}
		
	
	}
        
    }
	function selectProductosBusqueda($paginaId,$busqueda,$filtroMostrarProductos){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		

		$inicio = ($paginaId-1)*6;


		$productos = array();
	
		$sql = $filtroMostrarProductos." ORDER BY idProducto LIMIT ".$inicio.",6";
		
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$producto = new producto();
				$producto->__set("idProducto",$row["idProducto"]);
				$producto->__set("nombreProducto",$row["nombreProducto"]);
				$producto->__set("descripcionProducto",$row["descripcionProducto"]);
				$producto->__set("precioProducto",$row["precioProducto"]);
				$producto->__set("imagenProducto",base64_encode($row["imagenProducto"]));
				$producto->__set("tallaProducto",$row["tallaProducto"]);
				$producto->__set("colorProducto",$row["colorProducto"]);
				$producto->__set("cantidadProducto",$row["cantidadProducto"]);
				$producto->__set("categoriaProducto",$row["categoriaProducto"]);
				
				
				array_push($productos,$producto);
			}
				return $productos;
		}
		
	
	}
        
    }


	public function insertarProducto($producto,$imagenProducto){


		$listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     

		if (isset($_FILES['imagen_producto']['name'])) {
			$tipoArchivo = $_FILES['imagen_producto']['type'];
			$nombreArchivo = $_FILES['imagen_producto']['name'];
			$tamanoArchivo = $_FILES['imagen_producto']['size'];
			$imagenSubida = fopen($_FILES['imagen_producto']['tmp_name'], 'r');
			$binariosImagen = fread($imagenSubida, $tamanoArchivo);
		
		
			$binariosImagen = mysqli_escape_string($conexion, $binariosImagen);

		}
		$producto->__set("imagenProducto", $binariosImagen);
        
	
		
		if($conexion->connect_error){
			die("Conexion fallida: ".$conexion->connect_error);
			
		}else{
		
		

			$sql = "INSERT INTO productos VALUES( 
				'".$producto ->__get("idProducto")."',
				'".$producto ->__get("nombreProducto")."',
				'".$producto ->__get("descripcionProducto")."',
				'".$producto ->__get("precioProducto")."',
				'".$producto ->__get("imagenProducto")."',
				'".$producto ->__get("tallProducto")."',
				'".$producto ->__get("colorProducto")."',
				".$producto ->__get("cantidadProducto").",
				'".$producto ->__get("categoriaProducto")."')" ;
			
				
			
		
			$result = $conexion->query($sql);
			if(mysqli_query($conexion,$sql)){
			
			}
			header("Location: ../View/perfil.html"); 

		
		}
	
	}

	function selectProductosBaratos($barato){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
		include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		$sql = "SELECT * FROM productos where precioProducto<".$barato." ORDER BY RAND() LIMIT 6";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$producto = new producto();
				$producto->__set("idProducto",$row["idProducto"]);
				$producto->__set("nombreProducto",$row["nombreProducto"]);
				$producto->__set("descripcionProducto",$row["descripcionProducto"]);
				$producto->__set("precioProducto",$row["precioProducto"]);
				$producto->__set("imagenProducto",base64_encode($row["imagenProducto"]));
				$producto->__set("tallaProducto",$row["tallaProducto"]);
				$producto->__set("colorProducto",$row["colorProducto"]);
				$producto->__set("cantidadProducto",$row["cantidadProducto"]);
				$producto->__set("categoriaProducto",$row["categoriaProducto"]);
				
				
				array_push($productos,$producto);
			}
				return $productos;
		}
		
	
	}
        
    }

	function selectProductById($id){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		$sql = "SELECT * FROM productos where idProducto='".$id."'";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$producto = new producto();
				$producto->__set("idProducto",$row["idProducto"]);
				$producto->__set("nombreProducto",$row["nombreProducto"]);
				$producto->__set("descripcionProducto",$row["descripcionProducto"]);
				$producto->__set("precioProducto",$row["precioProducto"]);
				$producto->__set("imagenProducto",base64_encode($row["imagenProducto"]));
				$producto->__set("tallaProducto",$row["tallaProducto"]);
				$producto->__set("colorProducto",$row["colorProducto"]);
				$producto->__set("cantidadProducto",$row["cantidadProducto"]);
				$producto->__set("categoriaProducto",$row["categoriaProducto"]);
				
				
				array_push($productos,$producto);
			}
				return $productos;
		}
		
	
	}
        
    }

	function selectProductos($paginaId,$categoria,$filtroMostrarProductos){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
		include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		

		$inicio = ($paginaId-1)*6;


		$productos = array();
	
		
		$sql = $filtroMostrarProductos." ORDER BY idProducto LIMIT ".$inicio.",6";
		
		
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$producto = new producto();
				$producto->__set("idProducto",$row["idProducto"]);
				$producto->__set("nombreProducto",$row["nombreProducto"]);
				$producto->__set("descripcionProducto",$row["descripcionProducto"]);
				$producto->__set("precioProducto",$row["precioProducto"]);
				$producto->__set("imagenProducto",base64_encode($row["imagenProducto"]));
				$producto->__set("tallaProducto",$row["tallaProducto"]);
				$producto->__set("colorProducto",$row["colorProducto"]);
				$producto->__set("cantidadProducto",$row["cantidadProducto"]);
				$producto->__set("categoriaProducto",$row["categoriaProducto"]);
				
				
				array_push($productos,$producto);
			}
				return $productos;
		}
		
	
	}
        
    }
	function selectProductosPerfil($paginaId){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
		include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		

		$inicio = ($paginaId-1)*6;


		$productos = array();
	
		
		$sql = "SELECT * FROM productos ORDER BY idProducto LIMIT ".$inicio.",6";
		
		
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$producto = new producto();
				$producto->__set("idProducto",$row["idProducto"]);
				$producto->__set("nombreProducto",$row["nombreProducto"]);
				$producto->__set("descripcionProducto",$row["descripcionProducto"]);
				$producto->__set("precioProducto",$row["precioProducto"]);
				$producto->__set("imagenProducto",base64_encode($row["imagenProducto"]));
				$producto->__set("tallaProducto",$row["tallaProducto"]);
				$producto->__set("colorProducto",$row["colorProducto"]);
				$producto->__set("cantidadProducto",$row["cantidadProducto"]);
				$producto->__set("categoriaProducto",$row["categoriaProducto"]);
				
				
				array_push($productos,$producto);
			}
				return $productos;
		}
		
	
	}
        
    }
	

	function selectProductosCountCategoria($categoria,$filtro){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
		include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		
		$sql =$filtro;
			
			
		
		
		
		$result = $conexion->query($sql);
		$paginacion;
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				$paginacion = $row["paginacion"];
				
				
				array_push($productos,$paginacion);
			}
				return $productos;
		}
		
	
	}
        
    }

	function selectProductosCountCategoriaPerfil($categoria){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
		include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		
		$sql ="SELECT COUNT(*) as paginacion FROM productos";
			
			
		$result = $conexion->query($sql);
		$paginacion;
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				$paginacion = $row["paginacion"];
				
				
				array_push($productos,$paginacion);
			}
				return $productos;
		}
		
	
	}
        
    }
	function selectProductosCountBusqueda($busqueda,$filtro){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
		include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		$sql =$filtro;
			
		
		
		
		$result = $conexion->query($sql);
		$paginacion;
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				$paginacion = $row["paginacion"];
				
				
				array_push($productos,$paginacion);
			}
				return $productos;
		}
		
	
	}
        
    }

	function selectIdPedido($idPedido){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/productoPedidoObject.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		$sql = "SELECT po.nombreProducto,po.precioProducto,po.imagenProducto,pp.idPedido,pe.direccion,pe.nombreyapellido,pe.ciudad,pe.provincia,pe.codigoPostal, po.descripcionProducto,pe.estado,pp.cantidad FROM productos po,productopedidos pp, pedidos pe where po.idProducto=pp.idProducto and pp.idPedido=pe.idPedido and pe.idPedido='".$idPedido."'";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$productoPedidoObject = new productoPedidoObject();		
				$productoPedidoObject->__set("nombreProducto",$row["nombreProducto"]);
				$productoPedidoObject->__set("precioProducto",$row["precioProducto"]);
				$productoPedidoObject->__set("imagenProducto",base64_encode($row["imagenProducto"]));
				$productoPedidoObject->__set("descripcionProducto",$row["descripcionProducto"]);
				$productoPedidoObject->__set("idPedido",$row["idPedido"]);
				$productoPedidoObject->__set("direccion",$row["direccion"]);
				$productoPedidoObject->__set("nombreyapellido",$row["nombreyapellido"]);
				$productoPedidoObject->__set("ciudad",$row["ciudad"]);
				$productoPedidoObject->__set("provincia",$row["provincia"]);
				$productoPedidoObject->__set("estado",$row["estado"]);
				$productoPedidoObject->__set("codigoPostal",$row["codigoPostal"]);
				$productoPedidoObject->__set("cantidad",$row["cantidad"]);
				
				
				
				array_push($productos,$productoPedidoObject);
			}
				return $productos;
		}
		
	
	}
        
    }
	function selectIdPedidoByPago($idPedido){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/ProductoPedidosPagoObject.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
		$sql = "SELECT idPedido,precio FROM paypal WHERE idPedido='".$idPedido."'";
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$ProductoPedidosPagoObject = new ProductoPedidosPagoObject();		
				$ProductoPedidosPagoObject->__set("precio",$row["precio"]);
				$ProductoPedidosPagoObject->__set("idPedido",$row["idPedido"]);
			
			
				
				
				
				array_push($productos,$ProductoPedidosPagoObject);
			}
				return $productos;
		}
		
	
	}
        
    }

	

	function selectIdPedidoByUser($id,$estado,$paginaId){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/productoPedidoObject.php');
	
		$inicio = ($paginaId-1)*3;

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{

		
		$productos = array();
		$sql = "SELECT idPedido,estado FROM pedidos where idUsuario=".$id." and estado='".$estado."' ORDER BY idPedido LIMIT ".$inicio.",3";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$productoPedidoObject = new productoPedidoObject();		
				$productoPedidoObject->__set("idPedido",$row["idPedido"]);
				$productoPedidoObject->__set("estado",$row["estado"]);
				
				
				
				
				array_push($productos,$productoPedidoObject);
			}
				return $productos;
		}
		
	
	}
        
    }

	function detallePedidoUsuarioEnviadoCancelado($id,$estado,$paginaId){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/productoPedidoObject.php');
	
		$inicio = ($paginaId-1)*6;

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		
		$productos = array();
		$sql = "SELECT idPedido,estado FROM pedidos where idUsuario=".$id." and (estado='enviado' or estado='cancelado') ORDER BY idPedido LIMIT ".$inicio.",6";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$productoPedidoObject = new productoPedidoObject();		
				$productoPedidoObject->__set("idPedido",$row["idPedido"]);
				$productoPedidoObject->__set("estado",$row["estado"]);
				
				
				
				
				array_push($productos,$productoPedidoObject);
			}
				return $productos;
		}
		
	
	}
        
    }
	
	function selectIdPedidoByManager($paginaId,$estado){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
        include_once ('../Beans/productoPedidoObject.php');
	
		$inicio = ($paginaId-1)*6;


	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{

		
		$productos = array();
		$sql = "SELECT pe.idPedido,pe.estado,us.nombre,pa.pago,pa.precio FROM pedidos pe, usuarios us, paypal pa where pe.idUsuario=us.id and pe.idPedido=pa.idPedido and estado='".$estado."' ORDER BY  pe.idPedido LIMIT ".$inicio.",6";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

			while($row = $result->fetch_assoc()) {
			

				
				
				$productoPedidoObject = new productoPedidoObject();		
				$productoPedidoObject->__set("idPedido",$row["idPedido"]);
				$productoPedidoObject->__set("estado",$row["estado"]);
				$productoPedidoObject->__set("nombre",$row["nombre"]);
				$productoPedidoObject->__set("pago",$row["pago"]);
				$productoPedidoObject->__set("precio",$row["precio"]);
				
				
				
				
				array_push($productos,$productoPedidoObject);
			}
				return $productos;
		}
		
	
	}
        
    }

	public function updatePedido($estado,$idPedido){
		

        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     

	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
			$sql = "UPDATE pedidos SET estado='".$estado."' where idPedido='".$idPedido."'";
			
			$result = $conexion->query($sql);
			if(mysqli_query($conexion,$sql)){
				
			}
			
				
		}
		
	
	}

	public function restarCantidadesProducto($idProducto,$cantidad){
		

        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();

		$producto = $listarProductosModel->selectProductById($idProducto);
     

		$cantF = $producto[0]->cantidadProducto-$cantidad;

		if($cantF<0){

			$cantidad=0;

		}
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
			$sql = "UPDATE productos SET cantidadProducto=".$cantidad." where idProducto='".$idProducto."'";
			
			$result = $conexion->query($sql);
			if(mysqli_query($conexion,$sql)){
				
			}
			
				
		}
		
	
	}

	function updateProducto($producto){



        $listarProductosModel = new ProductosModel();

        $conexion = $listarProductosModel->crearConexion();
     
		include_once ('../Beans/producto.php');
	

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		
		$sql = "UPDATE productos SET categoriaProducto='".$producto ->__get("categoriaProducto")."',cantidadProducto='".$producto ->__get("cantidadProducto")."',colorProducto='".$producto ->__get("colorProducto")."',precioProducto=".$producto ->__get("precioProducto").",nombreProducto='".$producto ->__get("nombreProducto")."',descripcionProducto='".$producto ->__get("descripcionProducto")."' 
		where idProducto='".$producto ->__get("idProducto")."'";
		
		$result = $conexion->query($sql);
		if(mysqli_query($conexion,$sql)){

		
		}
		
	
	}
        
}

function selectCountPedidosWithEstado($estado){



	$listarProductosModel = new ProductosModel();

	$conexion = $listarProductosModel->crearConexion();


	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
	
		$sql = "SELECT COUNT(*) as paginacion FROM pedidos WHERE estado='".$estado."'";
	
	
	
	$result = $conexion->query($sql);
	$paginacion;
	if(mysqli_query($conexion,$sql)){

		while($row = $result->fetch_assoc()) {
		

			$paginacion = $row["paginacion"];
			
			
			array_push($productos,$paginacion);
		}
			return $productos;
	}
	

}
	
}
function selectCountPedidosWithEstadoWithUser($id,$estado){



	$listarProductosModel = new ProductosModel();

	$conexion = $listarProductosModel->crearConexion();



	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$productos = array();
	
		if (strpos($estado, '/')) {

		
	
			$sql = "SELECT COUNT(*) as paginacion FROM pedidos WHERE idUsuario=".$id." and (estado='enviado' or estado='cancelado') ORDER BY idUsuario ";
		}else{
			$sql = "SELECT COUNT(*) as paginacion FROM pedidos WHERE estado='".$estado."' and idUsuario=".$id."";
		}
	
	
	
	$result = $conexion->query($sql);
	$paginacion;
	if(mysqli_query($conexion,$sql)){

		while($row = $result->fetch_assoc()) {
		

			$paginacion = $row["paginacion"];
			
			
			array_push($productos,$paginacion);
		}
			return $productos;
	}
	

}
	
}


function deleteProducto($id){



	$listarProductosModel = new ProductosModel();

	$conexion = $listarProductosModel->crearConexion();
 
	 include_once ('../Beans/producto.php');


if($conexion->connect_error){
	die("Conexion fallida: ".$conexion->connect_error);
	
}else{
	
	
	$sql = "DELETE FROM productos where idProducto='".$id."'";

	echo $sql;
	
	$result = $conexion->query($sql);
	if(mysqli_query($conexion,$sql)){

	
	}
	

}
	
}


	
	

}
    ?>