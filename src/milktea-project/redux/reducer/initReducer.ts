import { ActionData } from './../model/ActionData';
import * as actionType from '../action/actionTypes';

export function initReducer(state: any = {}, action: ActionData) {
    switch (action.type) {
        case actionType.UPDATE_STATE:
            return {
                ...state,
                tables: action.tables
            };
        // case actionType.UPDATE_ORDER_LIST:
        //     return { orderlist: [...state.globalState.orderlist, action.order] };
        case actionType.SET_FORM_INFO:
            return {
                // ...state,
                formInfo: action.formInfo
            };
        case actionType.SET_LOGIN_INFO:
            return {
                ...state,
                loginInfo: action.loginInfo
            };
        case actionType.SET_FOOD_LIST:
            return {
                ...state,
                food: action.food
            };
        case actionType.SET_PAGE_LIST_FOOD:
            return {
                ...state,
                pageFood: action.pageFood
            };
        default: return state;
    }
}
