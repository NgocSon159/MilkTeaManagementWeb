import * as ActionType from '../action/actionTypes';
import { CancelAction, UpdateOrder, UpdatePaymentOrder, UpdateMemberShipToState } from '../action/actions';
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ApiCall } from '../../../common/utils/callApi';
import { from } from 'rxjs';

export const OrderEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.POST_ORDER),
    mergeMap(() => from(ApiCall('post', 'order', state$.value.orderState.order)).pipe(
        map((res: any) => CancelAction())
    )
    ));

export const ReOrderEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.REORDER),
    mergeMap(() => from(ApiCall('put', 'order/reOrder', state$.value.orderState.order)).pipe(
        map((res: any) => CancelAction())
    )
    ));

export const PaymentOrderEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.GET_PAYMENT_ORDER),
    mergeMap((action$: any) => from(ApiCall('get', `table/getOrder/${action$.tableId}`, null)).pipe(
        map((res: any) => UpdatePaymentOrder(res.data))
    )
    ));

export const MemberEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.GET_MEMBER_SHIP),
    mergeMap((action$: any) => from(ApiCall('get', `customer/${action$.customerId}`, null)).pipe(
        map((res: any) => UpdateMemberShipToState(res.data))
    )
    ));

export const postPaymentOrderEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.POST_PAYMENT_ORDER),
    mergeMap((action$: any) => from(ApiCall('put', `order/user/cashier/payment/${action$.postOrder['completedBy']}`, action$.postOrder)).pipe(
        map((res: any) => UpdatePaymentOrder(res.data))
    )
    )); 