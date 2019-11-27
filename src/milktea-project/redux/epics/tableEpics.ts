import * as ActionType from '../action/actionTypes';
import { TableServiceImpl } from '../../../common/service/Impl/TableServiceImpl';
import {
    AddTableListAction,
    CancelAction,
    SetOrderKitchen,
    UpdateOrder,
    UpdateOrderList,
    UpdatePaymentTable
} from '../action/actions';
import { ofType } from 'redux-observable';
import {mergeMap, map, mapTo} from 'rxjs/operators';
import { ApiCall } from '../../../common/utils/callApi';
import { from } from 'rxjs';

export const TableEpic = (action$: any) => action$.pipe(
    ofType(ActionType.GET_TABLE),
    mergeMap(() => from(ApiCall('get', 'table', null)).pipe(
        map((res: any) => AddTableListAction(res.data)))
    ));

export const OrderKitchenEpic = (action$: any) => action$.pipe(
    ofType(ActionType.GET_ORDER_KITCHEN),
    mergeMap(() => from(ApiCall('get', 'order/user/barista', null)).pipe(
        map((res: any) => SetOrderKitchen(res.data)))
    ));

export const ProcessOrderEpic = (action$: any) => action$.pipe(
    ofType(ActionType.PROCESS_ORDER),
    mergeMap(() => from(ApiCall('post', 'order/user/barista', null)).pipe(
        map((res: any) => SetOrderKitchen(res.data)))
    ));

export const OrderFromTableEpic = (action$: any) => action$.pipe(
    ofType(ActionType.GET_ORDER_FROM_TABLE),
    mergeMap((action$: any) => from(ApiCall('get', `table/getOrder/${action$.tableId}`, null)).pipe(
        map((res: any) => UpdateOrder(res.data)))
    ));

export const PaymentTableEpic = (action$: any) => action$.pipe(
    ofType(ActionType.GET_TABLE_PAYMENT),
    mergeMap(() => from(ApiCall('get', 'table/payment', null)).pipe(
        map((res: any) => UpdatePaymentTable(res.data)))
    ));
