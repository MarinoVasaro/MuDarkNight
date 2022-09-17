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
            

            this.insertarCarrito(infoProducto);
            
}


//INSERTAR AL CARRITO
insertarCarrito(producto){
    const row = document.createElement('tr');
    row.innerHTML = 
    `<td>
        <img src="${producto.imagen}" width=100>
    </td>
    <td>
        <h5 style="color:#fff;">${producto.nombre}</h5>
    </td>
    <td>
        <h6 style="color:#fff;">${producto.precio}</h6>
    </td>
    <td>
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
    if(localStorage.getItem('productos') === null){
        productoLS = [];
    }
    else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}

   //Eliminar producto por ID del LS
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


vaciarLocalStorage(){
    localStorage.clear();
}

//Enviar pedido a otro html

procesarPedido(e){
    e.preventDefault();
    if(this.obtenerProductosLocalStorage().length === 0){
        swal('ERROR', 'Su carrito esta vacio', 'error');
    }
    else{
        location.href ="compra.html";
    }
    
    
}

leerLocalStorageCompra(){
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
    <td class="tdShop">
        <h6 style="color:#fff;">${producto.precio}</h6>
    </td>
    <td class="tdShop">
        <input type="number" class="form-control cantidad" min="1" value="${producto.cantidad}">
    </td>
    <td>${producto.precio * producto.cantidad}</td>
    <td class="tdShop">
        <a href="#" class="borrar-producto fas fa-times-circle fa-3x" data-id="${producto.id}"></a>
    </td>
    `;
    listaCompra.appendChild(row);
    });
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










