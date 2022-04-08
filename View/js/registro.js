$(document).ready(function () {
    var imagen_user = document.getElementById("imagen_user"); 
    imagen_user.onchange = validarImg;

    var url_string = window.location.href
    var url = new URL(url_string);

    var error_registro = url.searchParams.get("error_registro_pass");
    var error_registro_user = url.searchParams.get("error_registro_user");
    
    
    if(error_registro!=null){

        var error = document.getElementById("error_registro_pass");
        $('<p class="text-danger">La contrase&ntilde;a no coincide</p>').appendTo(error);
    }
    if(error_registro_user!=null){
        var error2 = document.getElementById("error_registro_pass");
        $('<p class="text-danger">Ya existe un perfil con este email.Intentalo con otro distinto</p>').appendTo(error2);
    }

});

function redirect(){
    window.location.href = 'login.html'; 
}

function validarImg(){
    var _URL = window.URL || window.webkitURL;
    var file, img;


    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
           

            if(this.width>=256){
                  if(this.height>=256){
                        Swal.fire({
                            
                            icon: 'error',
                            title: 'La imagen tiene que ser menor o igual a 250x250',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        document.getElementById('imagen_user').value = "";
                }
              
            }else if(this.height>=256){
                if(this.width>=256){
                    Swal.fire({
                            
                        icon: 'error',
                        title: 'La imagen tiene que ser menor o igual a 250x250',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    document.getElementById('imagen_user').value = "";
                }

            }
        };
        img.onerror = function() {
           
        };
        img.src = _URL.createObjectURL(file);


    }
    }

  




