import todosSlice from "../features/todos/todosSlice";
import filtersSlice from "../features/filters/filtersSlice";
import '../api/server/server'
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: {
        todos: todosSlice,
        filters: filtersSlice
    }
})
export default store