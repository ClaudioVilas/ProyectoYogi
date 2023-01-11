const contenedorProductos = document.getElementById ('contentenedor-productos')
const contenedorCarrito = document.querySelector('.modal-body')
const botonVaciar = document.getElementById("vaciar-carrito")
const contadorCarrito = document.getElementById ("contadorCarrito")
const precioTotal = document.getElementById ("precioTotal")


let carrito = []

botonVaciar.addEventListener ("click", () =>{
    carrito.length = 0
    actualizarCarrito()
})


stockProductos.forEach ((producto) => {
    const div = document.createElement ('div')
    div.classList.add ('producto')
    div.innerHTML = `
    <img  class= "fotos" src = ${producto.img} alt = "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle ${producto.talle}</p>
    <p class = 'precioProducto'> Precio:$ ${producto.precio} </p>
    <button id = 'agregar ${producto.id}' class = 'boton-agregar' > Agregar <i class = 'fas-fa shopping-cart'> </button>
    `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar ${producto.id}`)

    boton.addEventListener ('click', () => {
        agregarAlCarrito(producto.id)
    })
    
})


const agregarAlCarrito = (prodId) => {

const existe = carrito.some (prod => prod.id === prodId)
    if (existe) {
        const prod = carrito.map (prod => {
            if (prod.id === prodId) {
                prod.cantidad ++
            }
        })
    } else {
        const item = stockProductos.find ((prod) => prod.id === prodId )
        carrito.push(item)
        console.log(carrito)     
    }
    
    actualizarCarrito()

}


const eliminarDelCarrito = (prodId) => {

    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice (indice, 1)
    actualizarCarrito()
}



const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""

    carrito.forEach ((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio ${prod.precio}</p>
        <p>Cantidad: <span id = "cantidad"> ${prod.cantidad} </span></p>
        <button onclick = "eliminarDelCarrito (${prod.id})" class = "boton-eliminar"> Eliminar </button>
        `
        contenedorCarrito.appendChild(div);

})

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)

}