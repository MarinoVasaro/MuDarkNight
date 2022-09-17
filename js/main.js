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
    </td>`;
    listaProductos.appendChild(row);
}

eliminarProducto(e){
    e.preventDefault();
    let producto;
    let productoID;
    if(e.target.classList.contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('button').getAttribute('data-id')
    }
}

vaciarCarrito(e){
    e.preventDefault();
    while (listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
    return false
}
}









