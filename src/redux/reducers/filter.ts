import { Toggle } from "../models/app-model";
import { TOGGLE_SIDEBAR } from "../types/types";



export function toggleClickReducer(state: Toggle = {isOpen:true}, action: any) {
    switch (action.type) {
		case TOGGLE_SIDEBAR:
            return { isOpen: action.payload};
		default:
			return state;
	}
}

