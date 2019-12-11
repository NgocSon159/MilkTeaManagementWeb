import * as React from 'react';
import { Table } from '../../model/Table';
import { tableSelector } from '../../redux/selector/TableSelector';
import { ReduxState } from '../../redux/model/ReduxState';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { GetTableListAction, InitData } from '../../redux/action/actions';
import { NavLink } from 'react-router-dom';
import socketIo from "socket.io-client";
import { socketUrl } from "../../../common/config";
import { login } from "../../../common/utils/login";
import { stringify } from 'querystring';
const socket = socketIo(socketUrl);

interface IState {
    tableList?: Table[];
    isLogin?: boolean;
}
interface RouteProps {
    history?: any;
    match?: any;
    location?: any;
}
interface StateToProps {
    tables?: Table[];
    loginInfo?: any;
}
interface DispatchToProps {
    getTableList: () => void;
    // initData: (data: any) => void;
}
type OrderHomePropsType = StateToProps & DispatchToProps & RouteProps;

export class OrderHomeComponent extends React.Component<OrderHomePropsType, IState> {
    constructor(props: OrderHomePropsType) {
        super(props);
        this.state = {
            tableList: [],
            isLogin: false
        };
        console.log('OrderHomeComponent');
        if (props.loginInfo) {
            this.subcribe(props.loginInfo);
        }
        const thisClone = this;
        socket.on('plsUpdateWaiter', function () {
            console.log("plsUpdateWaiter recieved");
            thisClone.props.getTableList();
        });
    }

    subcribe = (loginInfo: any) => {
        socket.emit('sendUserName', loginInfo)
    }

    componentDidMount() {
        // debugger;
        const loginLocal: string = localStorage.getItem('loginInfor') || '';
        const { loginInfo } = this.props;
        console.log('loginLocal', loginLocal);
        console.log('loginInfo', loginInfo);
        if (loginInfo || loginLocal) {
            if (loginInfo && loginInfo.roleId === 'RWaiter') {
                this.canAccess();
            } else if (loginLocal) {
                let infor = JSON.parse(loginLocal);
                if (infor.roleId === 'RWaiter') {
                    this.canAccess();
                }
                else {
                    login(this.props.history, '/message');
                }
            } 
        } else {
            login(this.props.history, '/login');
        }

    }

    canAccess = () => {
        this.setState({
            isLogin: true
        });
        this.props.getTableList();
    }

    public render(): React.ReactNode {
        const { tables, loginInfo } = this.props;
        // const isLogin = loginInfo

        console.log('order home', this.props);
        const result = tables && tables.map((table, idx) => {
            let footerClass = "";
            // const tmpClass = table.statusTable === 'Full' ? 'footer-table-full' : 'footer-table-payment';
            // const footerClass = table.statusTable === 'Empty' ? 'footer-table-empty' : 'footer-table-full';
            if (table.statusTable === 'Empty') {
                footerClass = 'footer-table-empty';
            } else if (table.statusTable === 'Full') {
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
                    {table.statusTable === "Payment" ? 'Paymenting' : <NavLink to={`/order/${table.tableId}`} style={{ color: 'white' }}>
                        Need to {table.statusTable === 'Empty' ? 'order' : 'payment'}
                    </NavLink>}

                </div>
                <div className="icon">
                    <i className="fa fa-coffee"></i>
                </div>
                <div style={{ borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px" }} className={`small-box-footer ${footerClass}`}>{table.statusTable === 'Empty' ? 'Empty' : table.statusTable === 'Full' ? 'Full' : 'Payment'} <i className={iconClass}></i></div>
            </div>
        });
        return (
            <>
                {this.state.isLogin && <div>
                    <div className="table-container">
                        {result || 'loading ...'}
                    </div>
                </div>
                }
            </>
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
