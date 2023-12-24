import { combineReducers, createStore } from "redux";
import todosSlice from "../features/todos/todosSlice";
import filtersSlice from "../features/filters/filtersSlice";

const preloadedState = {
    todos: JSON.parse(localStorage.getItem('todos')),
}
const store = createStore(
    combineReducers({
        todos: todosSlice,
        filters: filtersSlice
    }), preloadedState
)
export default store