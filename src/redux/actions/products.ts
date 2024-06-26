import axios from "axios";
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, UPDATE_PRODUCTS } from "../types/types";

// Thunk Action type
export const productsListAction = (data:any) => async (dispatch: Function) => {
      try {
        dispatch({ type: GET_PRODUCTS_REQUEST });
        axios
            .get(
                `https://dummyjson.com/products?limit=${data?.limit}&skip=${data?.skip}`,
            )
            .then((response:any) => {
                dispatch({
                    type: GET_PRODUCTS_SUCCESS,
                    payload: response?.data,
                });
            });
    } catch (error:any) {
        dispatch({
            type: GET_PRODUCTS_FAILURE,
        });
    }
}

export const updateProduct = (product: any) => {
    return {
        type: UPDATE_PRODUCTS,
        payload: product,
    };
};
