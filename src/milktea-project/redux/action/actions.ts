import { RouteInfo } from './../../model/RouteInfo';
import { Table } from './../../model/Table';
import * as actionType from './actionTypes';

function createAction<T>(d: T): T {
    return d;
}

export const AddTableListAction = (tables: Table[]) => createAction({
    type: actionType.UPDATE_STATE,
    tables 
});

export const GetTableListAction = () => createAction({
    type: actionType.GET_TABLE,
});

export const UpdateOrderList = (order: any) =>createAction({
    type: actionType.UPDATE_ORDER_LIST,
    order
});

export const SetRouteFormInfo = (routeInfos: any) => createAction({
    type: actionType.SET_ROUTE,
    routeInfos
});

export const GetLoginInfo = (dataRequest: any) => createAction({
    type: actionType.GET_LOGIN_INFO,
    dataRequest
});

export const SetLoginInfo = (dataRespond: any) => createAction({
    type: actionType.SET_LOGIN_INFO,
    dataRespond
})