
$(document).ready(function () {
  
    $.ajax({
        url: 'https://api.coingecko.com/api/v3/coins/ethereum?tickers=false&market_data=true',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
    
          var precioPorEth = 1 / json.market_data.current_price.eur;
          //alert(precioPorShiba);
          
    
          window.sessionStorage.setItem("precioPorEth", JSON.stringify(precioPorEth));
    
        },
        error: function (jqXHR, status, error) {
          
        }
      });

    var url_string = window.location.href
    var url = new URL(url_string);

   
    var error_login_user = url.searchParams.get("error_login_user");
    
   
    if(error_login_user!=null){
        var error2 = document.getElementById("error_login_user");
        $('<p class="text-danger">Email o contrase&ntilde;a incorrecta.Intentalo de nuevo</p>').appendTo(error2);
    }

});


function redirect(){
    window.location.href = 'registro.html'; 
}



  




