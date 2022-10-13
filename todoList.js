const form = document.getElementById("formulario")
const contenedor = document.getElementById("contenedor")
const template = document.getElementById("plantilla")
const fragmento = document.createDocumentFragment()

let array = []

form.addEventListener("submit", e => {
    e.preventDefault()
    input = e.target.querySelector(".tarea").value
    e.target.querySelector(".tarea").focus()
    capturarDatos(input)
})

const capturarDatos = (input) =>{
    if(input === ""){
        alert("La lista de tareas esta vacia")
        return
    }

    const misTareas = {
        id: Date.now(),
        texto: input.trim(),
        estado:false
    }

array.push(misTareas)


form.reset()

console.log(array)
pintarDatos()
}

const pintarDatos = () => {
localStorage.setItem("array", JSON.stringify(array))

contenedor.textContent = ""

    array.forEach(item => {
        const checked = item.estado ? ".seleccionado" : null
        const clone = template.content.cloneNode(true)
        clone.querySelector(".estructura-parrafo").textContent = item.texto
        clone.querySelector(".fa-circle-xmark").dataset.id = item.id
        clone.querySelector(".estructura-checkbox").dataset.id = item.id
        if(checked === true){
            clone.querySelector("estructura").classList.add("seleccionado")
        }
        fragmento.appendChild(clone)
    });
    contenedor.appendChild(fragmento)
}

const seleccionar = (id, info) => {
    const checked = info.querySelector(".estructura-checkbox")
    const indice = array.find((item) => {
        if(item.id !== id){
            if(checked.checked === true){
                 item.estado = true

                 info.classList.add("seleccionado")

            }
            else{
                item.estado = false

                info.classList.remove("seleccionado")
            }
        }
        return item
    })
  console.log(indice)
}

const eliminarTarea = (id) =>{
    array = array.filter((item) => {
        return item.id != id
    })

    pintarDatos()
}

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("array")){
        array = JSON.parse(localStorage.getItem("array"))
        pintarDatos()
    }
    console.log(array)
})

contenedor.addEventListener("click", e => {
    if(e.target.matches(".fa-circle-xmark")){
       const id = e.target.dataset.id
       eliminarTarea(id)
    }
    if(e.target.type === "checkbox"){
        const id = e.target.dataset.id        
        seleccionar(id,e.target.parentElement)
    }
})