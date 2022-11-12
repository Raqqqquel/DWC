let pizzas=[
    {'codigo':'P1',
     'nombre':'Prosciutto', 
     'ingredientes':[{'ingrediente':'salsa de tomate','precio':'0.5'},
                     {'ingrediente':'mozzarella','precio':'0.5'},
                     {'ingrediente':'jamón york','precio':'0.75'}
                    ]
    },
    {'codigo':'P2',
     'nombre':'Capricciosa',
     'ingredientes':[{'ingrediente':'salsa de tomate','precio':'0.5'},
                     {'ingrediente':'mozzarella','precio':'0.5'},
                     {'ingrediente':'jamón york','precio':'0.75'},
                     {'ingrediente':'alcachofas','precio':'1'},
                     {'ingrediente':'champiñones','precio':'0.5'},
                     {'ingrediente':'olivas negras','precio':'0.25'}
                    ]
    },								   
    {'codigo':'P3',
     'nombre':'Cuatro Formaggi',
     'ingredientes':[{'ingrediente':'salsa de tomate','precio':'0.5'},
                     {'ingrediente':'mozzarella','precio':'0.5'},
                     {'ingrediente':'gorgonzola','precio':'1.25'},
                     {'ingrediente':'emmemtal','precio':'1'},
                     {'ingrediente':'brie','precio':'0.75'}
                    ]
    }
   ];


// Creamos los botones
pizzas.forEach(p=>{

    let btn = document.createElement("button");
    btn.id = p.codigo;
    btn.appendChild(document.createTextNode(p.nombre));
    btn.onclick = pintaPizza;
    document.body.appendChild(btn)
})


function pintaPizza(){
    // Eliminamos valores anteriores
    document.getElementById("fotopizza").innerHTML="";
    document.getElementById("ingredientes").innerHTML="";
    total=0;

    // Buscamos la pizza
    let pizza = pizzas.find(p=>p.codigo==this.id);

    // Creamos la imagen
    imagen = document.createElement("img");
    imagen.className="imagenes";
    imagen.src="assets/"+ this.id + ".jpg";

    // Añadimos la imagen de la pizza a la capa
    document.getElementById("fotopizza").appendChild(imagen);

    // Calculamos ingredientes y suma cada uno de ellos
    let ingredientes = ""
    pizza.ingredientes.forEach(i=>{
        total += parseFloat(i.precio)
        ingredientes+=i.ingrediente + "<br>"
        }),

    // Calculamos total sumando el precio base    
    total+=5

    document.getElementById("ingredientes").innerHTML=ingredientes;
    document.getElementById("importe").innerHTML="Importe: "+total;    

}