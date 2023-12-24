import { useSelector } from "react-redux";
const initialValue = {
    status: "all",
    colors: ["red"]
}
function filtersSlice(state = initialValue, action) {
    let filters;
    switch (action.type) {
        case "filters/filtersByStatus": {
            filters = {
                ...state,
                status: action.payload
            }
            break;
        }
        case "filtes/filtersByColors": {
            let colors;
            if (action.payload.changeType == "add") colors = state.colors.concat(action.payload.color)
            else colors = state.colors.filter((color) => color != action.payload.color)
            filters = {
                ...state,
                colors
            }
            break;
        }
        default:
            filters = state
    }
    return filters
}
const filtersByStatus = (status) => ({ type: "filters/filtersByStatus", payload: status })
const filtersByColors = (color, changeType) => ({ type: 'filtes/filtersByColors', payload: { color, changeType } })
export { filtersByStatus, filtersByColors }
export default filtersSlice