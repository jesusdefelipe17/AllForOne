<?php

class UserModel{

    function crearConexion(){

        include_once ('../Configuracion/conexion.php');
        $conexion = new conexion();
        $conexionReturn = $conexion->crearConexion();
        return $conexionReturn;
    }

    function insertUsuario($email,$password,$nombre,$imagen){

            

        $userModel = new UserModel();

        $conexion = $userModel->crearConexion();
    
        include_once ('../Beans/usuario.php');

        if (isset($_FILES['imagen_user']['name'])) {
            $tipoArchivo = $_FILES['imagen_user']['type'];
            $nombreArchivo = $_FILES['imagen_user']['name'];
            $tamanoArchivo = $_FILES['imagen_user']['size'];
            $imagenSubida = fopen($_FILES['imagen_user']['tmp_name'], 'r');
            $binariosImagen = fread($imagenSubida, $tamanoArchivo);
        
        
            $binariosImagen = mysqli_escape_string($conexion, $binariosImagen);

        }

       

    if($conexion->connect_error){
        die("Conexion fallida: ".$conexion->connect_error);
        
    }else{
        $sql= "INSERT INTO usuarios (email,password,nombre,idPermisos,imagenUsuario,balance) VALUES('".$email."','".$password."','".$nombre."',2,'".$binariosImagen."',0)";

     

        if($result = mysqli_query($conexion, $sql)){

          
                
        }
        
    
    }
        
}

    function selectUserId($email,$password){



                $userModel = new UserModel();

                $conexion = $userModel->crearConexion();
            
                include_once ('../Beans/usuario.php');
            

            if($conexion->connect_error){
                die("Conexion fallida: ".$conexion->connect_error);
                
            }else{
                
                if($password=="x"){

                    $sql="SELECT * FROM usuarios WHERE email='".$email."'";
                }else{
                    $sql = "SELECT * FROM usuarios WHERE email='".$email."' and password='".$password."'";
                }



                if($result = mysqli_query($conexion, $sql )){

                    if($row = $result->fetch_assoc()) {
                    
                        $usuario = new usuario();
                        $usuario->__set("id",$row["id"]);
                        $usuario->__set("email",$row["email"]);
                        $usuario->__set("password",$row["password"]);
                        $usuario->__set("nombre",$row["nombre"]);
                        $usuario->__set("balance",$row["balance"]);
                        $usuario->__set("imagenUsuario",base64_encode($row["imagenUsuario"]));
                        $usuario->__set("idPermisos",$row["idPermisos"]);
                    

                        return $usuario;

                    }
                        
                }
                
            
            }
                
        }
        function selectUserByEmail($email){



            $userModel = new UserModel();

            $conexion = $userModel->crearConexion();
        
            include_once ('../Beans/usuario.php');
        

        if($conexion->connect_error){
            die("Conexion fallida: ".$conexion->connect_error);
            
        }else{
            
        

            $sql="SELECT * FROM usuarios WHERE email='".$email."'";
            
            if($result = mysqli_query($conexion, $sql )){

                if($row = $result->fetch_assoc()) {
                
                    $usuario = new usuario();
                    $usuario->__set("id",$row["id"]);
                    $usuario->__set("email",$row["email"]);
                    $usuario->__set("password",$row["password"]);
                    $usuario->__set("nombre",$row["nombre"]);
                    $usuario->__set("balance",$row["balance"]);
                    $usuario->__set("imagenUsuario",base64_encode($row["imagenUsuario"]));
                    $usuario->__set("idPermisos",$row["idPermisos"]);
                

                    return $usuario;

                }
                    
            }
            
        
        }
            
    }

        

        function updateUserById($email,$nombre,$id,$imagen){

            

            $userModel = new UserModel();

            $conexion = $userModel->crearConexion();
        
            include_once ('../Beans/usuario.php');

            
            if (isset($_FILES['imagen_user']['name'])) {
                $tipoArchivo = $_FILES['imagen_user']['type'];
                $nombreArchivo = $_FILES['imagen_user']['name'];
                $tamanoArchivo = $_FILES['imagen_user']['size'];
                $imagenSubida = fopen($_FILES['imagen_user']['tmp_name'], 'r');
                $binariosImagen = fread($imagenSubida, $tamanoArchivo);
            
            
                $binariosImagen = mysqli_escape_string($conexion, $binariosImagen);
    
            }
        

        if($conexion->connect_error){
            die("Conexion fallida: ".$conexion->connect_error);
            
        }else{
            
            if($result = mysqli_query($conexion, "UPDATE usuarios SET email='".$email."',nombre='".$nombre."',imagenUsuario='".$binariosImagen ."' WHERE id=".$id."")){

              
                    
            }
            
        
        }
            
    }

    function updateBalanceUserbyId($id,$shiba){

            

        $userModel = new UserModel();

        $conexion = $userModel->crearConexion();
    
        include_once ('../Beans/usuario.php');

    
        $sql="UPDATE usuarios SET balance=".$shiba ." WHERE id=".$id."";

        if($conexion->connect_error){
            die("Conexion fallida: ".$conexion->connect_error);
            
        }else{
            
            if($result = mysqli_query($conexion, $sql)){

            
                    
            }
            
        
        }
            
    }


    function selectUser($idUsuario){



        $userModel = new UserModel();

        $conexion = $userModel->crearConexion();
    
        include_once ('../Beans/usuario.php');
    

    if($conexion->connect_error){
        die("Conexion fallida: ".$conexion->connect_error);
        
    }else{
        
     

            $sql="SELECT * FROM usuarios WHERE id=".$idUsuario."";
        
         
       



        if($result = mysqli_query($conexion, $sql )){

            if($row = $result->fetch_assoc()) {
            
                $usuario = new usuario();
                $usuario->__set("id",$row["id"]);
                $usuario->__set("email",$row["email"]);
                //$usuario->__set("password",$row["password"]);
                $usuario->__set("nombre",$row["nombre"]);
                $usuario->__set("balance",$row["balance"]);
                $usuario->__set("imagenUsuario",base64_encode($row["imagenUsuario"]));
                $usuario->__set("idPermisos",$row["idPermisos"]);
            
              
                return $usuario;

            }
                
        }
        
    
    }
        
}



function selectCountUsuarios(){



	$listarUserModel = new UserModel();

	$conexion = $listarUserModel->crearConexion();



	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$usuarios = array();
	
		
	    $sql = "SELECT COUNT(*) as paginacion FROM usuarios";
		
	
	$result = $conexion->query($sql);
	$paginacion;
	if(mysqli_query($conexion,$sql)){

		while($row = $result->fetch_assoc()) {
		

			$paginacion = $row["paginacion"];
			
			
			array_push($usuarios,$paginacion);
		}
			return $usuarios;
	}
	

}
	
}

function selectUsuariosPerfil($paginaId){

    include_once ('../Beans/usuario.php');

	$listarUserModel = new UserModel();

	$conexion = $listarUserModel->crearConexion();

	$inicio = ($paginaId-1)*6;

	if($conexion->connect_error){
		die("Conexion fallida: ".$conexion->connect_error);
		
	}else{
		
		$usuarios = array();
	
		
	    $sql = "SELECT id,nombre,email,idPermisos FROM usuarios ORDER BY  id LIMIT ".$inicio.",6";
		
	
	$result = $conexion->query($sql);

	if(mysqli_query($conexion,$sql)){

		while($row = $result->fetch_assoc()) {
		

			    $usuario = new usuario();		
				$usuario->__set("id",$row["id"]);
				$usuario->__set("nombre",$row["nombre"]);
				$usuario->__set("email",$row["email"]);
				$usuario->__set("idPermisos",$row["idPermisos"]);
			
			
			array_push($usuarios,$usuario);
		}
			return $usuarios;
	}
	

}
	
}

 function actualizarPermisosUsuario($idPermisos,$idUsuario){
		

    $listarUserModel = new UserModel();

    $conexion = $listarUserModel->crearConexion();
 



if($conexion->connect_error){
    die("Conexion fallida: ".$conexion->connect_error);
    
}else{
    
        $sql = "UPDATE usuarios SET idPermisos=".$idPermisos." where id=".$idUsuario."";
        
        $result = $conexion->query($sql);
        if(mysqli_query($conexion,$sql)){
            
        }
        
            
    }
    

}
function deleteUsers($usuario){



    $userModel = new UserModel();

    $conexion = $userModel->crearConexion();

    include_once ('../Beans/usuario.php');


if($conexion->connect_error){
    die("Conexion fallida: ".$conexion->connect_error);
    
}else{
    


    $sql="DELETE FROM usuarios where id=". $usuario->__get("id")."";
    
    if($result = mysqli_query($conexion, $sql )){

      
            
    }
    

}
    
}



}
    ?>