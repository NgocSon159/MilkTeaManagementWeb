import * as ActionType from '../action/actionTypes';
import { TableServiceImpl } from '../../../common/service/Impl/TableServiceImpl';
import { AddTableListAction, UpdateOrder } from '../action/actions';
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ApiCall } from '../../../common/utils/callApi';
import { from } from 'rxjs';

// class TableEpic {
//     private tableServiceImpl = new TableServiceImpl();
//     public getTableList = (action$: any) => action$.ofType(ActionType.GET_TABLE).mergeMap(
//         this.tableServiceImpl.getAllTableInfor()).map((res: any) => AddTableListAction(res))
// }

// export const tableEpic = new TableEpic();

export const TableEpic = (action$: any) => action$.pipe(
    ofType(ActionType.GET_TABLE),
    mergeMap(() => from(ApiCall('get', 'table', null)).pipe(
        map((res: any) => AddTableListAction(res.data)))
    ));

export const OrderEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.POST_ORDER),
    mergeMap(() => from(ApiCall('post', 'order', state$.value.orderState.order))
    )); 