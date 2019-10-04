import { createEpicMiddleware } from 'redux-observable';
import { RootReducer, RootEpic } from './root';
import { combineReducers, createStore, applyMiddleware } from 'redux';

export interface IRootState {
    tables: any
}

// const TableEpic: any = tableEpic;
const epicMiddleware = createEpicMiddleware();

const store = createStore(RootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(RootEpic);
export default store;
