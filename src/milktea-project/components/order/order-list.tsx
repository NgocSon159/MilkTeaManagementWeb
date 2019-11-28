import * as React from 'react';
import { connect } from 'react-redux';
import { orderSelector } from '../../redux/selector/OrderSelector';
import { UpdateOrderList, PostOrder, UpdateOrder, GetOrderFromTable } from '../../redux/action/actions';
import { Order } from '../../model/Order';

interface IProps {
    matchProp?: any;
    history?: any;
    // orderList: any;
}
interface StateToProps {
    // matchProp?: any;
    orderList?: any;
    loginInfo?: any;
    order?: any;
}
interface DispatchToProps {
    updateOrderList?: (orderList: any) => void;
    postOrder?: () => void;
    updateOrderToState?: (data: any) => void;
    getOrderFromTable?: (tableId: number) => void;
    // updateOrderList?: (orderList: any) => void;
}
export class OrderListComponent extends React.Component<IProps & StateToProps & DispatchToProps, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const { matchProp = { params: { tableId: "" } } } = this.props;
        // @ts-ignore
        this.props.getOrderFromTable(Number(matchProp.params.tableId));
    }
    onRemoveFood = (foodId: string) => {
        let { orderList, updateOrderList } = this.props;
        const food = orderList.find((food: any) => food.foodId === foodId);
        const index = orderList.indexOf();
        orderList.splice(index, 1);
        // const data = [];
        // onRemoveFood(data);
    }

    onEditFood = (foodId: string) => {

    }

    handleOrder = (e: any) => {
        e.preventDefault();
        const { orderList, matchProp = { params: { tableId: "" } }, loginInfo = {}, history } = this.props;
        const { userName = "" } = loginInfo;
        let totalPrice = 0;
        orderList && orderList.map((food: any) => {
            totalPrice = totalPrice + food.sum;
        });
        const data: Order = {
            branchId: "BR001",
            createdBy: userName,
            servedOn: "",
            servedBy: "",
            completedOn: "",
            completedBy: "",
            tableId: Number(matchProp.params.tableId),
            timeDone: 0,
            phoneNumber: "",
            discount: 0,
            total: totalPrice,
            cash: 0,
            change: 0,
            foods: orderList
        }
        // @ts-ignore
        this.props.updateOrderToState(data);
        // @ts-ignore
        this.props.postOrder();
        setTimeout(function () {
            history.push('/order');
        }, 1500);
        // this.props.history.push('/order');
    }
    public render(): React.ReactNode {
        const { matchProp = { params: { tableId: "" } }, loginInfo = {}, order } = this.props;
        const { orderList } = this.props;
        console.log('order', this.props.order);
        console.log('porp', this.props);
        console.log('orderList', orderList);
        const { userName = "" } = loginInfo;
        // const listFood = order.foods || orderList;
        let totalPrice = 0;
        const orderFoods = order && order.foods && order.foods.map((food: any, idx: any) => {
            totalPrice = totalPrice + food.sum;
            return <tr key={idx}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.quantity}</td>
                <td>{food.sum}</td>
                <td>{food.sugarPercent} - {food.icePercent}</td>
                <td>
                    {/* <button disabled={true}>
                    <span onClick={() => this.onRemoveFood(food.foodId)}><i className="fa fa-minus-circle" /></span>
                    </button>
                    <span onClick={() => this.onEditFood(food.foodId)}><i className="fa fa-pencil-square" /></span> */}
                </td>
            </tr>
        });
        const orderListFoods = orderList && orderList.map((food: any) => {
            totalPrice = totalPrice + food.sum;
            return <tr key={food.foodId}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.quantity}</td>
                <td>{food.sum}</td>
                <td>{food.sugarPercent} - {food.icePercent}</td>
                <td>
                    <span onClick={() => this.onRemoveFood(food.foodId)}><i className="fa fa-minus-circle" />
                    </span>
                    <span onClick={() => this.onEditFood(food.foodId)}><i className="fa fa-pencil-square" /></span>
                </td>
            </tr>
        });
        return (
            <div className="col-md-5 col-sm-5 text-center">
                <div className="panel">
                    <div className="panel-heading" >
                        {/* <div className="pric-icon">
                                    <img src="images/store.png" alt="" />
                                </div> */}
                        {/* <h3>Table 01</h3>
                                <h3 style={{marginLeft:"20px"}}>Order 01</h3> */}
                        <label>Table {matchProp.params.tableId}</label>
                        <label>Order 01</label>
                    </div>
                    <div className="panel-body text-center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Size</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                    <th>Note</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderFoods}
                                {orderListFoods}
                            </tbody>
                        </table>
                        <div className="sub-panel-footer">
                            <div className="input-group">
                                <label>Staff's name:</label><br />
                                <input readOnly value={userName} />
                            </div>
                            <div className="input-group">
                                <label>Total:</label>
                                <input readOnly name="totalPrice" value={totalPrice} />
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <button className="btn btn-secondary" type="button" aria-label="">Cancel</button>
                            <button className="btn btn-secondary" type="button" onClick={this.handleOrder}>Order</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    console.log("map state", state);
    return {
        orderList: orderSelector.selectOrderList(state),
        loginInfo: state.globalState.loginInfo,
        order: state.orderState.order
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        updateOrderList: (orderList) => dispatch(UpdateOrderList(orderList)),
        postOrder: () => dispatch(PostOrder()),
        updateOrderToState: (data) => dispatch(UpdateOrder(data)),
        getOrderFromTable: (tableId) => dispatch(GetOrderFromTable(tableId))
    }
};


export const OrderListForm = connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);