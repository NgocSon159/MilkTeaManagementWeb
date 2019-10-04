import { ActionData } from './../model/ActionData';
import * as actionType from '../action/actionTypes';
 
export function initReducer(state: any = {}, action: ActionData){
    switch (action.type){
        case actionType.UPDATE_STATE:
            return {tables: action.tables};
        default: return state;
    }
}