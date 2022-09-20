const carro = new Carrito(); //CONSTRUCTOR
const carrito = document.getElementById('carrito'); //DIV CARRITO
const productos = document.getElementById('lista-productos'); //DIV STOCK
const listaProductos = document.querySelector('#lista-carrito tbody'); //Div a imprimir la compra.
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')//Boton de eliminar carrito
const procesarPedidoBtn = document.getElementById('procesar-pedido')//Boton de finalizar compra

cargarEventos();

function cargarEventos(){
    productos.addEventListener('click', (e)=>{carro.comprarProducto(e)}); //AGREGAR PRODUCTO
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)}); // ELIMIAR PRODUCTO
    vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)}); //VACIAR CARRITO
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage()); //MANTENER LA COMPRA AL CAMBIAR DE PAGINA
    procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)}); //Procesar pedido boton
    carrito.addEventListener('change', (e)=>{carro.cambiarCantidad(e)});
}