<?php 
class pedidosObject {

   private  $idPedido;
   private  $idUsuario;
   private  $estado;
   private  $nombre;
   private  $direccion;
   private  $ciudad;
   private  $provincia;
   private  $codigoPostal;

   
function __construct(){ 
 
}

   
   public function __get($property) {
      if (property_exists($this, $property)) {
        return $this->$property;
      }
    }
  
    public function __set($property, $value) {
      if (property_exists($this, $property)) {
        $this->$property = $value;
      }
  
      return $this;
    }
  }
?>