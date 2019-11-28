import * as React from 'react';
import {connect} from 'react-redux';
import {GetOrderKitchen} from "../../redux/action/actions";
import {OrderTableRow, OrderTableRowComponent} from "./OrderTableRow";
import socketIo from 'socket.io-client';

const socket = socketIo('http://localhost:3500');

interface StateToProps {
    orderKitchen?: any
    loginInfo?: any
}

interface DispatchToProps {
    getOrderKitchen: () => void;
}

interface IProps {
}

export class KitchenHome extends React.Component <IProps & StateToProps & DispatchToProps> {
    constructor(props: any) {
        super(props);
        const thisClone = this;
        socket.on('connect', function(){
            console.log("ok");
        });
        socket.on('plsUpdateKitchen', function(){
            console.log("plsUpdateKitchen recieved");
            thisClone.forceRefresh();
        });
    }

    componentDidMount(): void {
        this.props.getOrderKitchen();
    }

    state = {
        count: 0
    }

    forceRefresh = () => {
        console.log("rf");
        this.props.getOrderKitchen();
        socket.emit('baristaUpdate');
        // this.setState({count: this.state.count + 1})
    }

    subcribe = (loginInfo: any) => {
        socket.emit('sendUserName', loginInfo)
    }

    public render(): React.ReactNode {
        console.log('render kitchen', this.props);

        const {orderKitchen, loginInfo} = this.props;
        if (loginInfo) {
            this.subcribe(loginInfo);
        }
        const bgcl = {
            backgroundColor: '#FFFFFF'
        };
        const bgclOrange = {
            backgroundColor: '#FFFFFF'
        }

        let tables: any = [{id: '1', statusTable: 'Empty'}, {id: '2', statusTable: 'Empty'}, {
            id: '3',
            statusTable: 'Full'
        }];

        // @ts-ignore
        return (
            <div className="panel-body text-center" aria-hidden="true">
                <table className="table" style={bgcl}>
                    <thead>
                    <tr className="panel-heading">
                        <th style={{width: "40%"}}> Order No.</th>
                        <th style={{width: "30%"}}> Table</th>
                        <th style={{width: "30%"}}> Status</th>
                        <th style={{width: "10%"}}> </th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        orderKitchen && orderKitchen.map((item: any, idx: any) =>
                            <OrderTableRowComponent order = {item} forceRefresh={this.forceRefresh}/>
                        )
                    }
                    {/*<tr>*/}
                    {/*    <th scope="row">001001</th>*/}
                    {/*    <th>1</th>*/}
                    {/*    <th>Ordered <button>Process</button></th>*/}
                    {/*    /!*if status Order = Ordered => <th> Status <button> Process </button> </th>*!/*/}
                    {/*    /!*   else <th> Status </th>*!/*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th scope="row">001002</th>*/}
                    {/*    <th>2</th>*/}
                    {/*    <th>Processing</th>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}

                    {/*</tr>*/}
                    </tbody>
                </table>
            </div>
        )
    };
}


export function mapStateToProps(state: any): StateToProps {
    return {
        orderKitchen: state.orderState.orderKitchen,
        loginInfo: state.globalState.loginInfo
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getOrderKitchen: () => dispatch(GetOrderKitchen()),
    }
};


export const KitchenHomeComponent = connect(mapStateToProps, mapDispatchToProps)(KitchenHome);
