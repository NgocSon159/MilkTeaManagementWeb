import * as React from 'react';
import { UpdateOrderList } from '../../../redux/action/actions';
import { connect } from 'react-redux';
import { orderSelector } from '../../../redux/selector/OrderSelector';

interface IProps {
    closeModal?: any;
    foodInfo?: any;
}
interface StateToProps {
    orderList?: any;
    // foodInfo: any;
    // closeModal: any;
}
interface DispatchToProps {
    addFoodOnOrder: (data: any) => void;
}
export default class AdditionalComponent extends React.Component<IProps & DispatchToProps & StateToProps> {
    constructor(props: any) {
        super(props)
    }
    additionalList = [
        {
            name: 'chocolate',
            price: '20.000 vnd'
        },
        {
            name: 'cheese',
            price: '20.000 vnd'
        },
        {
            name: 'cream',
            price: '20.000 vnd'
        }, {
            name: 'foam 1',
            price: '20.000 vnd'
        },
        {
            name: 'foam 2',
            price: '20.000 vnd'
        },
        {
            name: 'foam 3',
            price: '20.000 vnd'
        }
    ];

    state = {
        size: "",
        note: "",
        icePercent: "100%",
        sugarPercent: "100%",
        autocompleteList: [],
        autocompleteValue: '',
        counter: 1
    };

    handleOnChange = (e: any) => {
        // e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    resetForm = () => {
        this.setState({
            size: "",
            note: "",
            icePercent: "100%",
            sugarPercent: "100%",
            counter: 1
        });
    }
    onAddOrder = () => {
        const { size, icePercent, sugarPercent, counter, note } = this.state;
        let { orderList = [], foodInfo = [] } = this.props;
        let sizeDefault = size || foodInfo[0] && foodInfo[0].size.substring(0, 1); 
        const food = foodInfo.find((item: any) => item.size.substring(0, 1) === sizeDefault);
        console.log('food', food);
        const data = {
            foodId: food.foodId,
            name: food.name,
            size: sizeDefault,
            price: food.price,
            quantity: counter,
            sum: Number(food.price)*Number(counter),
            icePercent,
            sugarPercent,
            note,
            statusFood: "Ordered"
        }
        orderList.push(data);
        this.props.closeModal();
        this.props.addFoodOnOrder(orderList);
        this.resetForm();
    }
    onCancelOrder = () => {
        this.props.closeModal();
        this.resetForm();
    }
    // ----autoComplete------
    handleChangeAuto = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        const tmpList = this.additionalList.filter(item => item.name.indexOf(value) !== -1);
        this.setState({
            [name]: value,
            autocompleteList: tmpList
        });
    }
    getAddValue = (item: any) => {
        this.setState({
            autocompleteValue: item.name,
            autocompleteList: []
        });
    }
    reset = () => {
        this.setState({
            autocompleteValue: ''
        });
    }

    // ----counter------
    increase = () => {
        let { counter } = this.state;
        this.setState({
            counter: ++counter
        });
    }
    decrease = () => {
        let { counter } = this.state;
        if (counter > 0) {
            this.setState({
                counter: --counter
            });
        }
    }

    closeModal = () => {
        this.props.closeModal();
    }

    public render(): React.ReactNode {
        console.log("render");
        console.log("render state", this.state);
        const { size, note, icePercent, sugarPercent } = this.state;
        const { foodInfo = [] } = this.props;
        const renderSize: any = [];
        if (foodInfo) {
            let sizeDefault = size || foodInfo[0] && foodInfo[0].size.substring(0, 1);
            foodInfo.map((item: any, index: any) => {
                let value = item.size.substring(0, 1);
                const element = <><input name="size" type="radio" value={value} checked={sizeDefault === value} onChange={this.handleOnChange} />
                    <label>{value}</label>
                </>;
                renderSize.push(element);
            })
        }
        const autoList = this.state.autocompleteList && this.state.autocompleteList.map((item, idx) => {
            return <li key={idx} onClick={() => this.getAddValue(item)}>{item['name']}</li>
        });
        // ---------------------
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-body">
                    <div className="col-md-4 col-sm-4">
                        <img src={foodInfo[0] && foodInfo[0].image} className="img-item" />
                        <span>{foodInfo[0] && foodInfo[0].name}</span>
                    </div>
                    <div className="col-md-8 col-sm-8">
                        <div className="group-item">
                            <span>Size:</span>
                            <div className="size-info">
                                {/* <input name="size" type="radio" value="S"
                                         checked={size === "S"} 
                                         onChange={this.handleOnChange} /> <label>S</label>
                                     <input name="size" type="radio" value="M" 
                                         checked={size === "M"} 
                                         onChange={this.handleOnChange} /> <label>M</label>
                                     <input name="size" type="radio" value="L" 
                                         checked={size === "L"} 
                                         onChange={this.handleOnChange} /> <label>L</label> */}
                                {
                                    renderSize
                                }

                            </div>
                        </div>
                        {/* <div className="group-item">
                                <span>Additional:</span>
                                {/* ----------autocomplete-------- */}
                        {/* <div className="autocomplete-input">
                                    <input name="autocompleteValue" value={this.state.autocompleteValue} onChange={this.handleChangeAuto} />
                                    {this.state.autocompleteValue && <span className="clear-input" onClick={this.reset}><i /></span>}
                                    <div className="autoList-float">
                                        <ul>{this.state.autocompleteValue && autoList}</ul>
                                    </div>
                                </div>
                            </div>  */}
                        <div className="group-item">
                            <span>Amount:</span>
                            <div className="counter">
                                <span onClick={this.decrease}><i />-</span>
                                <span><input readOnly value={this.state.counter}
                                    name="quantity"
                                    onChange={this.handleOnChange} /></span>
                                <span onClick={this.increase}>+<i /></span>
                            </div>
                        </div>
                        <div className="group-item">
                            <span>Sugar percent:</span>
                            <div className="sugar-percent-info">
                                <input name="sugarPercent" type="radio" value="25%" checked={sugarPercent === "25%"} onChange={(e) => this.handleOnChange(e)} style={{ marginLeft: "22px" }} />
                                <label>25%</label>
                                <input name="sugarPercent" type="radio" value="50%" checked={sugarPercent === "50%"} onChange={(e) => this.handleOnChange(e)} />
                                <label>50%</label> <br />
                                <input name="sugarPercent" type="radio" value="75%" style={{ marginLeft: "120px" }} checked={sugarPercent === "75%"}
                                    onChange={(e) => this.handleOnChange(e)} />
                                <label>75%</label>
                                <input name="sugarPercent" type="radio" value="100%" checked={sugarPercent === "100%"} onChange={(e) => this.handleOnChange(e)} />
                                <label>100%</label>
                            </div>
                        </div>
                        <div className="group-item">
                            <span>Ice percent:</span>
                            <div className="ice-percent-info">
                                <input name="icePercent" type="radio" value="25%" checked={icePercent === "25%"} onChange={this.handleOnChange} style={{ marginLeft: "22px" }} />
                                <label>25%</label>
                                <input name="icePercent" type="radio" value="50%" checked={icePercent === "50%"} onChange={this.handleOnChange} />
                                <label>50%</label><br />
                                <input name="icePercent" type="radio" value="75%" checked={icePercent === "75%"} onChange={this.handleOnChange} style={{ marginLeft: "120px" }} />
                                <label>75%</label>
                                <input name="icePercent" type="radio" value="100%" checked={icePercent === "100%"} onChange={this.handleOnChange} />
                                <label>100%</label>
                            </div>
                        </div>
                        <div className="group-item">
                            <span className="note-info">Note:</span>
                            <textarea name="note" value={note} onChange={this.handleOnChange} placeholder="enter some note..."></textarea>
                        </div>
                        <div className="group-item">
                            <span className="price-info">Price:</span>
                            <label className="price-input">{foodInfo[0] && foodInfo[0].price.toLocaleString()} vnd</label>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                    <button type="button" className="btn btn-warning"
                        onClick={this.onCancelOrder}>
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary"
                        onClick={this.onAddOrder}>
                        Add
                    </button>
                </div>
                {/* </div> */}
            </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    return {
        orderList: orderSelector.selectOrderList(state),
        // foodInfo: state
        // closeModal: state
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        addFoodOnOrder: (data: any) => dispatch(UpdateOrderList(data))
    }
};

export const AdditionalForm = connect(mapStateToProps, mapDispatchToProps)(AdditionalComponent);
