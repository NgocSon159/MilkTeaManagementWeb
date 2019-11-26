import * as React from 'react';
import { connect } from 'react-redux';
import { orderSelector } from '../../redux/selector/OrderSelector';
import { UpdateOrderList } from '../../redux/action/actions';

interface IProps {
    matchProp?: any;
    // orderList: any;
}
interface StateToProps {
    matchProp?: any;
    orderList?: any;
}
interface DispatchToProps {
    onRemoveFood?: (orderList: any) => void;
}
export class OrderListComponent extends React.Component<IProps & StateToProps & DispatchToProps> {
    constructor(props: any) {
        super(props);
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

    public render(): React.ReactNode {
        console.log('props', this.props.orderList);
        const { matchProp = { params: { tableId: "" } } } = this.props;
        const {orderList} = this.props;
        const foods = orderList && orderList.map((food: any, idx: any) => {
            return <tr key={idx}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.sugarPercent} - {food.icePercent}</td>
                <td>{food.price}</td>
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
                                    <th>Note</th>
                                    <th>Price</th>
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
                                <input placeholder="..." />
                            </div>
                            <div className="input-group">
                                <label>Total:</label><br />
                                <input readOnly value="0 vnd" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <button className="btn btn-secondary" type="button" aria-label="">Cancel</button>
                            <button className="btn btn-secondary" type="button" aria-label="">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    return {
        orderList: orderSelector.selectOrderList(state)
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        onRemoveFood: (orderList) => dispatch(UpdateOrderList(orderList))
    }
};


export const OrderListForm = connect(mapStateToProps, null)(OrderListComponent);