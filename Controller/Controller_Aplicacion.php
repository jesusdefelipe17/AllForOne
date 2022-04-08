<?php 
class Controller_Aplicacion {

	public function conexion(){
		$servidor="localhost";
		$nombreUsuario="root";
		$pass="";
		$db="allforone";
		$conexion = new mysqli($servidor,$nombreUsuario,$pass,$db);
		return $conexion;
	}
	

	function selectProductos($paginaId,$categoria,$filtroMostrarProductos){

	include_once ('../Model/ProductosModel.php');

	$productosModel = new ProductosModel();

	$productos = array();

	$productos = $productosModel->selectProductos($paginaId,$categoria,$filtroMostrarProductos);

	$arrayP = (array) $productos;
        
	$response = array();
	foreach($arrayP as $value){
	
	
		$response[] = array(
				"idProducto" => $value ->__get("idProducto"),
				"nombreProducto" => $value ->__get("nombreProducto"),
				"descripcionProducto" => $value ->__get("descripcionProducto"),
				"precioProducto" => $value ->__get("precioProducto"),
				"imagenProducto" => $value ->__get("imagenProducto"),
				"tallaProducto" => $value ->__get("tallaProducto"),
				"colorProducto" => $value ->__get("colorProducto"),
				"cantidadProducto" => $value ->__get("cantidadProducto"),
				"categoriaProducto" => $value ->__get("categoriaProducto")
			);
	}

	return $response;

	}
	function selectProductosPerfil($paginaId){

		include_once ('../Model/ProductosModel.php');
	
		$productosModel = new ProductosModel();
	
		$productos = array();
	
		$productos = $productosModel->selectProductosPerfil($paginaId);
	
		$arrayP = (array) $productos;
			
		$response = array();
		foreach($arrayP as $value){
		
		
			$response[] = array(
					"idProducto" => $value ->__get("idProducto"),
					"nombreProducto" => $value ->__get("nombreProducto"),
					"descripcionProducto" => $value ->__get("descripcionProducto"),
					"precioProducto" => $value ->__get("precioProducto"),
					"imagenProducto" => $value ->__get("imagenProducto"),
					"tallaProducto" => $value ->__get("tallaProducto"),
					"colorProducto" => $value ->__get("colorProducto"),
					"cantidadProducto" => $value ->__get("cantidadProducto"),
					"categoriaProducto" => $value ->__get("categoriaProducto")
				);
		}
	
		return $response;
	
		}

	function selectProductosCountCategoria($categoria,$filtro){

		include_once ('../Model/ProductosModel.php');
	
		$productosModel = new ProductosModel();
	
		$productos = array();
	
		$productos = $productosModel->selectProductosCountCategoria($categoria,$filtro);
	
		$arrayP = (array) $productos;
			
		$response = array();
		foreach($arrayP as $value){
		
		
			$response[] = array(
				"paginacion" => $value
				);
		}
	
		return $response;
	
		}

		function selectProductosCountCategoriaPerfil($categoria){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectProductosCountCategoriaPerfil($categoria);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
					"paginacion" => $value
					);
			}
		
			return $response;
		
			}
		
		
	function selectProductosCountBusqueda($busqueda,$filtro){

		include_once ('../Model/ProductosModel.php');
	
		$productosModel = new ProductosModel();
	
		$productos = array();
	
		$productos = $productosModel->selectProductosCountBusqueda($busqueda,$filtro);
	
		$arrayP = (array) $productos;
			
		$response = array();
		foreach($arrayP as $value){
		
		
			$response[] = array(
				"paginacion" => $value
				);
		}
	
		return $response;
	
		}

		

function selectProductByCategory($categoria){

	include_once ('../Model/ProductosModel.php');

	$productosModel = new ProductosModel();

	$productos = array();

	$productos = $productosModel->selectProductoCategoria($categoria);

	$arrayP = (array) $productos;
        
	$response = array();
	foreach($arrayP as $value){
	
	
		$response[] = array(
				"idProducto" => $value ->__get("idProducto"),
				"nombreProducto" => $value ->__get("nombreProducto"),
				"descripcionProducto" => $value ->__get("descripcionProducto"),
				"precioProducto" => $value ->__get("precioProducto"),
				"imagenProducto" => $value ->__get("imagenProducto"),
				"tallaProducto" => $value ->__get("tallaProducto"),
				"colorProducto" => $value ->__get("colorProducto"),
				"cantidadProducto" => $value ->__get("cantidadProducto"),
				"categoriaProducto" => $value ->__get("categoriaProducto")
			);
	}

	return $response;
	
}  


function selectUserById($email,$password){

			include_once ('../Model/UserModel.php');
			$userModel = new UserModel();
			$usuario = $userModel->selectUserId($email,$password);
			if(is_null($usuario)){

				header("Location: ../View/login.html?error_login_user");
				

			}else{
			
			$response[] = array(
				"id" => $usuario ->__get("id"),
				"email" => $usuario ->__get("email"),
						"nombre" => $usuario ->__get("nombre"),
						"imagenUsuario" => $usuario ->__get("imagenUsuario"),
						"balance" => $usuario ->__get("balance"),
						"idPermisos" => $usuario ->__get("idPermisos")
				);
			
			$usuarioJSON = json_encode($response[0]);
			
			?>
			<script>
						<?php
						echo "var usuario ='$usuarioJSON';";
						?>
						sessionStorage.setItem('usuario', usuario);
						window.setTimeout( function(){
									window.location = "../View/perfil.html";
						}, 1000 );
						
					</script>
			<?php
				
			}

		

		}

		function selectUserByEmail($email){

			include_once ('../Model/UserModel.php');
			$userModel = new UserModel();
			$usuario = $userModel->selectUserByEmail($email);
			
			return $usuario;

		}
		

		function insertUsuario($email,$password,$nombre,$imagen){

			include_once ('../Model/UserModel.php');
			$userModel = new UserModel();
			$usuario = $userModel->insertUsuario($email,$password,$nombre,$imagen);
			header("Location: ../View/login.html");
			die();
			

		}
		function addUserToSession($idUsuario){

			include_once ('../Model/UserModel.php');
			$userModel = new UserModel();
			$usuario = $userModel->selectUser($idUsuario);
			if(is_null($usuario)){
				header("Location: ../View/login.html"); 

			}else{
			
			$response[] = array(
				"id" => $usuario ->__get("id"),
				"email" => $usuario ->__get("email"),
						"nombre" => $usuario ->__get("nombre"),
						"imagenUsuario" => $usuario ->__get("imagenUsuario"),
						"balance" => $usuario ->__get("balance"),
						"idPermisos" => $usuario ->__get("idPermisos")
				);
			
			$usuarioJSON = json_encode($response[0]);
			
			?>
			<script>
						<?php
						echo "var usuario ='$usuarioJSON';";
						?>
						sessionStorage.setItem('usuario', usuario);
						window.setTimeout( function(){
									window.location = "../View/perfil.html";
						}, 1000 );
						
					</script>
			<?php
				
			}


		}

		function selectUserId($idUsuario){

			include_once ('../Model/UserModel.php');
			$userModel = new UserModel();
			$usuario = $userModel->selectUser($idUsuario);
				
			return $usuario;


		}

		



		function updateUserById($email,$nombre,$id,$imagen){

			include_once ('../Model/UserModel.php');
			$userModel = new UserModel();
			$userModel->updateUserById($email,$nombre,$id,$imagen);
		
				
			}


		



		function pagarPaypal($paymentId,$paymentToken,$pedidoObject){

			include_once ('../Model/PagosModel.php');
			$pagosModel = new PagosModel();
			
			$CLIENT = 'AXVh-koQ0Pxkzsxyyenm2x8BzbChIz4GExaFHoao10gjuKSUKFGTzkAIlfM7oPnCVU-xinp6U3ZZhtXT';
			$SECRET = 'EMtWpR-RRqY6-EE7GYs9PkUK3Konmj7iMDwU2pgwPNlWhVaVfYFaZegThJwraEZuGsvbwNQw0jOlUEas';


			$login = curl_init('https://api-m.sandbox.paypal.com/v1/oauth2/token');

			curl_setopt($login, CURLOPT_RETURNTRANSFER,true);

			curl_setopt($login, CURLOPT_USERPWD,$CLIENT.":".$SECRET);

			curl_setopt($login, CURLOPT_POSTFIELDS,"grant_type=client_credentials");

			$respuesta = curl_exec($login);


			$objetoRespuesta = json_decode($respuesta);

			$accesToken = $objetoRespuesta->access_token;


			$ventaProducto = curl_init('https://api-m.sandbox.paypal.com/v1/payments/payment/'.$paymentId);

			curl_setopt($ventaProducto,  CURLOPT_HTTPHEADER, array('Content-Type: application/json' ,'Authorization: Bearer '.$accesToken));

			curl_setopt($ventaProducto, CURLOPT_RETURNTRANSFER,true);

			$respuestaVenta = curl_exec($ventaProducto);


			$objetoTransaccion = json_decode($respuestaVenta);


			$total = $objetoTransaccion->transactions[0]->amount->total;

			$pago = $objetoTransaccion->transactions[0]->related_resources[0]->sale->state;

			include_once ('../Beans/paypalObject.php');
			$paypalObject = new paypalObject();

			$paypalObject->__set("idPaypal",$paymentId);
			$paypalObject->__set("paymentToken",$paymentToken);
			$paypalObject->__set("idPedido",$pedidoObject->__get("idPedido"));
			$paypalObject->__set("accessToken",$accesToken);
			$paypalObject->__set("precio",$total);
			$paypalObject->__set("pago",$pago);


			$pagosModel->insertPedido($pedidoObject);

			$pagosModel->insertPayPaypal($paypalObject);



			//Añadir borrar las cantidades que haya comprado una persona 

			
			return $objetoTransaccion;

			

		}

		function insertarProducto ($idProducto,$nombreProducto,$descripcionProducto,$precioProducto,$imagenProducto,$tallaProducto,$colorProducto,$cantidadProducto,$categoriaProducto) {

			include_once ('../Model/ProductosModel.php');
			include_once ('../Beans/producto.php');
	
			$productosModel = new ProductosModel();
	
			$producto = new producto();
			$producto->__set("idProducto",$idProducto );
			$producto->__set("nombreProducto", $nombreProducto);
			$producto->__set("descripcionProducto",$descripcionProducto);
			$producto->__set("precioProducto", $precioProducto);
			$producto->__set("tallaProducto", $tallaProducto);
			$producto->__set("colorProducto", $colorProducto);
			$producto->__set("cantidadProducto", $cantidadProducto);
			$producto->__set("categoriaProducto", $categoriaProducto);

			

			$productosModel->insertarProducto($producto,$imagenProducto);

		}
		function selectProductosBaratos($barato){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectProductosBaratos($barato);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
						"idProducto" => $value ->__get("idProducto"),
						"nombreProducto" => $value ->__get("nombreProducto"),
						"descripcionProducto" => $value ->__get("descripcionProducto"),
						"precioProducto" => $value ->__get("precioProducto"),
						"imagenProducto" => $value ->__get("imagenProducto"),
						"tallaProducto" => $value ->__get("tallaProducto"),
						"colorProducto" => $value ->__get("colorProducto"),
						"cantidadProducto" => $value ->__get("cantidadProducto"),
						"categoriaProducto" => $value ->__get("categoriaProducto")
					);
			}
		
			return $response;
			
		} 

		function selectProductById($id){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectProductById($id);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
						"idProducto" => $value ->__get("idProducto"),
						"nombreProducto" => $value ->__get("nombreProducto"),
						"descripcionProducto" => $value ->__get("descripcionProducto"),
						"precioProducto" => $value ->__get("precioProducto"),
						"imagenProducto" => $value ->__get("imagenProducto"),
						"tallaProducto" => $value ->__get("tallaProducto"),
						"colorProducto" => $value ->__get("colorProducto"),
						"cantidadProducto" => $value ->__get("cantidadProducto"),
						"categoriaProducto" => $value ->__get("categoriaProducto")
					);
			}
		
			return $response;
			
		} 
		function insertarPagoEthereum($pedidoObject, $idTransaction,$total){

			include_once ('../Model/PagosModel.php');
			$pagosModel = new PagosModel();
			

			include_once ('../Beans/paypalObject.php');
			$paypalObject = new paypalObject();

			$paypalObject->__set("idPaypal",$idTransaction);
			$paypalObject->__set("paymentToken","null");
			$paypalObject->__set("idPedido",$pedidoObject->__get("idPedido"));
			$paypalObject->__set("accessToken","null");
			$paypalObject->__set("precio",$total);
			$paypalObject->__set("pago","completed");


			$pagosModel->insertPedido($pedidoObject);

			$pagosModel->insertPayPaypal($paypalObject);


			return $pedidoObject;

			
			

			

		}

       
		function insertarProductoPedido($ids,$idPedido,$arrayCantidades){

		
			include_once ('../Model/PagosModel.php');
			$pagosModel = new PagosModel();


			include_once ('../Beans/ProductoPedidos.php');
			$productoPedidos = new ProductoPedidos();

			

			for ($i=0; $i < count($ids) ; $i++) { 
				
				$productoPedidos->__set("idPedido",$idPedido);
				$productoPedidos->__set("idProducto",$ids[$i]);
				$productoPedidos->__set("cantidad",$arrayCantidades[$i]);
				$pagosModel->insertProductoPedidos($productoPedidos);
			}

			

		}

		function selectIdPedido($idPedido){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectIdPedido($idPedido);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
						"nombreProducto" => $value ->__get("nombreProducto"),
						"precioProducto" => $value ->__get("precioProducto"),
						"imagenProducto" => $value ->__get("imagenProducto"),
						"descripcionProducto" => $value ->__get("descripcionProducto"),
						"idPedido" => $value ->__get("idPedido"),
						"direccion" => $value ->__get("direccion"),
						"nombreyapellido" => $value ->__get("nombreyapellido"),
						"ciudad" => $value ->__get("ciudad"),
						"provincia" => $value ->__get("provincia"),
						"estado" => $value ->__get("estado"),
						"codigoPostal" => $value ->__get("codigoPostal"),
						"cantidad" => $value ->__get("cantidad")
					);
			}
		
			return $response;
			
		} 
		function selectIdPedidoByPago($idPedido){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectIdPedidoByPago($idPedido);
		
		
			return $productos;
			
		} 
		

		

		function selectIdPedidoByUser($id,$estado,$paginaId){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectIdPedidoByUser($id,$estado,$paginaId);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
						
						"idPedido" => $value ->__get("idPedido"),
						"estado" => $value ->__get("estado")
					);
			}
		
			return $response;
			
		} 
		function detallePedidoUsuarioEnviadoCancelado($id,$estado,$paginaId){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->detallePedidoUsuarioEnviadoCancelado($id,$estado,$paginaId);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
						
						"idPedido" => $value ->__get("idPedido"),
						"estado" => $value ->__get("estado")
					);
			}
		
			return $response;
			
		} 
		function selectIdPedidoByManager($paginaId,$estado){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectIdPedidoByManager($paginaId,$estado);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
						
						"idPedido" => $value ->__get("idPedido"),
						"estado" => $value ->__get("estado"),
						"nombre" => $value ->__get("nombre"),
						"pago" => $value ->__get("pago"),
						"precio" => $value ->__get("precio")

					);
			}
		
			return $response;
			
		} 

		function updatePedido($estado,$idPedido){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productosModel->updatePedido($estado,$idPedido);
		
			
		} 

		function updateBalanceUserbyId($id,$shiba){

			include_once ('../Model/UserModel.php');
		
			$userModel = new UserModel();
		
			$userModel->updateBalanceUserbyId($id,$shiba);
		
			
		} 

		function payBalance($usuario,$precioPagar){
			include_once ('../Model/UserModel.php');
		
			$userModel = new UserModel();

			$balance = round($usuario ->__get("balance"), 5);
			$id=$usuario ->__get("id");

			$pagar;
	
			

			if($balance==0 && $precioPagar==0){
				$pagar=false;
				
			}else{
				if( $balance<$precioPagar){
	
				
					$pagar=false;
		
				}else{
					
					$balanceFinal= $balance-$precioPagar;
					$userModel->updateBalanceUserbyId($id,$balanceFinal);
					//sleep(3); --> CORREGIR POR Q NO ACTUALIZA EL BALANCE
					$pagar=true;
				}
			}
			
	
			return $pagar;
	

		}
		function selectProductosBusqueda($paginaId,$busqueda,$filtroMostrarProductos){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectProductosBusqueda($paginaId,$busqueda,$filtroMostrarProductos);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
						"idProducto" => $value ->__get("idProducto"),
						"nombreProducto" => $value ->__get("nombreProducto"),
						"descripcionProducto" => $value ->__get("descripcionProducto"),
						"precioProducto" => $value ->__get("precioProducto"),
						"imagenProducto" => $value ->__get("imagenProducto"),
						"tallaProducto" => $value ->__get("tallaProducto"),
						"colorProducto" => $value ->__get("colorProducto"),
						"cantidadProducto" => $value ->__get("cantidadProducto"),
						"categoriaProducto" => $value ->__get("categoriaProducto")
					);
			}
		
			return $response;
		
			}

		
			function enviarMensaje($nombre,$email,$telefono, $asunto,$mensaje, $correoDestino){
				
				
				include_once ('../PHPMailer-master/src/PHPMailer.php');
				include_once ('../PHPMailer-master/src/SMTP.php');
				include_once ('../PHPMailer-master/src/Exception.php');
				

				$mail=new PHPMailer\PHPMailer\PHPMailer();
				$mail->CharSet = 'UTF-8';

				$body ='<p>'.$mensaje.'</p>
				<p>Nombre : '.$nombre.'</p> 
				<p>Email : '.$email. '</p> 
				<p>Telefono : '.$telefono.'</p>';

				

				$mail->IsSMTP();
				$mail->Host       = 'smtp.gmail.com';
				$mail->SMTPSecure = 'tls';
				$mail->Port       = 587;
				$mail->SMTPDebug  = 0;
				$mail->SMTPAuth = false;
				$mail->SMTPAutoTLS = false; 
				$mail->Username   = 'allforoneshopweb@gmail.com';
				$mail->Password   = 'kepchu1997';
				$mail->SetFrom('allforoneshopweb@gmail.com', $nombre);
				$mail->AddReplyTo('no-reply@mycomp.com','no-reply');
				$mail->Subject    = $asunto;
				$mail->MsgHTML($body);

				$mail->AddAddress('jesusdefelipe17@gmail.com', $nombre);
				$mail->send();



				//header("Location: /AllForOne/View/contacto.html");
				//die();

				/* CODIGO PARA QUE EL ENVIO DE EMAIL FUNCIONE EN EL SERVER
 				$para = 'jesusdefelipe17@gmail.com';
			    
			    

                $mensaje = '<p>'.$mensaje.'</p>
				<p>Nombre : '.$nombre.'</p> 
				<p>Email : '.$email. '</p> 
				<p>Telefono : '.$telefono.'</p>';
				
			
                $remitente = $email; //Aquí va la dirección de quien envía el email.
               
                 
                //Cabecera de la funcion mail()
                $headers = "From: ".$remitente." \r\n";
                $headers .= "Reply-To: ".$remitente."\r\n"; //La dirección por defecto si se responde el email enviado.
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=UTF-8\r\n"; //La codificación del email.
                 
                //Mandamos el email.
               $enviado = mail($para, $asunto, $mensaje, $headers);
                if ($enviado)
                  echo 'Email enviado correctamente';
                else
                  echo 'Error en el envío del email';

				*/

			}
			
			function enviarMensajePedidoCorreo($id,$email){

				$controller = new Controller_Aplicacion();
				$response = $controller->selectIdPedido($id);

				$body=null;
				$percioTotal;
				$precioTotalEuros=null;
				$direccion;
				$numPedido;
				$resumenPedido;
				$idPedido;
				foreach ($response as $key => $value) {


					$json = json_encode($response[$key]);
			
					$pedido = json_decode($json);
				
					$precioTotalEuros = $precioTotalEuros+floatval($pedido->precioProducto*$pedido->cantidad);
				
					$idPedido = $pedido->idPedido;
					

					$body .= '<tr>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"><img class="text-center" src="data:image/jpg;base64,'. $pedido->imagenProducto.'" height="" width="50%"></td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'. $pedido->nombreProducto.'</td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'. $pedido->cantidad.'</td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'. $pedido->precioProducto*$pedido->cantidad.'</td>
					
					</tr>';
				
					$direccion=' <p>'.$pedido->direccion.','.$pedido->codigoPostal.'<br>'.$pedido->ciudad.','.$pedido->provincia.'</p>';

					$resumenPedido='<p>Estado: '.$pedido->estado.'</p>';

					$numPedido='<td width="25%" align="left"  style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> '.$pedido->idPedido.' </td>';
				}
					
				$percioTotal ='<td width="50%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL: </td>
				<td width="20%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"></td>
				<td width="20%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"></td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> '. $precioTotalEuros.' &euro;</td>';
				

					include_once ('../PHPMailer-master/src/PHPMailer.php');
					include_once ('../PHPMailer-master/src/SMTP.php');
					include_once ('../PHPMailer-master/src/Exception.php');
					
	
					$mail=new PHPMailer\PHPMailer\PHPMailer();
					$mail->CharSet = 'UTF-8';
	
					$message = file_get_contents('../templates/template_email.html');
	
					$message = str_replace('%productos%', $body, $message);
					$message = str_replace('%precioTotal%', $percioTotal, $message);
					$message = str_replace('%direccionPedido%', $direccion, $message);
					$message = str_replace('%numeroPedido%', $numPedido, $message);
					$message = str_replace('%resumenPedido%', $resumenPedido, $message);
	
					$mail->IsSMTP();
					$mail->Host       = 'smtp.gmail.com';
					$mail->SMTPSecure = 'tls';
					$mail->Port       = 587;
					$mail->SMTPDebug  = 0;
					$mail->SMTPAuth   = true;
					$mail->Username   = 'allforoneshopweb@gmail.com';
					$mail->Password   = 'kepchu1997';
					$mail->SetFrom('allforoneshopweb@gmail.com', "AllForOne");
					$mail->AddReplyTo('no-reply@mycomp.com','no-reply');
					$mail->Subject    = "Pedido AllForOne Nº".$idPedido;
					$mail->MsgHTML($message);
	
					$mail->AddAddress($email, "AllForOne");
					$mail->send();

					header("Location: ../View/detallePedido.html?idPedido=".$idPedido."");
        			die();
				

			}


			/*
function enviarMensaje($nombre,$email,$telefono, $asunto,$mensaje, $correoDestino){
				
				
			    $para = 'jesusdefelipe17@gmail.com';
			    
			    

                $mensaje = '<p>'.$mensaje.'</p>
				<p>Nombre : '.$nombre.'</p> 
				<p>Email : '.$email. '</p> 
				<p>Telefono : '.$telefono.'</p>';
				
			
                $remitente = $email; //Aquí va la dirección de quien envía el email.
               
                 
                //Cabecera de la funcion mail()
                $headers = "From: ".$remitente." \r\n";
                $headers .= "Reply-To: ".$remitente."\r\n"; //La dirección por defecto si se responde el email enviado.
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=UTF-8\r\n"; //La codificación del email.
                 
                //Mandamos el email.
               $enviado = mail($para, $asunto, $mensaje, $headers);
               
                if ($enviado) { ?>
                 <script language="javascript" type="text/javascript">
                 
                  window.location.href = '../View/contacto.html';
                 </script>
                 <?php
                 }else { ?>
                  <script language="javascript" type="text/javascript">
                 
                   window.location.href = '../View/contacto.html';
                  </script>
                 <?php }


				//header("Location: View/contacto.html");
				//die();

			}
			
			function enviarMensajePedidoCorreo($id,$email){
			    
			    
              
				$controller = new Controller_Aplicacion();
				$response = $controller->selectIdPedido($id);
              
		     
		 
				$body=null;
				$percioTotal=0;
				$precioTotalEuros=0;
				$direccion="";
				$numPedido="";
				$resumenPedido="";
				$idPedido="";
				foreach ($response as $key => $value) {


					$json = json_encode($response[$key]);
			
					$pedido = json_decode($json);
				
					$precioTotalEuros = $precioTotalEuros+floatval($pedido->precioProducto*$pedido->cantidad);
				
					$idPedido = $pedido->idPedido;
					
                   
                    
					$body .= '<tr>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"><img class="text-center" src="https://cdn-icons-png.flaticon.com/512/1554/1554561.png" height="" width="50%"></td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'. $pedido->nombreProducto.'</td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'. $pedido->cantidad.'</td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'. $pedido->precioProducto*$pedido->cantidad.'</td>
					
					</tr>';
				
				
					$direccion=' <p>'.$pedido->direccion.','.$pedido->codigoPostal.'<br>'.$pedido->ciudad.','.$pedido->provincia.'</p>';

					$resumenPedido='<p>Estado: '.$pedido->estado.'</p>';

					$numPedido='<td width="25%" align="left"  style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> '.$pedido->idPedido.' </td>';
				}
					
				$percioTotal ='<td width="50%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL: </td>
				<td width="20%" align="left" style="font-family: preOpen Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"></td>
				<td width="20%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"></td>
					<td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> '. $precioTotalEuros.' &euro;</td>';
				
				
				

			
                $message = file_get_contents('../templates/template_email.html');
            	
            	          
               
				$message = str_replace('%productos%', $body, $message);
				$message = str_replace('%precioTotal%', $percioTotal, $message);
				$message = str_replace('%direccionPedido%', $direccion, $message);
				$message = str_replace('%numeroPedido%', $numPedido, $message);
				$message = str_replace('%resumenPedido%', $resumenPedido, $message);
                

	            
			    $asunto= "Pedido AllForOne Nº".$idPedido;
			
                $remitente = "allforoneshopweb@gmail.com"; //Aquí va la dirección de quien envía el email.
               
                 
                $para = $email;
			    
			    
                 
                //Cabecera de la funcion mail()
                $headers = "From: ".$remitente." \r\n";
                $headers .= "Reply-To: ".$remitente."\r\n"; //La dirección por defecto si se responde el email enviado.
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=UTF-8\r\n"; //La codificación del email.
                
                 
                 //Mandamos el email.
               $enviado = mail($para, $asunto, $message, $headers);
               
               if($enviado){
                   
                   echo 'enviado';
               }else{
                    echo 'error';
               }
               
               	?>
               <?php
						echo "var idPedidoValor ='$idPedido';";
				
               
               
               if ($enviado) { ?>
                 <script language="javascript" type="text/javascript">
                 
                        <?php
						echo "var idPedidoValor ='$idPedido';";
						 ?>
						 
                  window.location.href = '/View/detallePedido.html?idPedido='+idPedidoValor+'';
                 </script>
                 <?php
                 }else { ?>
                  <script language="javascript" type="text/javascript">
                 
                   <?php
						echo "var idPedidoValor ='$idPedido';";
						 ?>
						 
                  window.location.href = '/View/detallePedido.html?idPedido='+idPedidoValor+'';
                  </script>
                 <?php }



				

			}



			*/


			function restarCantidadesProducto($arrayIdsProductos,$arrayCantidades){

				include_once ('../Model/ProductosModel.php');
		
				$productosModel = new ProductosModel();

				$productos = array();


				for ($i=0; $i < count($arrayIdsProductos); $i++) { 

					$productos = $productosModel->selectProductById($arrayIdsProductos[$i]);

					$cantidadFinal = ($productos[0]->cantidadProducto)-($arrayCantidades[$i]);

					$productosModel->restarCantidadesProducto($arrayIdsProductos[$i],$cantidadFinal);
				}


			}

			function updateCantidadProducto($id,$cantidadFinal){

				include_once ('../Model/ProductosModel.php');
		
				$productosModel = new ProductosModel();

				$productos = $productosModel->selectProductById($id);

				$cantidadF = ($productos[0]->cantidadProducto)-$cantidadFinal;

				if($cantidadF<0){

				}else{
					$productosModel->restarCantidadesProducto($id,$cantidadF);
				}

				

			}

			function updateProducto($arrayFinal){

			include_once ('../Model/ProductosModel.php');
			include_once ('../Beans/producto.php');

			$productosModel = new ProductosModel();
	
			
		
			$productos = array();

			for ($i=0; $i < count($arrayFinal) ; $i++) { 
        
				for ($j=0; $j < 1 ; $j++) { 
				
		
					$producto = new producto();
					$producto->__set("idProducto",$arrayFinal[$i][0]);
					$producto->__set("nombreProducto",$arrayFinal[$i][1]);
					$producto->__set("descripcionProducto",$arrayFinal[$i][2]);
					$producto->__set("precioProducto",$arrayFinal[$i][3]);
					$producto->__set("colorProducto", $arrayFinal[$i][4]);
					$producto->__set("cantidadProducto",$arrayFinal[$i][5]);
					$producto->__set("categoriaProducto", $arrayFinal[$i][6]);
					
					 $productosModel->updateProducto($producto);
			
					
				}
		
			}

				

		}
		function selectCountPedidosWithEstado($estado){

			include_once ('../Model/ProductosModel.php');
		
			$productosModel = new ProductosModel();
		
			$productos = array();
		
			$productos = $productosModel->selectCountPedidosWithEstado($estado);
		
			$arrayP = (array) $productos;
				
			$response = array();
			foreach($arrayP as $value){
			
			
				$response[] = array(
					"paginacion" => $value
					);
			}
		
			return $response;
		
			}
			function selectCountPedidosWithEstadoWithUser($id,$estado){

				include_once ('../Model/ProductosModel.php');
			
				$productosModel = new ProductosModel();
			
				$productos = array();
			
				$productos = $productosModel->selectCountPedidosWithEstadoWithUser($id,$estado);
			
				$arrayP = (array) $productos;
					
				$response = array();
				foreach($arrayP as $value){
				
				
					$response[] = array(
						"paginacion" => $value
						);
				}
			
				return $response;
			
				}

				function selectCountUsuarios(){

					include_once ('../Model/UserModel.php');

					$userModel = new UserModel();
				
					$usuarios = array();
				
					$usuarios = $userModel->selectCountUsuarios();
				
					$arrayP = (array) $usuarios;
						
					$response = array();
					foreach($arrayP as $value){
					
					
						$response[] = array(
							"paginacion" => $value
							);
					}
				
					return $response;
				
					}

					function selectUsuariosPerfil($paginaId){

						include_once ('../Model/UserModel.php');
	
						$userModel = new UserModel();
					
						$usuarios = array();
					
						$usuarios = $userModel->selectUsuariosPerfil($paginaId);
					
						$arrayP = (array) $usuarios;
							
						$response = array();
						foreach($arrayP as $value){
				
				
							$response[] = array(
									"id" => $value ->__get("id"),
									"email" => $value ->__get("email"),
									"nombre" => $value ->__get("nombre"),
									"idPermisos" => $value ->__get("idPermisos")
									
								);
						}
					
						return $response;
					
						}

						function actualizarPermisosUsuario($idPermisos,$idUsuario){

							include_once ('../Model/UserModel.php');
						
							$userModel = new UserModel();
						
							$userModel->actualizarPermisosUsuario($idPermisos,$idUsuario);
						
							
						} 

						function deleteUsers($arrayFinal){

							include_once ('../Model/UserModel.php');
							include_once ('../Beans/usuario.php');
				
							$userModel = new UserModel();
					
							
				
							for ($i=0; $i < count($arrayFinal) ; $i++) { 
						
								for ($j=0; $j < 1 ; $j++) { 
								
						
									$usuario = new usuario();
									$usuario->__set("id",$arrayFinal[$i][0]);
									
									
									 $userModel->deleteUsers($usuario);
							
									
								}
						
							}
				
								
				
						}

					

		
		function deleteProducto($arrayFinal){

			include_once ('../Model/ProductosModel.php');
			

			$productosModel = new ProductosModel();
	

			for ($i=0; $i < count($arrayFinal); $i++) { 
        
				 $productosModel->deleteProducto($arrayFinal[$i]);
			
				
		
			}

				
		}
			

		

			
		

}




?>