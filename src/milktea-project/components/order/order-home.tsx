import * as React from 'react';
import { Table } from '../../model/Table';
import { tableSelector } from '../../redux/selector/TableSelector';
import { ReduxState } from '../../redux/model/ReduxState';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { GetTableListAction, InitData } from '../../redux/action/actions';
import { NavLink } from 'react-router-dom';
import socketIo from "socket.io-client";
import {socketUrl} from "../../../common/config";
const socket = socketIo(socketUrl);

interface IState {
    tableList?: Table[];
}
interface StateToProps {
    tables?: Table[];
    loginInfo?: any;
}
interface DispatchToProps {
    getTableList: () => void;
    // initData: (data: any) => void;
}
type OrderHomePropsType = StateToProps & DispatchToProps;

export class OrderHomeComponent extends React.Component<OrderHomePropsType, IState> {
    constructor(props: OrderHomePropsType) {
        super(props);
        this.state = {
            tableList: []
        };
        console.log('OrderHomeComponent');
        if(props.loginInfo) {
            this.subcribe(props.loginInfo);
        }
        const thisClone = this;
        socket.on('plsUpdateWaiter', function(){
            console.log("plsUpdateWaiter recieved");
            thisClone.props.getTableList();
        });
    }

    componentDidMount() {
        this.props.getTableList();
    }

    subcribe = (loginInfo: any) => {
        socket.emit('sendUserName', loginInfo)
    }

    public render(): React.ReactNode {
        const { tables, loginInfo } = this.props;
        // if(loginInfo) {
        //     this.subcribe(loginInfo);
        // }
        console.log('order home', this.props);
        const result = tables && tables.map((table, idx) => {
            let footerClass = "";
            // const tmpClass = table.statusTable === 'Full' ? 'footer-table-full' : 'footer-table-payment';
            // const footerClass = table.statusTable === 'Empty' ? 'footer-table-empty' : 'footer-table-full';
            if(table.statusTable === 'Empty'){
                footerClass = 'footer-table-empty';
            }else if (table.statusTable === 'Full') {
                footerClass = 'footer-table-full';
            } else {
                footerClass = 'footer-table-payment';
            }
            const iconClass = table.statusTable === 'Empty' ? 'fa  fa-smile-o' : 'fa  fa-frown-o';
            return <div className="small-box custom-table" key={idx}>
                <div className="inner">
                    <h3>{table.tableId}</h3>
                    {/*{*/}
                    {/*    table.statusTable !== 'Payment' ? <NavLink to={`/order/${table.tableId}`} style={{ color: 'white' }}>*/}
                    {/*        Need to {table.statusTable === 'Empty' ? 'order' : 'payment'}*/}
                    {/*    </NavLink> : ""*/}
                    {/*}*/}
                    {table.statusTable === "Payment" ? 'Paymenting' :  <NavLink to={`/order/${table.tableId}`} style={{ color: 'white' }}>
                        Need to {table.statusTable === 'Empty' ? 'order' : 'payment'}
                    </NavLink>}
                   
                </div>
                <div className="icon">
                    <i className="fa fa-coffee"></i>
                </div>
                <div style={{ borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px" }} className={`small-box-footer ${footerClass}`}>{table.statusTable === 'Empty' ? 'Empty' : table.statusTable === 'Full' ? 'Full': 'Payment'} <i className={iconClass}></i></div>
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
        loginInfo: state.globalState.loginInfo
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getTableList: () => dispatch(GetTableListAction())
        // initData: (data) => dispatch(InitData(data))
    }
}

// export function mapDispatchToProps(dispatch: any): DispatchToProps {
//     return {
//         setTableList: (tables) => dispatch(AddTableListAction(tables)),
//     }
// }

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const OrderHomeForm = compose(withConnect)(OrderHomeComponent);
