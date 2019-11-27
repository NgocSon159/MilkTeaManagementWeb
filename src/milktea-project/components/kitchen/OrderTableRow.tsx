import React from "react";
import {OrderStatusEnum} from "../../enum/OrderStatusEnum";
import {FoodStatusEnum} from "../../enum/FoodStatusEnum";
import {GetOrderKitchen, ProcessOrder} from "../../redux/action/actions";
import {connect} from "react-redux";
import {KitchenHome} from "./KitchenHome";

interface OrderProps {
    order?: any
}

interface StateToProps {
    orderKitchen?: any
}

interface DispatchToProps {
    processOrder: (orderProcess: any, userName: any) => void;
}

export class OrderTableRow extends React.Component<StateToProps & DispatchToProps & OrderProps> {
    constructor(props: any) {
        super(props)
    }
    state = {
        expanded: false
    }

    expand = () => {
        console.log("kjkhjk");
        this.setState({expanded: !this.state.expanded})
    }

    process = (order: any) => {
        console.log("asdasd")
        this.props.processOrder(order, "barista");
    }



    render() {
        const { order } = this.props;
        const {expanded} = this.state;
        return(
            <>
                <tr key={order.orderId}>
                    <th onClick={this.expand} scope="row">{order.orderId}</th>
                    <th onClick={this.expand}>{order.tableId}</th>
                    <th onClick={this.expand}>{order.statusOrder}</th>
                    <th>
                        {
                            order.statusOrder === OrderStatusEnum.Ordered ? <button>Process</button> : ""
                        }

                    </th>
                </tr>
                {
                    expanded ? <tr>
                        <table  id={order.orderId} style={{width: "250%"}} >
                            <thead>
                            <tr className="panel-heading">
                                <td style={{width: "40%"}}> Name:</td>
                                <td style={{width: "10%"}}> Size:</td>
                                <td style={{width: "10%"}}> Quantity:</td>
                                <td style={{width: "10%"}}> Status</td>
                                <td style={{width: "40%"}}></td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                order.foods.map((item: any, idx: any) =>
                                    <tr>
                                        <td style={{width: "42%"}}> {item.name}</td>
                                        <td style={{width: "10%"}}> {item.size.substring(0,1)}</td>
                                        <td style={{width: "21%"}}> {item.quantity}</td>
                                        <td style={{width: "40%"}}> {item.statusFood}</td>
                                        <td style={{width: "40%"}}>
                                            {
                                                item.statusFood === FoodStatusEnum.Ordered ? "" : <button>Finish</button>
                                            }

                                        </td>
                                    </tr>
                                )
                            }

                            </tbody>
                        </table>
                    </tr> : ""
                }

            </>
        )
    }
}

export function mapStateToProps(state: any): StateToProps {
    return {
        orderKitchen: state.orderState.orderKitchen
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        processOrder: (orderProcess, userName) => dispatch(ProcessOrder(orderProcess, userName)),
    }
};


export const OrderTableRowComponent = connect(mapStateToProps, mapDispatchToProps)(OrderTableRow);
