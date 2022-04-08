<?php 
class usuario {

   private  $id;
   private  $email;
   private  $password;
   private  $nombre;
   private  $idPermisos;
   private  $imagenUsuario;
   private  $balance;
   

   
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