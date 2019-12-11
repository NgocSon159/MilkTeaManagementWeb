import * as React from 'react';
import { UpdateOrderList } from '../../../redux/action/actions';
import { connect } from 'react-redux';
import { orderSelector } from '../../../redux/selector/OrderSelector';

interface IProps {
    food?: any;
    hideModal?: any;
}
interface StateToProps {
    orderList: any;
}
interface DispatchToProps {
    updateOrderList: (orderList: any) => void;
}
export default class EditFoodComponent extends React.Component<IProps & StateToProps & DispatchToProps> {
    constructor(props: any) {
        super(props)
    }

    state = {
        amount: 1,
        sugarPercent: "",
        icePercent: ""
    };
    componentDidMount() {
        const { food } = this.props;
        this.setState({
            amount: Number(food.quantity),
            sugarPercent: food.sugarPercent,
            icePercent: food.icePercent
        })
    }
    componentWillReceiveProps(nextProps: any) {
        console.log('nextProps', nextProps)
    }
    handleOnChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    resetForm = () => {
        this.setState({
            amount: 1,
            sugarPercent: "",
            icePercent: ""
        });
    }

    increase = () => {
        const { amount } = this.state;
        const { quantity } = this.props.food;
        let val = amount || quantity;
        this.setState({
            amount: ++val
        });
    }
    decrease = () => {
        const { amount } = this.state;
        const { quantity } = this.props.food;
        let val = amount || quantity;
        if (val > 0) {
            this.setState({
                amount: --val
            });
        }
    }
    onCancel = () => {
        this.props.hideModal();
        this.resetForm();
    }
    onUpdate = (food: any) => {
        debugger;
        const { amount, sugarPercent, icePercent } = this.state;
        const { orderList, updateOrderList } = this.props;
        const foodItem = {
            ...food,
            quantity: amount,
            sum: Number(amount)*Number(food.price),
            sugarPercent,
            icePercent
        }
        console.log('foodItem',foodItem);
        const index = orderList.findIndex((oderFood: any) => oderFood.foodId === food.foodId);
        if (index !== -1) {
            orderList[index] = foodItem;
            updateOrderList(orderList);
        }
        this.props.hideModal();
        this.resetForm();
    }
    public render(): React.ReactNode {
        const { food, hideModal } = this.props;
        const { amount, sugarPercent, icePercent } = this.state;
        const quantity = amount || food.quantity;
        const sugarPer = sugarPercent || food.sugarPercent;
        const icePer = icePercent || food.icePercent;
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-body">
                    <div className="col-md-8 col-sm-8">
                        <div className="group-item">
                            <span>Amount:</span>
                            <div className="counter">
                                <span onClick={this.decrease}><i />-</span>
                                <span><input readOnly value={quantity}
                                    name="amount"
                                    onChange={this.handleOnChange} /></span>
                                <span onClick={this.increase}>+<i /></span>
                            </div>
                        </div>
                        <div className="group-item">
                            <span>Sugar percent:</span>
                            <div className="sugar-percent-info">
                                <input name="sugarPercent" type="radio" value="25%" checked={sugarPer === "25%"} onChange={(e) => this.handleOnChange(e)} style={{ marginLeft: "22px" }} />
                                <label>25%</label>
                                <input name="sugarPercent" type="radio" value="50%" checked={sugarPer === "50%"} onChange={(e) => this.handleOnChange(e)} />
                                <label>50%</label> <br />
                                <input name="sugarPercent" type="radio" value="75%" style={{ marginLeft: "120px" }} checked={sugarPer === "75%"}
                                    onChange={(e) => this.handleOnChange(e)} />
                                <label>75%</label>
                                <input name="sugarPercent" type="radio" value="100%" checked={sugarPer === "100%"} onChange={(e) => this.handleOnChange(e)} />
                                <label>100%</label>
                            </div>
                        </div>
                        <div className="group-item">
                            <span>Ice percent:</span>
                            <div className="ice-percent-info">
                                <input name="icePercent" type="radio" value="25%" checked={icePer === "25%"} onChange={this.handleOnChange} style={{ marginLeft: "22px" }} />
                                <label>25%</label>
                                <input name="icePercent" type="radio" value="50%" checked={icePer === "50%"} onChange={this.handleOnChange} />
                                <label>50%</label><br />
                                <input name="icePercent" type="radio" value="75%" checked={icePer === "75%"} onChange={this.handleOnChange} style={{ marginLeft: "120px" }} />
                                <label>75%</label>
                                <input name="icePercent" type="radio" value="100%" checked={icePer === "100%"} onChange={this.handleOnChange} />
                                <label>100%</label>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                    <button type="button" className="btn btn-warning"
                        onClick={this.onCancel}>
                        Cancel
                </button>
                    <button type="button" className="btn btn-primary"
                        onClick={() => this.onUpdate(food)}>
                        Update
                </button>
                </div>
                {/* </div> */}
            </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    console.log("map state", state);
    return {
        orderList: orderSelector.selectOrderList(state),
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        updateOrderList: (orderList) => dispatch(UpdateOrderList(orderList)),
    }
};

export const EditFoodForm = connect(mapStateToProps, mapDispatchToProps)(EditFoodComponent);
