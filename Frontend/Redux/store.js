import { createStore, combineReducers } from "redux";
import cartReducer from './reducers/cartReducer'
import pageReducer from './reducers/pageReducer'


const reducer = combineReducers({
    cart: cartReducer,
    page: pageReducer,
})

export default createStore(reducer);


