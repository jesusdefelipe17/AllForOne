<?php 
class productoPedidoObject {

   private  $idPedido;
   private  $nombreProducto;
   private  $descripcionProducto;
   private  $precioProducto;
   private  $imagenProducto;
   private  $direccion;
   private  $estado;
   private  $nombre;
   private  $pago;
   private  $precio; 
   private  $nombreyapellido;
   private  $ciudad;
   private  $provincia;	
   private  $codigoPostal;
   private  $cantidad;
   

   
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