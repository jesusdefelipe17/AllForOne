<?php 
class paypalObject {

   private  $idPaypal;
   private  $paymentToken;
   private  $idPedido;
   private  $accessToken;
   private  $precio;
   private  $pago;
   

   
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