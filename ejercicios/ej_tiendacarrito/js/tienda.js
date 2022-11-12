let criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"]
let cart

function creaListaCriterios(){
	let selectCriterios = document.getElementById("criteriosOrdenacion")

	criterios.forEach((cri,index)=> {
		let option = document.createElement("option")
		option.value = index
		option.appendChild(document.createTextNode(cri))
		selectCriterios.appendChild(option)
	})
	
	selectCriterios.addEventListener("change", (c)=> {
		pintaArticulos(criterios[c.target.value])
	})
}


function pintaArticulos(orden){
	let copiaArticulos = [...listaArticulos] // Copia el array de articulos

	switch(orden){
		case "Sin ordenar":
			copiaArticulos
		break;
		case "Ascendente por precio":
			copiaArticulos.sort((a, b) => a.precio - b.precio)
		break;
		case "Descendente por precio":
			copiaArticulos.sort((a, b) => b.precio - a.precio)
		break;
	}

	let pintaArticulos = document.getElementById("contenedor")
	pintaArticulos.innerHTML = ""

	copiaArticulos.forEach(art => {
		
		pintaArticulos.innerHTML += 
		`
		<div class='col'>
			<div class='card mb-4'>
				<img src='assets/${art.codigo}.jpg' class='card-img-top'>
				<div class='card-body'>
					<h5 class='card-title'>${art.nombre}</h5>
					<p class='card-text'>${art.descripcion}</p>
					<b>
						<p class='card-text text-center card-price'>${art.precio}</p>
					</b>
				</div>
				<button id='${art.codigo}' class='btn-success m-3 rounded'>Comprar</button>
			</div>
		</div> 
		`
	})

	let btns = document.querySelectorAll(".btn-success")
	btns.forEach(btn=>{
		btn.addEventListener("click",() => {
			cart.anyadeArticulo(listaArticulos.find(art => art.codigo == btn.id))
			ponArticuloEnCarrito()
		})
	})
}
	
function ponArticuloEnCarrito(){
	let contenidoDialog = document.getElementById("dialogContent")
	contenidoDialog.innerHTML = ""
	let cesta = ""

	cesta = "<table class='table table-striped'>"
	cesta += 
	`
	<tr>
		<th class="oculto">id</th>
		<th>Producto</th>
		<th>Nombre</th>
		<th>Descripción</th>
		<th>Precio</th>
		<th>Unidades</th>
		<th>Total</th>
		<th></th>
	</tr>
	` 
	cart.articulos.forEach(cartArt => {
	
		cesta += 
		`
		<tr>
			<td class="oculto">${cartArt.codigo}</td>
			<td><img style="width:50px;" src="assets/${cartArt.codigo}.jpg"></td>
			<td>${cartArt.nombre}</td>
			<td>${cartArt.descripcion}</td>
			<td>${cartArt.precio}</td>
			<td>${cartArt.unidades}</td>
			<td>${cartArt.unidades*cartArt.precio}</td>
			<td class="${cartArt.codigo}" art="${cartArt.codigo}">
				<button class="btn btn-primary btnAdd">+</button>
				<button class="btn btn-warning btnRemove">-</button>
				<button class="btn btn-danger btnDelete">Borrar</button>
			</td>
		</tr>
		` 
	}) // Pintamos contenido del dialog

	cesta += "</table>"
	contenidoDialog.innerHTML = cesta

	let numItemsCarrito = document.querySelector(".numItemsCarrito")
	numItemsCarrito.innerHTML= cart.items

	let total = document.getElementById("total")
	total.innerHTML = cart.total + "€"

	if(!cart.articulos.length < 0){
		contenidoDialog.innerHTML = "El carrito está vacío"
		total.innerHTML = "" // Vaciamos el carrito
	}

	// Botones sumar, quitar y borrar unidades del Dialog
	let btnAdd = document.querySelectorAll(".btnAdd")
	let btnDelete = document.querySelectorAll(".btnDelete")
	let btnRemove = document.querySelectorAll(".btnRemove")

	btnAdd.forEach(btn => {
		btn.addEventListener("click",() => {
			cart.modificaUnidades(btn.parentNode.attributes.art.value, "+")
			ponArticuloEnCarrito()
		})
	})
	btnDelete.forEach(btn => {
		btn.addEventListener("click",() => {
			cart.borraArticulo(btn.parentNode.attributes.art.value)
			
			ponArticuloEnCarrito()
		})
	})	
	btnRemove.forEach(btn => {
		btn.addEventListener("click",() => {
			cart.modificaUnidades(btn.parentNode.attributes.art.value, "-")
			ponArticuloEnCarrito()
		})
	})	
}

function verCarro(){
	let cartIcon = document.querySelector(".cart")
	let dialog = document.getElementById("miDialogo")

	let idPedido = document.getElementById("idPedido")
	let btnSeguirComprando = document.getElementById("btnCierraDialog")
	let btnEfectuarPedido = document.getElementById("btnEfectuaPedido")

	cartIcon.addEventListener("click", () => {
		dialog.showModal()	

		if(cart.articulos.length < 1){
			alert("El carrito está vacío")
			dialog.close()	
		}
	})

	idPedido.innerHTML = cart.id

	btnSeguirComprando.addEventListener("click", () => { dialog.close()})	// Se cierra el dialog
	btnEfectuarPedido.addEventListener("click", () => { document.write( JSON.stringify(cart))}) // Observamos la compra en formato JSON	
}

window.onload=()=>{
	cart = new Carrito(Date.now())
	verCarro()
	creaListaCriterios()
	pintaArticulos(0)
}




