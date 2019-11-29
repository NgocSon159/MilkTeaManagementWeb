import * as React from 'react';
import { connect } from 'react-redux';
import { orderSelector } from '../../redux/selector/OrderSelector';
import {
    UpdateOrderList,
    PostOrder,
    UpdateOrder,
    GetOrderFromTable,
    RequestPaymentTable
} from '../../redux/action/actions';
import { Order } from '../../model/Order';
import socketIo from "socket.io-client";
import { socketUrl } from "../../../common/config";
import { Modal } from '../../../common/components/modal';
import { EditFoodForm } from './modal/editFood';

const socket = socketIo(socketUrl);

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
    updateOrderList: (orderList: any) => void;
    postOrder?: () => void;
    updateOrderToState?: (data: any) => void;
    getOrderFromTable?: (tableId: number) => void;
    // updateOrderList?: (orderList: any) => void;
    paymentTable?: (tableId: number) => void;
}
export class OrderListComponent extends React.Component<IProps & StateToProps & DispatchToProps, any> {
    constructor(props: any) {
        super(props);
        if (props.loginInfo) {
            this.subcribe(props.loginInfo);
        }
        console.log('OrderListComponent');
        this.state = {
            openModal: false,
            food: {},
            amount: 0,
            isOpen: false,
            quantity: 1,
            icePer: "",
            sugarPer: ""
        }
    }

    componentDidMount() {
        const { matchProp = { params: { tableId: "" } } } = this.props;
        // @ts-ignore
        this.props.getOrderFromTable(Number(matchProp.params.tableId));
    }
    handleOnChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    onRemoveFood = (foodId: string) => {
        let { orderList, updateOrderList } = this.props;
        const food = orderList.find((food: any) => food.foodId === foodId);
        const index = orderList.findIndex((oderFood: any) => oderFood.foodId === food.foodId);
        // console.log('index', index);
        orderList.splice(index, 1);
        // const data = [];

        updateOrderList(orderList);
    }

    onEditFood = (food: any) => {
        this.setState({
            openModal: true,
            food,
            // isOpen: true
            quantity: food.quantity,
            icePer: food.icePercent,
            sugarPer: food.sugarPercent
        });
    }

    hideModal = () => {
        this.setState({
            openModal: false
        });
    }
    subcribe = (loginInfo: any) => {
        socket.emit('sendUserName', loginInfo)
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
            socket.emit("baristaUpdate");
            history.push('/order');

        }, 1000);
        // this.props.history.push('/order');
    }

    handleCancelOrder = () => {
        this.props.updateOrderList([]);
    }

    paymentTable = (tableId: any) => {
        const { history } = this.props;
        // @ts-ignore
        this.props.paymentTable(Number(tableId));
        setTimeout(function () {
            socket.emit("cashierUpdate");
            history.push('/order');
        }, 1000);
    }

    increase = () => {
        let { quantity } = this.state;
        // const { quantity } = this.props.food;
        // let val  quantity;
        this.setState({
            quantity: ++quantity
        });
    }
    decrease = () => {
        let { quantity } = this.state;
        // const { quantity } = this.props.food;
        // let val = amount || quantity;
        if (quantity > 1) {
            this.setState({
                quantity: --quantity
            });
        }
    }

    resetForm = (food: any) => {
        this.setState({
            quantity: food.quantity,
            icePer: food.icePercent,
            sugarPer: food.sugarPercent
        });
    }

    onCancel = () => {
        const { food } = this.state;
        this.hideModal();
        this.resetForm(food);
    }
    onUpdate = (food: any) => {
        const { quantity, sugarPer, icePer } = this.state;
        const { orderList, updateOrderList } = this.props;
        const foodItem = {
            ...food,
            quantity,
            sugarPercent: sugarPer,
            icePercent: icePer
        }
        const index = orderList.findIndex((oderFood: any) => oderFood.foodId === food.foodId);
        if (index !== -1) {
            orderList[index] = foodItem;
            updateOrderList(orderList);
        }
        this.hideModal();
        this.resetForm(food);
    }

    back = () => {
        this.props.history.push("/order")
    }
    public render(): React.ReactNode {
        const { matchProp = { params: { tableId: "" } }, loginInfo = {}, order } = this.props;
        const { orderList } = this.props;
        const { openModal, food, amount, isOpen } = this.state;
        const { quantity, icePer, sugarPer } = this.state;
        // console.log('amount', amount);
        // if (loginInfo) {
        //     this.subcribe(loginInfo);
        // }
        const { userName = "" } = loginInfo;
        let totalPrice = 0;
        const orderFoods = order && order.foods && order.foods.map((food: any, idx: any) => {
            totalPrice = totalPrice + food.sum;
            return <tr key={idx}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.quantity}</td>
                <td>{food.sum}</td>
                {/* <td>{food.sugarPercent} - {food.icePercent}</td> */}
                <td>{food.sugarPercent}</td>
                <td>{food.icePercent}</td>
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
            let amountValue = amount ? amount : food.quantity;
            return <tr key={food.foodId}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                {/* <td><input name="amount" value={amountValue} style={{width: "50px"}} onChange={this.handleOnChange}/></td> */}
                <td>{food.quantity}</td>
                <td>{food.sum}</td>
                {/* <td>{food.sugarPercent} - {food.icePercent}</td> */}
                <td>{food.sugarPercent}</td>
                <td>{food.icePercent}</td>
                <td>
                    <span onClick={() => this.onRemoveFood(food.foodId)}><i className="fa fa-minus-circle" />
                    </span>
                    <span onClick={() => this.onEditFood(food)}><i className="fa fa-pencil-square" /></span>
                </td>
            </tr>
        });
        return (
            <div className="col-md-6 col-sm-6 text-center">
                <div className="panel" style={{minWidth: "fit-content"}}>
                    <div className="panel-heading" >
                        {/* <div className="pric-icon">
                                    <img src="images/store.png" alt="" />
                                </div> */}
                        {/* <h3>Table 01</h3>
                                <h3 style={{marginLeft:"20px"}}>Order 01</h3> */}
                        <label style={{ float: "left", fontSize: "23px" }} onClick={this.back}>
                        <i className="fa fa-arrow-circle-left" aria-hidden="true"></i></label>
                        {/* <i className="fas fa-arrow-circle-left"/> */}
                        <label>Table {matchProp.params.tableId}</label>
                    </div>
                    <div className="panel-body text-center">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Size</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                    {/* <th>Note</th> */}
                                    <th>SugarPer</th>
                                    <th>IcePer</th>
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
                            <button className="btn btn-secondary" type="button" disabled={orderList ? false : true} onClick={this.handleCancelOrder}>Cancel</button>
                            <button className="btn btn-secondary" type="button" onClick={this.handleOrder}>Order</button>
                            {
                                order && order.statusOrder === 'Served' && <button className="btn btn-secondary" type="button"
                                    onClick={() => this.paymentTable(matchProp.params.tableId)}>Payment</button> || "" || ""
                            }

                        </div>
                    </div>
                </div>
                <Modal show={openModal} handleClose={this.hideModal} title="UPDATE FOOD">
                    <div className="col-md-12 col-sm-12" >
                        <div className="group-item">
                            <span>Amount:</span>
                            <div className="counter">
                                <span onClick={this.decrease}><i />-</span>
                                <span><input readOnly value={quantity}
                                    name="quantity"
                                    onChange={this.handleOnChange} /></span>
                                <span onClick={this.increase}>+<i /></span>
                            </div>
                        </div>
                        <div className="group-item">
                            <span>Sugar percent:</span>
                            <div className="sugar-percent-info">
                                <input name="sugarPer" type="radio" value="25%" checked={sugarPer === "25%"} onChange={(e) => this.handleOnChange(e)} style={{ marginLeft: "22px" }} />
                                <label>25%</label>
                                <input name="sugarPer" type="radio" value="50%" checked={sugarPer === "50%"} onChange={(e) => this.handleOnChange(e)} />
                                <label>50%</label> <br />
                                <input name="sugarPer" type="radio" value="75%" style={{ marginLeft: "120px" }} checked={sugarPer === "75%"}
                                    onChange={(e) => this.handleOnChange(e)} />
                                <label>75%</label>
                                <input name="sugarPer" type="radio" value="100%" checked={sugarPer === "100%"} onChange={(e) => this.handleOnChange(e)} />
                                <label>100%</label>
                            </div>
                        </div>
                        <div className="group-item">
                            <span>Ice percent:</span>
                            <div className="ice-percent-info">
                                <input name="icePer" type="radio" value="25%" checked={icePer === "25%"} onChange={this.handleOnChange} style={{ marginLeft: "22px" }} />
                                <label>25%</label>
                                <input name="icePer" type="radio" value="50%" checked={icePer === "50%"} onChange={this.handleOnChange} />
                                <label>50%</label><br />
                                <input name="icePer" type="radio" value="75%" checked={icePer === "75%"} onChange={this.handleOnChange} style={{ marginLeft: "120px" }} />
                                <label>75%</label>
                                <input name="icePer" type="radio" value="100%" checked={icePer === "100%"} onChange={this.handleOnChange} />
                                <label>100%</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning"
                                onClick={this.onCancel}>
                                Cancel
                </button>
                            <button type="button" className="btn btn-primary"
                                onClick={() => this.onUpdate(food)}>
                                Update
                </button>
                        </div>
                    </div>
                </Modal>
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
        getOrderFromTable: (tableId) => dispatch(GetOrderFromTable(tableId)),
        paymentTable: (tableId) => dispatch(RequestPaymentTable(tableId))
    }
};


export const OrderListForm = connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);
