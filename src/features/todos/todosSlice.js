import { createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { statusFilters } from "../filters/filtersSlice";
const initialState = {
    status: null,
    entities: {}
}
const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        _loadingScreen(state, action) {
            state.status = "loading"
        },
        _todosLoaded(state, action) {
            const todosFromApi = action.payload
            todosFromApi.map(todo => {
                state.entities[todo.id] = todo
            })
        },
        _todoAdded(state, action) {
            const todo = action.payload
            state.entities[todo.id] = todo
        },
        _todoToggle(state, action) {
            const todoId = action.payload
            const todo = state.entities[todoId]
            todo.completed = !todo.completed
        },
        _todoColorSelected: {
            reducer(state, action) {
                const { color, todoId } = action.payload
                const todo = state.entities[todoId]
                todo.color = color
            },
            prepare(todoId, color) {
                return { payload: { todoId, color } }
            }
        },
        _todoDeleted(state, action) {
            delete state.entities[action.payload]
        },
        _todosMarkAllCompleted(state, action) {
            const newTodos = Object.values(state.entities)
            newTodos.map(todo => todo.completed = true)
        },
        _todosClearCompleted(state, action) {
            const { entities } = state
            Object.values(state.entities).filter(todo => {
                if (todo.completed == true) delete entities[todo.id]
            })
        }
    }
})
// middleware functions
const todosLoaded = (dispatch) => {
    axios.get("/api/todos").then(({ data }) => {
        dispatch(todosSlice.actions._todosLoaded(data))
    });
}
const todoAdded = (text) => (dispatch) => {
    axios.post("/api/todos/addTodo", text).then(({ data }) => dispatch(todosSlice.actions._todoAdded(data))
    )
}
const todoDeleted = (todoId) => (dispatch) => {
    dispatch(todosSlice.actions._todoDeleted(todoId))
    axios.patch('/api/todos/deleteTodo', todoId)
}
const todoToggle = (todoId) => (dispatch) => {
    dispatch(todosSlice.actions._todoToggle(todoId))
    axios.patch('/api/todos/todoToggle', todoId)
}
const todoColorSelected = (todoId, color) => (dispatch) => {
    dispatch(todosSlice.actions._todoColorSelected(todoId, color))
    axios.patch('/api/todos/todoColorSelected', { todoId, color })
}
const todosMarkAllCompleted = () => (dispatch) => {
    dispatch(todosSlice.actions._todosMarkAllCompleted())
    axios.patch("/api/todos/todosMarkAllCompleted")
}
const todosClearCompleted = () => (dispatch) => {
    dispatch(todosSlice.actions._todosClearCompleted())
    axios.patch("/api/todos/todosClearCompleted")

}
// reselect functions
const selectTodosIdWithFiltering = createSelector(
    state => state,
    (state) => {
        const { todos, filters } = state
        const TodosArray = Object.values(todos.entities)
        let resultTodos;

        if (filters.status == statusFilters.All) resultTodos = TodosArray
        else if (filters.status == statusFilters.Completed) resultTodos = TodosArray.filter(todo => todo.completed == true)
        else resultTodos = TodosArray.filter(todo => todo.completed == false)
        if (filters.colors.length > 0) {
            resultTodos = resultTodos.filter(todo => filters.colors.includes(todo.color))
        }
        return resultTodos.map(todo => todo.id)
    }

)
const selectRemainingTodos = createSelector(
    state => state.todos.entities,
    entities => {
        const todosArray = Object.values(entities).filter(todo => todo.completed == false)
        return todosArray.length
    }
)
export {
    todoAdded,
    todosLoaded,
    todoDeleted,
    todoToggle,
    todoColorSelected,
    todosMarkAllCompleted,
    todosClearCompleted,
    selectTodosIdWithFiltering,
    selectRemainingTodos
}
export default todosSlice.reducer