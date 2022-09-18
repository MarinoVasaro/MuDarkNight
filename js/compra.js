const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const ProcesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const pass = document.getElementById('pass');
const pin = document.getElementById('pin');

cargarEventos();

function cargarEventos(){

    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    carrito.addEventListener('click', (e)=>{compra.eliminarProducto(e)});
    compra.calcularTotal();

    ProcesarCompraBtn.addEventListener('click',ProcesarCompra);

}

function ProcesarCompra(e){
    e.preventDefault();
//SI CARRITO ESTA VACIO REDIRECCIONAR A SHOP.
    if(compra.obtenerProductosLocalStorage().length === 0){
        swal('ERROR', 'Su carrito esta vacio', 'error' )
        .then(function(){
            window.location = "itemshop.html";
        });
    }
    //Si datos estan vacios no permitir avanzar
    else if(cliente.value === '' || pass.value === '' || pin.value === ''){
        swal('ERROR', 'Aun hay datos incompletos.', 'error' )
    }
    else{
        swal('Finalizado', 'Su compra se realizo correctamente', 'success')
        .then(function(){
            window.location = "index.html"
        });
        
        
       
    }


}