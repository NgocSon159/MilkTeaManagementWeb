import { createSelector, Selector } from 'reselect';
import { ReduxState } from '../model/ReduxState';

export class OrderSelector {
    private selectOrderState : Selector<ReduxState, any> = (state: ReduxState) => state.orderState;

    public selectOrderList = createSelector<ReduxState, ReduxState, any> (
        this.selectOrderState,
        (orderState: any) => {
            return orderState.orderList;
        }
    );
}

export const orderSelector = new OrderSelector();