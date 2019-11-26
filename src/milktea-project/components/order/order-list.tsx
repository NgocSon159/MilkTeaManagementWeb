import * as React from 'react';
import { connect } from 'react-redux';
import { orderSelector } from '../../redux/selector/OrderSelector';
import { UpdateOrderList, PostOrder, UpdateOrder } from '../../redux/action/actions';
import { Order } from '../../model/Order';

interface IProps {
    matchProp?: any;
    // orderList: any;
}
interface StateToProps {
    // matchProp?: any;
    orderList?: any;
    loginInfo?: any;
}
interface DispatchToProps {
    onRemoveFood?: (orderList: any) => void;
    postOrder?: () => void;
    updateOrderToState?: (data: any) => void;
}
export class OrderListComponent extends React.Component<IProps & StateToProps & DispatchToProps, any> {
    constructor(props: any) {
        super(props);
    }
    
    handleOnChange = (e: any) => {
        const {name, value} = e.target;
        console.log(name, value);
        this.setState({
            [name]: value
        });
    }
state = {
    totalPrice : 0
}


    onRemoveFood = (foodId: string) => {
        let {orderList, onRemoveFood} = this.props;
        const food = orderList.find((food: any) => food.foodId === foodId);
        const index = orderList.indexOf();
        orderList.splice(index, 1);
        console.log('food',food);
        // const data = [];
        // onRemoveFood(data);
    }

    onEditFood = (foodId: string) => {
        
    }

    handleOrder = () => {
        const { orderList,matchProp = {params: { tableId: "" }}, loginInfo = {} } = this.props;
        const {userName = ""} = loginInfo;
        const {totalPrice = 0} = this.state;
        const data: Order = {
            branchId: "BR001",
            createdBy: userName,
            servedOn: "",
            servedBy: "",
            completedOn: "",
            completedBy: "",
            tableId: matchProp.params.tableId,
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
    }
    public render(): React.ReactNode {
        console.log('state', this.state);
        const { matchProp = { params: { tableId: "" } }, loginInfo = {} } = this.props;
        const {orderList} = this.props;
        const { userName = "" } = loginInfo;
        let totalPrice = 0;
        const foods = orderList && orderList.map((food: any, idx: any) => {
            totalPrice = totalPrice + food.sum;
            return <tr key={idx}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.quantity}</td>
                <td>{food.sum}</td>
                <td>{food.sugarPercent} - {food.icePercent}</td>
                <td>
                    <span onClick={() => this.onRemoveFood(food.foodId)}><i className="fa fa-minus-circle" /></span>
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
                                {foods}
                            </tbody>
                        </table>
                        <div className="sub-panel-footer">
                            <div className="input-group">
                                <label>Staff's name:</label><br />
                                <input readOnly placeholder={userName}  />
                            </div>
                            <div className="input-group">
                                <label>Total:</label>
                                <input readOnly name="totalPrice" value={totalPrice} onChange={this.handleOnChange}/>
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
    return {
        orderList: orderSelector.selectOrderList(state),
        loginInfo: state.globalState.loginInfo,
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        onRemoveFood: (orderList) => dispatch(UpdateOrderList(orderList)),
        postOrder: () => dispatch(PostOrder()),
        updateOrderToState: (data) => dispatch(UpdateOrder(data)),
    }
};


export const OrderListForm = connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);