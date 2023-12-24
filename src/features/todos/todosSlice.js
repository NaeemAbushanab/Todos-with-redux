const findNextID = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}
function todosSlice(state, action) {
    if (state == null) state = []
    let currentTodos;
    switch (action.type) {
        case "todos/todoAdded": {
            currentTodos = [
                ...state,
                {
                    id: findNextID(state),
                    text: action.payload,
                    completed: false,
                    color: ""
                }
            ]
            break;
        }
        case "todos/todoRemove": {
            currentTodos = state.filter((todo) => {
                if (action.payload != todo.id) return todo
            })
            break;
        }
        case "todos/todoCompleted": {
            currentTodos = state.map((todo) => {
                if (todo.id != action.payload) return todo
                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
            break;
        }
        case "todos/todoColor": {
            currentTodos = state.map((todo) => {
                if (todo.id != action.payload.todoId) return todo
                return {
                    ...todo,
                    color: action.payload.color
                }
            })
            break;
        }
        case "todos/todosMarkAllCompleted": {
            currentTodos = state.map((todo) => {
                return {
                    ...todo,
                    completed: true
                }
            })
            break;
        }
        case "todos/todosClearCompleted": {
            currentTodos = state.filter((todo) => todo.completed == false)
            break;
        }
        default:
            currentTodos = state
    }
    localStorage.setItem("todos", JSON.stringify(currentTodos))
    return currentTodos
}
const todoAdded = (text) => ({ type: "todos/todoAdded", payload: text })
const todoRemove = (todoId) => ({ type: "todos/todoRemove", payload: todoId })
const todoCompleted = (todoId) => ({ type: "todos/todoCompleted", payload: todoId })
const todoColor = (todoId, color) => ({ type: "todos/todoColor", payload: { todoId, color } })
const todosMarkAllCompleted = () => ({ type: "todos/todosMarkAllCompleted" })
const todosClearCompleted = () => ({ type: "todos/todosClearCompleted" })
export { todoAdded, todoRemove, todoCompleted, todoColor, todosMarkAllCompleted, todosClearCompleted }
export default todosSlice