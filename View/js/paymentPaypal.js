$( document ).ready(function() {

    const CLIENT = 'AXVh-koQ0Pxkzsxyyenm2x8BzbChIz4GExaFHoao10gjuKSUKFGTzkAIlfM7oPnCVU-xinp6U3ZZhtXT';
    const SECRET = 'EMtWpR-RRqY6-EE7GYs9PkUK3Konmj7iMDwU2pgwPNlWhVaVfYFaZegThJwraEZuGsvbwNQw0jOlUEas';
    const API_PAYPAL ='https://api-m.sandbox.paypal.com';
    const AUTH = {user: CLIENT, pass: SECRET};

  paypal.Button.render({
  env: 'sandbox', // sandbox | production
  style: {
      label: 'checkout',  // checkout | credit | pay | buynow | generic
      size:  'responsive', // small | medium | large | responsive
      shape: 'pill',   // pill | rect
      color: 'blue'   // gold | blue | silver | black
  },

  // PayPal Client IDs - replace with your own
  // Create a PayPal app: https://developer.paypal.com/developer/applications/create

  client: {
      sandbox:    CLIENT,
      production: SECRET
  },

  // Wait for the PayPal button to be clicked

  payment: function(data, actions) {
      return actions.payment.create({
          payment: {
              transactions: [
                  {
                      amount: { total: '1', currency: 'EUR' }, 
                      description:"Compra de productos a AllForOne : 1€",
                      custom:"Codigo"
                  }
              ]
          }
      });
  },

  // Wait for the payment to be authorized by the customer

  onAuthorize: function(data, actions) {


   
      return actions.payment.execute().then(function() {
          
          window.location="../Controller/redireccion.php?paymentToken="+data.paymentToken+"&paymentID="+data.paymentID+"&accion=pagarPaypal";
      });
  }

}, '#paypal-button-container');

});