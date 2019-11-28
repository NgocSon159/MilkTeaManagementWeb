import React from "react";
import {OrderStatusEnum} from "../../enum/OrderStatusEnum";
import {FoodStatusEnum} from "../../enum/FoodStatusEnum";
import {FinishFood, GetOrderKitchen, ProcessOrder} from "../../redux/action/actions";
import {connect} from "react-redux";

interface OrderProps {
    order?: any
    forceRefresh?: any
}

interface StateToProps {
    orderKitchen?: any
}

interface DispatchToProps {
    processOrder: (orderProcess: any, userName: any) => void;
    finishFood: (order: any, foodId: any) => void;
}

export class OrderTableRow extends React.Component<StateToProps & DispatchToProps & OrderProps> {
    constructor(props: any) {
        super(props)
    }
    state = {
        expanded: false
    }

    expand = () => {
        this.setState({expanded: !this.state.expanded})
    }

    process = (order: any) => {
        const props = this.props;
        this.props.processOrder(order, "barista");
        setTimeout(function () {
            props.forceRefresh();
        }, 1000);
        // this.props.forceRefresh();
    }

    finishFood = (order: any, foodId: any) => {
        const props = this.props;
        this.props.finishFood(order, foodId);
        setTimeout(function () {
            props.forceRefresh();
        }, 1000);
        // this.props.forceRefresh();
    }



    render() {
        console.log("render row");
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
                            order.statusOrder === OrderStatusEnum.Ordered ? <button onClick={() => this.process(order)}>Process</button> : ""
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
                                                (item.statusFood === FoodStatusEnum.Ordered || item.statusFood === FoodStatusEnum.Finished) ? "" : <button onClick={() => this.finishFood(order, item.foodId)}>Finish</button>
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
        finishFood: (order, foodId) => dispatch(FinishFood(order, foodId))
    }
};


export const OrderTableRowComponent = connect(mapStateToProps, mapDispatchToProps)(OrderTableRow);
