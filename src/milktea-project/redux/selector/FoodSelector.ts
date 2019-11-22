import { Table } from './../../model/Table';
import { createSelector, Selector } from 'reselect';
import { ReduxState } from '../model/ReduxState';

export class FoodSelector {
    private selectGlobalState : Selector<ReduxState, any> = (state: ReduxState) => state.globalState;

    public selectAllFood = createSelector<ReduxState, ReduxState, any> (
        this.selectGlobalState,
        (globalState: any) => {
            return globalState.food;
        }
    );
}

export const foodSelector = new FoodSelector();
