import { ActionData } from './../model/ActionData';
import * as actionType from '../action/actionTypes';

export function initReducer(state: any = {}, action: ActionData) {
    switch (action.type) {
        case actionType.UPDATE_STATE:
            return { tables: action.tables };
        case actionType.UPDATE_ORDER_LIST:
            return { orderlist: [...state.globalState.orderlist, action.order] };
        case actionType.SET_FORM_INFO:
            return { formInfo: action.formInfo };
        case actionType.SET_LOGIN_INFO:
            return { loginInfo: action.loginInfo };
        default: return state;
    }
}