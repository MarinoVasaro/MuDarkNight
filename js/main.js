



// #################################### FUNCIONES ############################## //

        //Alerta de producto agregado.

function agregadoCarrito(){
    alert('agregado al carrito');
}


function addToCarClicked(event){
   const button = event.target;
   console.log(button);
}


















let botonComprar = document.getElementsByClassName("botonComprar");
/* for (var i = 0; i < botonComprar.length; i++) {
    botonComprar[i].addEventListener('click', agregadoCarrito);
} */

botonComprar.forEach(addToCarButton =>{
    addToCarButton.addEventListener('click',addToCarClicked);
    
});
    










