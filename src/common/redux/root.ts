import { combineReducers } from 'redux';
import { initReducer } from '../../milktea-project/redux/reducer/initReducer';
import { orderReducer } from '../../milktea-project/redux/reducer/orderReducer';
import { combineEpics } from 'redux-observable';
import { TableEpic } from '../../milktea-project/redux/epics/tableEpics';
import { LoginEpic } from '../../milktea-project/redux/epics/loginEpics';
import { FoodEpic } from '../../milktea-project/redux/epics/foodEpics';

export const RootReducer = combineReducers({globalState: initReducer, orderState: orderReducer});

export const RootEpic: any = combineEpics(TableEpic, LoginEpic, FoodEpic);
