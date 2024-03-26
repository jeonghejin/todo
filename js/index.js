const BACKEND_ROOT_URL = 'http://localhost:3001'
import {Todos} from "./class/Todos.js"
const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled=true

const renderTask=(task)=>{
    const li=document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.innerHTML=task.getText()
    list.append(li)
}

const getTasks= ()=> {
    /*try {
        const response=await fetch(BACKEND_ROOT_URL)
        const json=await response.json()
        json.forEach(task => {
            renderTask(task.description)
        }) 21P.삭제*/
    todos.getTasks().then((tasks)=> {
        tasks.forEach(task => {
            renderTask(task)
        })
        input.disabled=false
        }).catch ((error)=> {
        alert(error)
    })
}

/*const saveTask = async(task)=>{
    saveTask(task).then((json)=>{
        renderTask(task)
        input.value=''
    })
} 삭제*/

const saveTask = async(task)=>{
    try {
        const json=JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/NEW', {
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body:json
        })
        return response.json()
        } catch (error) {
            alert("Error saying task "+error.message)
        }
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== '') {
            todos.saveTask(task).then((task)=> {
                renderTask(task)
                input.value=''
                input.focus()
                
            })
        }
    }
})


getTasks()

