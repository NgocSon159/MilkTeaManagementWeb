import * as React from 'react';
import { connect } from 'react-redux';
import { OrderListForm } from './order-list';
import { ProductListForm } from './product-list';
import { RouteComponentProps } from 'react-router-dom';


export class OrderTableComponent extends React.Component<RouteComponentProps> {
    public render(): React.ReactNode {
        const { history, match, location } = this.props;
        return (
            <div>
                <div className="table-container">
                    <ProductListForm />
                    <OrderListForm matchProp={match} />
                </div>
            </div>
        )
    };
}

// export function mapDispatchToProps(dispatch: any): DispatchToProps {
//     return {
//         setRouteInfo: (data: any) => dispatch(SetRouteFormInfo(data))
//     }
// };


// const withConnect = connect(mapStateToProps, null);

export const OrderTableForm = connect(null, null)(OrderTableComponent);