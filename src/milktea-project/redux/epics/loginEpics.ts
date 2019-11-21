import * as ActionType from '../action/actionTypes';
import { GetLoginInfo } from '../action/actions';
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ApiCall } from '../../../common/utils/callApi';
import { from } from 'rxjs';

export const LoginEpic = (action$: any) => action$.pipe(
    ofType(ActionType.GET_LOGIN_INFO),
    mergeMap(() => from(ApiCall('get', 'table', null)).pipe(
        map((res: any) => GetLoginInfo(res.data)))
    )); 