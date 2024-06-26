import {  ProductsModel, ResponseType } from "../models/app-model";
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_RESET, GET_PRODUCTS_SUCCESS, UPDATE_PRODUCTS } from "../types/types";


const ProductsListState = {
    data: [],
    total:0,
    fetching: false,
    requestComplete: false,
    error: "",
  };
export function productsListReducer(
	state: ProductsModel = ProductsListState,
	action: ResponseType
) {
	switch (action.type) {
		case GET_PRODUCTS_REQUEST:
			return {
				...state,
				fetching: true,
				error: "",
			};
		case GET_PRODUCTS_SUCCESS:
            return {
                data: action?.payload?.products,
                total:action?.payload?.total,
                fetching: false,
                requestComplete:true,
				error: "",
			};
        case GET_PRODUCTS_RESET:
            return {
                data: [],
                total:0,
                fetching: false,
                requestComplete: false,
                error: "",
            };
        case GET_PRODUCTS_FAILURE:
            return {
                fetching: false,
                requestComplete: false,
                error: action.payload,
            };
        case UPDATE_PRODUCTS:
                return {
                    ...state,
                    data: state.data.map((product:any) =>
                        product.id === action.payload.id ? action.payload : product
                    ),
                };
	
		default:
			return state;
	}
}