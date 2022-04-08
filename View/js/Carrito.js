function Carrito() {

	var productos = []
	
	
	this.getProductos = function () {

		window.sessionStorage.setItem("carrito",JSON.stringify(productos))

		return window.sessionStorage.getItem("carrito");

	}
	


	this.addProducto = function (producto) {

		if(window.sessionStorage.getItem("carrito")!=null){

			productos = JSON.parse(window.sessionStorage.getItem("carrito"));

			var index = productos.findIndex(o => o.idProducto === producto.idProducto);

			var pro = productos.find(o => o.idProducto === producto.idProducto);

			if(index!=-1){

				pro.cantidad= pro.cantidad+1;

				productos.splice(index,1);
			
				producto= pro;

			}

			window.sessionStorage.setItem("carrito",JSON.stringify(productos));
		}else{
			window.sessionStorage.setItem("carrito",JSON.stringify(productos));
		}

		
        productos.push(producto);

		Swal.fire({
			
			icon: 'success',
			title: 'Agregado al carrito',
			showConfirmButton: false,
			timer: 1500
		  })


	}
	



	
	this.toString = function () {
		return "titulo: " + _titulo + ", descripcion = " + _descripcion;
	}

}
Carrito.prototype = {};
Carrito.prototype.constructor = Carrito;

