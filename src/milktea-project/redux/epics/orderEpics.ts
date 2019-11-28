import * as ActionType from '../action/actionTypes';
import { CancelAction, UpdateOrder, UpdatePaymentOrder } from '../action/actions';
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
export const PaymentOrderEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.GET_PAYMENT_ORDER),
    mergeMap((action$: any) => from(ApiCall('get', `table/getOrder/${action$.tableId}`, null)).pipe(
        map((res: any) => UpdatePaymentOrder(res.data))
    )
    )); 