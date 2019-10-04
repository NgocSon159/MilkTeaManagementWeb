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