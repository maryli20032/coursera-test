
const formulario = document.getElementById('formulario')
const input = document.getElementById('input')

const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
const fragment2 = document.createDocumentFragment()
const fragment3 = document.createDocumentFragment()

const listaTareaToDo = document.getElementById('lista-tareas-ToDo')
const listaTareaDoing = document.getElementById('lista-tareas-Doing')
const listaTareaDone = document.getElementById('lista-tareas-Done')


let limiteHaciendo = 15

let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }

    pintarTareas()

})

listaTareaToDo.addEventListener('click', e => {
    btnAccion(e)
})

listaTareaDoing.addEventListener('click', e => {
    btnAccion(e)
})

listaTareaDone.addEventListener('click', e => {
    btnAccion(e)
})


formulario.addEventListener('submit', e => {
    e.preventDefault()
    //console.log(e.target[0].value)
    //console.log(input.value)
    //console.log(e.target.querySelector('input').value)

    setTarea(e)

})

const setTarea = e => {
    if (input.value.trim() === '') {
        console.log('esto esta vacio')
        return
    }
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: 1,
        activo: false
    }
    tareas[tarea.id] = tarea

    formulario.reset()
    input.focus

    pintarTareas()
}



const pintarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas))

    console.log("values: " + Object.values(tareas).length)

    if (Object.values(tareas).length === 0) {

        listaTareaToDo.innerHTML = `
        <div class="alert alert-dark text-center">
        Sin tareas pendientes 😍
        </div>
        `

        listaTareaDoing.innerHTML = `
        <div class="alert alert-dark text-center">
        Sin tareas pendientes 😍
        </div>
        `
        listaTareaDone.innerHTML = `
        <div class="alert alert-dark text-center">
        Sin tareas pendientes 😍
        </div>
        `
        return

    }

    listaTareaToDo.innerHTML = ''
    listaTareaDoing.innerHTML = ''
    listaTareaDone.innerHTML = ''

    Object.values(tareas).forEach(tarea => {

        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.activo === true && tarea.estado === 1) {

            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            // clone.querySelectorAll('.fas')[0].classList.remove('fa-check-circle', 'fa-undo-alt')
            // clone.querySelector('p').style.textDecoration = 'line-through'
            console.log("lfrangment2: " + fragment2.childNodes.length)

            if (fragment2.childNodes.length === (limiteHaciendo)) {

                alert("hay mas de 5 tareas, termine las tareas que esta haciendo antes");
                tarea.estado = 1
                tarea.activo = false
            }
            else {
                tarea.estado = 2
                tarea.activo = false
            }
        } else
            if (tarea.activo === true && tarea.estado === 2) {

                clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
                // clone.querySelectorAll('.fas')[0].classList.remove('fa-check-circle', 'fa-undo-alt')
                // clone.querySelector('p').style.textDecoration = 'line-through'

                tarea.estado = 3
                tarea.activo = false

            } else

                if (tarea.activo === true && tarea.estado === 3) {

                    clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
                    clone.querySelectorAll('.fas')[0].classList.remove('fa-check-circle', 'fa-undo-alt')
                    clone.querySelector('p').style.textDecoration = 'line-through'


                }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id


        switch (tarea.estado) {
            case 1: fragment.appendChild(clone);
                break

            case 2: fragment2.appendChild(clone);
                break

            case 3: fragment3.appendChild(clone);
                break
        }

    })


    listaTareaToDo.appendChild(fragment)
    listaTareaDoing.appendChild(fragment2)
    listaTareaDone.appendChild(fragment3)


}


//aca toda la logica de los botones
const btnAccion = e => {

    if (e.target.classList.contains('fa-check-circle')) {

        tareas[e.target.dataset.id].activo = true
        pintarTareas();
    }


    //eliminar
    if (e.target.classList.contains('fa-minus-circle')) {

        delete tareas[e.target.dataset.id]
        pintarTareas()

    }

  
    e.stopPropagation()
}
