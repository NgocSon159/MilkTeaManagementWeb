import * as ActionType from '../action/actionTypes';
import { SetLoginInfo, GetLoginInfo } from '../action/actions';
import { ofType } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ApiCall } from '../../../common/utils/callApi';
import { from } from 'rxjs';

export const LoginEpic = (action$: any, state$: any) => action$.pipe(
    ofType(ActionType.GET_LOGIN_INFO),
    mergeMap(() => from(ApiCall('post', 'login', state$.value.globalState.formInfo)).pipe(
        map((res: any) => SetLoginInfo(res.data)))
    )); 