import * as ActionType from '../action/actionTypes';
import { SetFoodToStoreAction } from '../action/actions';
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ApiCall } from '../../../common/utils/callApi';
import { from } from 'rxjs';

export const FoodEpic = (action$: any) => action$.pipe(
    ofType(ActionType.GET_FOOD_LIST),
    mergeMap(() => from(ApiCall('get', 'food', null)).pipe(
        map((res: any) => SetFoodToStoreAction(res.data)))
    ));
