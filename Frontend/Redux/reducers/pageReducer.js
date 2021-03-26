
const initialState = {
    previousLocation: null,
    location: null,
    agreedToCookiePolicy:null,
}

const pageReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case "SET_PREVIOUS_LOCATION":
        return { ...state, previousLocation: payload }

        case "SET_LOCATION":
            return { ...state, location: payload }
    
    default:
        return state
    }
}
export default pageReducer;