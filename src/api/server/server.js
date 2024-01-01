import { createServer } from "miragejs"
let todos = []

if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"))
}
createServer({
    routes() {
        this.get("/api/todos", () => todos)
        this.post("/api/todos/addTodo", (schema, request) => {
            const currTodo = { id: todos.length + 1, text: request.requestBody, completed: false, color: "" }
            const newTodos = todos
            newTodos.push(currTodo)
            saveTodos(newTodos)
            return currTodo
        })
        this.patch("/api/todos/deleteTodo", (schema, request) => {
            const todoId = request.requestBody
            const newTodos = todos.filter(todo => todo.id != todoId)
            saveTodos(newTodos)
        })
        this.patch('/api/todos/todoToggle', (schema, request) => {
            const todoId = request.requestBody
            const newTodos = todos.map((todo) => {
                if (todo.id == todoId) {
                    todo.completed = !todo.completed
                }
                return todo
            }
            )
            saveTodos(newTodos)
        })
        this.patch('/api/todos/todoColorSelected', (schema, request) => {
            const { todoId, color } = JSON.parse(request.requestBody)
            const newTodos = todos.map((todo) => {
                if (todo.id == todoId) {
                    todo.color = color
                }
                return todo
            }
            )
            saveTodos(newTodos)
        })
        this.patch("/api/todos/todosMarkAllCompleted", () => {
            const newTodos = todos.map(todo => {
                todo.completed = true
                return todo
            })
            saveTodos(newTodos)
        })
        this.patch("/api/todos/todosClearCompleted", () => {
            const newTodos = todos.filter(todo => todo.completed != true)
            saveTodos(newTodos)
        })
    },
})
function saveTodos(newTodos) {
    todos = newTodos
    localStorage.setItem("todos", JSON.stringify(newTodos))
}