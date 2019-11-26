import { ActionData } from './../model/ActionData';
import * as actionType from '../action/actionTypes';

export function orderReducer(state: any = {}, action: ActionData) {
  switch (action.type) {
    // case actionType.INIT_DATA:
    //   return {orderList: []}
    case actionType.UPDATE_ORDER_LIST:
      return { orderList: [...action.orderList] }
    case actionType.UPDATE_ORDER:
      return { order: action.order }
    default: return state;
  }
}