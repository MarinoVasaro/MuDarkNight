class Carrito{
    //Sumar el producto al carrito
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains("botonComprar")){
            const producto = e.target.parentElement.parentElement;
            this.LeerProducto(producto);
            
            
            
        }
    }

//LEER DATOS A INSERTAR.
        LeerProducto(producto){
         const infoProducto = {
             imagen : producto.querySelector('img').src,
                nombre : producto.querySelector('h5').textContent,
                precio : producto.querySelector('.botonComprar span').textContent,
                id: producto.querySelector('button').getAttribute('data-id'),
                cantidad : 1
            }
            //Si esta repetido no permitir sumar otro
            let productosLS;
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS){
                if(productoLS.id === infoProducto.id){
                    productosLS = productoLS.id;
                }
            });
    
            if(productosLS === infoProducto.id){
                swal('ERROR','Este set ya fue agregado al carrito', 'error')
            }
            else {
                this.insertarCarrito(infoProducto);
            }
            

            
            
}


//INSERTAR AL CARRITO Y CREAR LOS ELEMENTOS DE LA TABLA
insertarCarrito(producto){
    const row = document.createElement('tr');
    row.innerHTML = 
    `<td class="tdShop">
        <img src="${producto.imagen}" width=100>
    </td>
    <td class="tdShop">
        <h5 style="color:#fff;">${producto.nombre}</h5>
    </td>
    <td class="tdShop">
        <h6 style="color:#fff;">${producto.precio}</h6>
    </td>
    <td class="tdShop">
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
    </td>
    `;
    listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
   
}

//eliminar de a un solo producto
eliminarProducto(e){
    e.preventDefault();
    let producto, productoID;
    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
    }
    this.eliminarProductoLocalStorage(productoID);
    this.calcularTotal();


}
//vaciar carrito completo.
vaciarCarrito(e){
    e.preventDefault();
    while (listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
    this.vaciarLocalStorage();

    return false
}
 //Guardar productos seleccionados en LS
guardarProductosLocalStorage(producto){
    let productos;
    //Toma valor de un arreglo con datos del LS
    productos = this.obtenerProductosLocalStorage();
    //Agregar el producto al carrito
    productos.push(producto);
    //Agregamos al LS
    localStorage.setItem('productos', JSON.stringify(productos));
}

//Comprobar que hay elementos en el LS
obtenerProductosLocalStorage(){
    let productoLS;

    //Comprobar si hay algo en LS
    //Vacio retorna array vacio
    if(localStorage.getItem('productos') === null){
        productoLS = [];
    }
    else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    //Si hay algo retorna el producto.
    return productoLS;
}

   //Eliminar producto por ID del LS (en la linea 76 lo llamamos asi reutilizo el mismo boton) 
   eliminarProductoLocalStorage(productoID){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function(productoLS, index){
        if(productoLS.id === productoID){
            productosLS.splice(index, 1);
        }
    });

    //Añadimos el arreglo actual al Local storage
    localStorage.setItem('productos', JSON.stringify(productosLS));
}

//Leer los productos del localstorage al cargar la pagina.

leerLocalStorage(){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto){
        const row = document.createElement('tr');
    row.innerHTML = 
    `<td class="tdShop">
        <img src="${producto.imagen}" width=100>
    </td>
    <td class="tdShop">
        <h5 style="color:#fff;">${producto.nombre}</h5>
    </td>
    <td>
        <h6 style="color:#fff;">${producto.precio}</h6>
    </td>
    <td class="tdShop">
        <a href="#" class="borrar-producto fas fa-times-circle fa-3x" data-id="${producto.id}"></a>
    </td>
    `;
    listaProductos.appendChild(row);
    });
}

//Vaciar carrito (llamado en linea 87 para reutilizar boton)
vaciarLocalStorage(){
    localStorage.clear();
}

//redireccionar a otro html

procesarPedido(e){
    e.preventDefault();
    //Si no hay nada en el carrito devolver error
    if(this.obtenerProductosLocalStorage().length === 0){
        swal('ERROR', 'Su carrito esta vacio', 'error');
    }
    //Si hay algo redireccionar a compra.html
    else{
        location.href ="compra.html";
    }
    
    
}

//Esto es lo que se va a imprimir en el html de compra al finalizar la compra..
leerLocalStorageCompra(){
    let productosLS;
    //Obtenemos los productos del localstorage
    productosLS = this.obtenerProductosLocalStorage();
    //Los recorremos y los imprimimos.
    productosLS.forEach(function (producto){
        const row = document.createElement('tr');
    row.innerHTML = 
    `<td class="tdShop">
        <img src="${producto.imagen}" width=100>
    </td>
    <td class="tdShop">
        <h5 style="color:#fff;">${producto.nombre}</h5>
    </td>
    <td class="tdShop">
        <h6 style="color:#fff;">$${producto.precio}</h6>
    </td>
    <td class="tdShop">
        <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
    </td>
    <td class="tdShop" id='subtotales'>
    ${producto.precio * producto.cantidad}</td>
    <td class="tdShop">
        <a href="#" class="borrar-producto fas fa-times-circle fa-2x" data-id="${producto.id}"></a>
    </td>
    `;
    listaCompra.appendChild(row);
    });
}

//CALCULAR TOTAL
calcularTotal(){
    let productosLS;
    let total = 0, iva = 0, subtotal = 0;
    productosLS = this.obtenerProductosLocalStorage();
    for(let i = 0; i < productosLS.length; i++){
        let element = Number(productosLS[i].precio * productosLS[i].cantidad);
        total = total + element;
        
    }
    //  Sacar IVA
    iva = parseFloat(total * 0.21).toFixed(2);
    subtotal = parseFloat(total-iva).toFixed(2);

    document.getElementById('subtotal').innerHTML = "$ " + subtotal;
    document.getElementById('iva').innerHTML = "$ " + iva;
    document.getElementById('total').value = "$" + total.toFixed(2);
}

}


























/* ALERTAS */
function alertaCarrito(){
    swal('Set agregado al carrito', '', 'success');

}
function alertaCarritoBorrado(){
    swal('Su carrito fue limpiado', '', 'info');

}

function ProcesandoCompra(){
    swal('ATENCION', 'Aguarde un momento, estamos procesando su pedido', 'info');

}


function RedireccionShop(){
    window.location = "itemshop.html";
}








