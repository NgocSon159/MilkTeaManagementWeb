import { Table } from './../../model/Table';
import { createSelector, Selector } from 'reselect';
import { ReduxState } from '../model/ReduxState';

export class TableSelector {
    private selectGlobalState : Selector<ReduxState, any> = (state: ReduxState) => state.globalState;

    public selectAllTable = createSelector<ReduxState, ReduxState, any> (
        this.selectGlobalState,
        (globalState: any) => {
            return globalState.tables;
        }
    );
}

export const tableSelector = new TableSelector();