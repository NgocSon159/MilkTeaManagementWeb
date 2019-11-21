import { createSelector, Selector } from 'reselect';
import { ReduxState } from '../model/ReduxState';

export class RouteSelector {
    private selectGlobalState : Selector<ReduxState, any> = (state: ReduxState) => state.globalState;

    public selectRouteInfo = createSelector<ReduxState, ReduxState, any> (
        this.selectGlobalState,
        (globalState: any) => {
            return globalState.routeInfos;
        }
    );
}

export const routeSelector = new RouteSelector();