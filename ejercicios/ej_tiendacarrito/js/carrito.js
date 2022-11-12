class Carrito{

	constructor(id){
		this.id = id
		this.nombre = ""
		this.articulos = []					
	}
						
	anyadeArticulo(articulo){
		if(this.articulos.includes(articulo)){
			this.articulos.find(art => art.codigo == articulo.codigo).unidades +=1
		} else {
			articulo.unidades = 1
			this.articulos.push(articulo)	
		}
	}			
				
	borraArticulo(codigo){
		this.articulos.splice(this.articulos.findIndex(art => art.codigo == codigo),1)
	}
	
	modificaUnidades(codigo,u){	
		let articulo = this.articulos.find(art => art.codigo == codigo)

		if(u==="+"){
			articulo.unidades += 1
		}

		if(u==="-"){
			if(articulo.unidades > 1){
				articulo.unidades -= 1
			} else {
				this.borraArticulo(articulo.codigo)
			}
		}
	}	
			
	get total(){
		return this.articulos.reduce((a,b) => a + (b.precio * b.unidades), 0)
	}

	get items(){
		return this.articulos.reduce((a,b) => a + b.unidades, 0)
	}
}