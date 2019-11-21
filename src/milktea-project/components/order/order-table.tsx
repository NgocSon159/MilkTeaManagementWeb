import * as React from 'react';
import { connect } from 'react-redux';
import { tableSelector } from '../../redux/selector/TableSelector';
import { Table } from '../../model/Table';
import store from '../../../common/redux/store';
import { compose } from 'redux';
import { OrderListForm } from './order-list';
import { ProductListForm } from './product-list';
import { SetRouteFormInfo } from '../../redux/action/actions';
import { RouteInfo } from '../../model/RouteInfo';
import { RouteComponentProps } from 'react-router-dom';

// interface StateToProps {
//     tables?: Table[];
// }

// interface DispatchToProps {
//     setRouteInfo: (data: any) => void;
// }
export class OrderTableComponent extends React.Component<RouteComponentProps> {
    // constructor(props: any) {
    //     super(props);
    // }
    public render(): React.ReactNode {
        console.log("props-tabele", this.props);
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