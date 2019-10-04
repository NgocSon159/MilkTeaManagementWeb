import { combineReducers } from 'redux';
import { initReducer } from '../../milktea-project/redux/reducer/initReducer';
import { combineEpics } from 'redux-observable';
import { TableEpic } from '../../milktea-project/redux/epics/tableEpics';

export const RootReducer = combineReducers({globalState: initReducer});

export const RootEpic: any = combineEpics(TableEpic);