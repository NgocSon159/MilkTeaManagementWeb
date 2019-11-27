import { ActionData } from './../model/ActionData';
import * as actionType from '../action/actionTypes';

export function orderReducer(state: any = {}, action: ActionData) {
  switch (action.type) {
    // case actionType.INIT_DATA:
    //   return {orderList: []}
    case actionType.UPDATE_ORDER_LIST:
      return {
        ...state,
        orderList: [...action.orderList]
      }
    case actionType.UPDATE_ORDER:
      return { order: action.order }
    case actionType.SET_ORDER_KITCHEN:
      return {orderKitchen: action.orderKitchen}
      return {
        order: { ...action.order }
      }
    case actionType.UPDATE_PAYMENT_TABLE:
      return {
        paymentTables: action.paymentTables
      }
    default: return state;
  }
}
