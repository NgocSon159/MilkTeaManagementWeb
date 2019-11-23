import * as React from 'react';
import { Table } from '../../model/Table';
import { tableSelector } from '../../redux/selector/TableSelector';
import { ReduxState } from '../../redux/model/ReduxState';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { GetTableListAction, AddTableListAction } from '../../redux/action/actions';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ApiCall } from '../../../common/utils/callApi';

interface IState {
    tableList?: Table[];
}
interface StateToProps {
    tables?: Table[];
}
interface DispatchToProps {
    getTableList: () => void;
}
type OrderHomePropsType = StateToProps & DispatchToProps;

export class OrderHomeComponent extends React.Component<OrderHomePropsType, IState> {
    constructor(props: OrderHomePropsType) {
        super(props);
        this.state = {
            tableList: []
        };
    }

    componentDidMount() {
        this.props.getTableList();
    }

    public render(): React.ReactNode {
        const { tables } = this.props;
        const result = tables && tables.map((table, idx) => {
            const footerClass = table.statusTable === 'Empty' ? 'footer-table-empty' : 'footer-table-full';
            const iconClass = table.statusTable === 'Empty' ? 'fa  fa-smile-o' : 'fa  fa-frown-o';
            return <div className="small-box custom-table" key={idx}>
                <div className="inner">
                    <h3>{table.tableId}</h3>

                    <NavLink to={`/order/${table.tableId}`} style={{ color: 'white' }}>
                        Need to {table.statusTable === 'Empty' ? 'order' : 'payment'}
                    </NavLink>
                </div>
                <div className="icon">
                    <i className="fa fa-coffee"></i>
                </div>
                <div style={{ borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px" }} className={`small-box-footer ${footerClass}`}>{table.statusTable === 'Empty' ? 'Empty' : 'Full'} <i className={iconClass}></i></div>
            </div>
        });
        return (
            <div>
                <div className="table-container">
                    {result || 'loading ...'}
                </div>
            </div>
        )
    };
}

export function mapStateToProps(state: ReduxState): StateToProps {
    return {
        tables: tableSelector.selectAllTable(state),
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getTableList: () => dispatch(GetTableListAction()),
    }
}

// export function mapDispatchToProps(dispatch: any): DispatchToProps {
//     return {
//         setTableList: (tables) => dispatch(AddTableListAction(tables)),
//     }
// }

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const OrderHomeForm = compose(withConnect)(OrderHomeComponent);