
const formOpciones = document.getElementById("pedido")

async function leerJSON(url){
    try {
        let response = await fetch(url)
        let user = await response.json()
        return user
    } catch (error) {
        console.log(erorr)
    }
    
}


function setData(){
    let url = "https://programacion-web---i-sem-2019.gitlab.io/persistencia/json_web/json/pizzeria.json"

    leerJSON(url).then(data =>{
        const titulo = document.getElementById("titulo")
        titulo.innerHTML = "<h1>" + data.nombrePizzeria + "</h1>"
    })
}


function crearElementos(){
    const templatePizza = document.getElementById("template-pizza").content
    const fragment = document.createDocumentFragment()

    const newBtn = document.getElementById("newBoton")
    newBtn.innerHTML = `<input type="button" value="Cargar de nuevo" id="btn-cargar" onclick="limpiar()">`

    const btnEnviar = document.getElementById("enviar")
    btnEnviar.innerHTML = `<button id="btnC">Cargar Opciones</button>`

    for(let i=1; i<=document.getElementById("cantidad").value; i++){
        templatePizza.querySelector("label").textContent = `Tamaño de la pizza ${i}`
        const clone = templatePizza.cloneNode(true)
        fragment.appendChild(clone)
    }
    document.getElementById("crear").disabled = true
    document.getElementById("pizzas").appendChild(fragment)
}


function limpiar(){
    const pizzas = document.getElementById("pizzas")
    while(pizzas.firstElementChild){
        pizzas.removeChild(pizzas.firstElementChild)
    }
    document.getElementById("crear").disabled = false
    document.getElementById("btnC").remove()
    document.getElementById("btn-cargar").remove()
}


function getData(){

    const templateOpciones = document.getElementById("template-opciones").content
    const fragment = document.createDocumentFragment();

    const url = "https://programacion-web---i-sem-2019.gitlab.io/persistencia/json_web/json/pizzeria.json"

    let paramst = new URLSearchParams(location.search)
    let cantidad = paramst.get("cantidad") // cantidad de pizzas
    let tam = paramst.getAll("select") // tamaños de cada pizza

    leerJSON(url).then(data =>{
        let contador = 1
        for(let i = 1; i<=cantidad; i++){
            console.log(data.pizzas)
            templateOpciones.querySelector(".msj").textContent = `Escoja sabores para pizza ${i} (puede escojer uno o dos)`
            
            templateOpciones.querySelector(".span1").setAttribute("id", contador)
            templateOpciones.querySelector(".imagen1").setAttribute("id", `imagen${contador}`)
            templateOpciones.querySelector(".pizza1").setAttribute("name", `select`)
            templateOpciones.querySelector(".pizza1").setAttribute("onclick",`setName(sabor${contador}, ${contador}), setImagen(sabor${contador}, ${contador})`)
            templateOpciones.querySelector(".pizza1").setAttribute("id",`sabor${contador++}`)

            templateOpciones.querySelector(".span2").setAttribute("id", contador)
            templateOpciones.querySelector(".imagen2").setAttribute("id", `imagen${contador}`)
            templateOpciones.querySelector(".pizza2").setAttribute("name",`select`)
            templateOpciones.querySelector(".pizza2").setAttribute("onclick", `setNameTwo(sabor${contador}, ${contador}), setImagenTwo(sabor${contador}, ${contador})`)
            templateOpciones.querySelector(".pizza2").setAttribute("id",`sabor${contador++}`)

            
            for(const item of data.pizzas){
                const opcion = document.createElement("option")
                opcion.textContent = item.sabor

                const opcion2 = document.createElement("option")
                opcion2.textContent = item.sabor

                templateOpciones.querySelector(".pizza1").appendChild(opcion)
                templateOpciones.querySelector(".pizza2").appendChild(opcion2)
            }
            const clone = templateOpciones.cloneNode(true)
            fragment.appendChild(clone)
            
            templateOpciones.querySelector(".pizza1").innerHTML = ""
            templateOpciones.querySelector(".pizza2").innerHTML = ""
        }
        const boton = document.createElement("input")
        boton.setAttribute("value", "Calcular Factura")
        boton.setAttribute("type", "submit")
        boton.classList.add("btnEnviar")

        fragment.appendChild(boton)
        document.getElementById("pedido").appendChild(fragment)
    })
    
}


function setName(select, i){
    document.getElementById(i).textContent = select.value
}


function setNameTwo(select, i){
    document.getElementById(i).textContent = select.value
}


function setImagen(select, i){
    let url ="https://programacion-web---i-sem-2019.gitlab.io/persistencia/json_web/json/pizzeria.json"

    leerJSON(url).then(data=>{
        for(const item of data.pizzas){
            if(item.sabor === select.value) {
                document.getElementById(`imagen${i}`).setAttribute("src", item.url_Imagen)
            }
        }
    })
}


function setImagenTwo(select, i){
    let url ="https://programacion-web---i-sem-2019.gitlab.io/persistencia/json_web/json/pizzeria.json"

    leerJSON(url).then(data=>{
        for(const item of data.pizzas){
            if(item.sabor === select.value){
                document.getElementById(`imagen${i}`).setAttribute("src", item.url_Imagen)
            }
        }
    })
}

function getFactura(){
    let url = "https://programacion-web---i-sem-2019.gitlab.io/persistencia/json_web/json/pizzeria.json"

    let paramst = new URLSearchParams(location.search)

    const select = paramst.getAll("select")

    console.log(select)
}