<?php

class conexion{

    function crearConexion(){
        $servidor="localhost";
        $nombreUsuario="root";
        $pass="";
        $db="allforone";
        $conexion = new mysqli($servidor,$nombreUsuario,$pass,$db);
        return $conexion;
    }


    
}
?>