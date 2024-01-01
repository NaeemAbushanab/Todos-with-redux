import { createSlice } from "@reduxjs/toolkit"
const statusFilters = {
    All: "all",
    Active: "active",
    Completed: "completed"
}
const initialState = {
    status: "all",
    colors: []
}
const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        statusFilterChanged(state, action) {
            state.status = action.payload
        },
        colorsFilterChanged: {
            reducer(state, action) {
                const { color, chnageType } = action.payload
                const { colors } = state
                switch (chnageType) {
                    case "add": {
                        state.colors.push(color)
                        break;
                    }
                    case "remove": {
                        state.colors = colors.filter(_color => _color != color)
                        break;
                    }

                }
            },
            prepare(color, chnageType) {
                return {
                    payload: { color, chnageType }
                }
            }
        }
    }
})
export { statusFilters }
export const { statusFilterChanged, colorsFilterChanged } = filtersSlice.actions
export default filtersSlice.reducer