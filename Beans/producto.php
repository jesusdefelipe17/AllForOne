<?php 
class producto {

   private  $idProducto;
   private  $nombreProducto;
   private  $descripcionProducto;
   private  $precioProducto;
   private  $imagenProducto;
   private  $tallProducto;
   private  $colorProducto;
   private  $cantidadProducto;
   private  $categoriaProducto;
   private  $paginacion;
   

   
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