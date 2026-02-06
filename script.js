let todoForm = document.querySelector('form')
let todoInp = document.getElementById('todoInp')
let todoList = document.getElementById('todoList')
let totalCount = document.getElementById('totalCount')
let completedsCount = document.getElementById('completedsCount')

let todos = JSON.parse(localStorage.getItem('todos')) || []

function printTodos (arr) {
    localStorage.setItem('todos',JSON.stringify(todos))
    todoList.innerHTML = ''
    arr.forEach((e) => {
        todoList.innerHTML += `<li>
            <label>
                <input onchange="completeTodo(${e.id})" ${e.completed?'checked':null} type="checkbox" >
                <span class="${e.completed? 'katarvac': ''}" >${e.title}</span>
            </label>
            <button onclick="deleteItem(${e.id})">x</button>
        </li>`
    })
    totalCount.innerHTML = todos.length
    completedsCount.innerHTML = todos.filter((e)=>e.completed).length
}

function deleteItem(id) {
    todos = todos.filter((e) => e.id !== id)
    printTodos (todos)
}

printTodos (todos)

todoForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (todoInp.value.trim() !== '') {
        todos.push({
            id: Math.random(),
            title: todoInp.value,
            completed: false
        })
    }
    todoInp.value = ''
    printTodos (todos)
})

function removeAll() {
    todos = []
    printTodos (todos)
}

function completeTodo(id) {
    todos = todos.map((e)=>{
        if (e.id===id) {
            e.completed = !e.completed
        }
        return e
    })
    printTodos (todos)
}

function clearCompleteds(){
    todos = todos.filter((e)=>!e.completed)
    printTodos (todos)
}


