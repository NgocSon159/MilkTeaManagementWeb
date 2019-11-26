import { ActionData } from './../model/ActionData';
import * as actionType from '../action/actionTypes';

export function orderReducer(state: any = {}, action: ActionData) {
  // debugger;
    switch (action.type) {
        // case actionType.INIT_DATA:
        //   return {orderList: []}
        case actionType.UPDATE_ORDER_LIST:
          return {orderList: [...action.orderList]}  
        default: return state;
    }
}