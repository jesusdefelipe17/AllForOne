$( document ).ready(function() {
    

    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
         
            $('.navbar').addClass('bg-light');
        } else {
            $('.navbar').removeClass('bg-light');
        }
    });

    

    controllLogin();

   

});


function controllLogin() {

  var usuario = window.sessionStorage.getItem("usuario");
  

  if (usuario == null) {
      $('#perfil').remove();
      $('#carrito').remove();
     
    
      var perfil = document.getElementById("perfil");
      $('#login').html('<a href="login.html" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="perfil">Login</a>')
          .appendTo(perfil)

  } else {
    var logout = document.getElementById("navB");

    $('<li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold" style="color: black;" id="logout" onclick="hacerLogout();">LogOut</a></li>').appendTo(logout);

  }
}


function hacerLogout() {

  sessionStorage.clear();
  window.location.href = 'login.html';
}