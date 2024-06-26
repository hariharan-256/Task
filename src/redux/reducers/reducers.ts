import { combineReducers } from "redux";
import { toggleClickReducer } from "./filter";
import { productsListReducer } from "./products";



// COMBINED REDUCERS
const reducers: object = {
    ToggleClickState: toggleClickReducer,
    productState:productsListReducer
};

export default combineReducers(reducers);
