import * as React from 'react';
import { connect } from 'react-redux';
import { OrderListForm } from './order-list';
import { ProductListForm } from './product-list';
import { RouteComponentProps } from 'react-router-dom';
import { orderSelector } from '../../redux/selector/OrderSelector';

interface StateToProps {
    orderList?: any;
}
export class OrderTableComponent extends React.Component<StateToProps & RouteComponentProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            isReload: false
        };
    }
    // componentDidMount() {
    //     const { orderList } = this.props;
    //     if (orderList) {
    //         this.setState({
    //             isReload: true
    //         });
    //     }
    // }
    // shouldComponentUpdate(nextProps: any, nextState: any) {
    //     console.log('nextProps', nextProps);
    //     console.log('nextState', nextState);
    //     return true;
    // }
    public render(): React.ReactNode {
        const { history, match, location } = this.props;
        return (
            <div>
                <div className="table-container">
                    <ProductListForm />
                    <OrderListForm matchProp={match} 
                    // orderList={this.props.orderList} 
                    />
                </div>
            </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    return {
        orderList: orderSelector.selectOrderList(state)
    }
};


// const withConnect = connect(mapStateToProps, null);

export const OrderTableForm = connect(mapStateToProps, null)(OrderTableComponent);