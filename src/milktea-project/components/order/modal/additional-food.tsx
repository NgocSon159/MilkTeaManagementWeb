import * as React from 'react';
import { UpdateOrderList } from '../../../redux/action/actions';
import { connect } from 'react-redux';
import { orderSelector } from '../../../redux/selector/OrderSelector';

interface IProps {
    closeModal?: any;
}
interface StateToProps {
    orderList?: any;
}
interface DispatchToProps {
    addFoodOnOrder: (data: any) => void;
}
export default class AdditionalComponent extends React.Component<IProps & DispatchToProps & StateToProps> {
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
        info: {
            size: "",
            note: "",
            icePercent: "",
            sugarPercent: ""
        },
        autocompleteList: [],
        autocompleteValue: '',
        counter: 1
    };

    handleOnChange = (e: any) => {
        e.preventDefault();
        const { info } = this.state;
        const { name, value } = e.target;
        this.setState({
            info: {
                ...info,
                [name]: value
            },
        });
    }
    onAddOrder = () => {
        const {info, counter} = this.state;
        let {orderList = []} = this.props;
        const { size, note, icePercent, sugarPercent } = info;
        const data = {
            foodId: "FO004",
            name: "Cookie Ice Blended",
            size: size,
            price: 59000,
            quantity: counter,
            sum: 59000,
            icePercent, 
            sugarPercent,
            note,
            statusFood: "Finished"
        }
        orderList.push(data);
        this.props.closeModal();
        this.props.addFoodOnOrder(orderList);
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
    public render(): React.ReactNode {
        const autoList = this.state.autocompleteList && this.state.autocompleteList.map((item, idx) => {
            return <li key={idx} onClick={() => this.getAddValue(item)}>{item['name']}</li>
        });
        // ---------------------
        const { size, note, icePercent, sugarPercent } = this.state.info;
        console.log('orderList-modal', this.props.orderList);
        return (
            <div className="modal-dialog" role="document">
                {/* <div className="modal-content"> */}
                    {/* <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> */}
                    <div className="modal-body">
                        {/* <div style={{ width: "100%" }}> */}
                        <div className="col-md-4 col-sm-4">
                            {/* <div className="product-img"> */}
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" className="img-item" />
                            {/* </div> */}
                            <span>Price: 45.000 vnd</span>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <div className="group-item">
                                <span>Size:</span>
                                <div className="size-info">
                                    <input name="size" type="radio" value="S"
                                        checked={size === "S"} 
                                        onChange={this.handleOnChange} /> <label>S</label>
                                    <input name="size" type="radio" value="M" 
                                        checked={size === "M"} 
                                        onChange={this.handleOnChange} /> <label>M</label>
                                    <input name="size" type="radio" value="L" 
                                        checked={size === "L"} 
                                        onChange={this.handleOnChange} /> <label>L</label>
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
                                    <input name="sugarPercent" type="radio" value="25" 
                                        checked={sugarPercent === "25"} 
                                        onChange={this.handleOnChange} /> <label>25%</label>
                                    <input name="sugarPercent" type="radio" value="50"  
                                        checked={sugarPercent === "50"} 
                                        onChange={this.handleOnChange} /> <label>50%</label>
                                    <input name="sugarPercent" type="radio" value="75"  
                                        checked={sugarPercent === "75"} 
                                        onChange={this.handleOnChange} /> <label>75%</label>
                                    <input name="sugarPercent" type="radio" value="100" 
                                        checked={sugarPercent === "100"}  
                                        onChange={this.handleOnChange} /> <label>100%</label>
                                </div>
                            </div>
                            <div className="group-item">
                                <span>Ice percent:</span>
                                <div className="ice-percent-info">
                                    <input name="icePercent" type="radio" value="25" checked={icePercent === "25"} onChange={this.handleOnChange} /> <label>25%</label>
                                    <input name="icePercent" type="radio" value="50" checked={icePercent === "50"}  onChange={this.handleOnChange} /> <label>50%</label>
                                    <input name="icePercent" type="radio" value="75" checked={icePercent === "75"}  onChange={this.handleOnChange} /> <label>75%</label>
                                    <input name="icePercent" type="radio" value="100" checked={icePercent === "100"}  onChange={this.handleOnChange} /> <label>100%</label>
                                </div>
                            </div>
                            <div className="group-item">
                                <span className="note-info">Note:</span>
                                <textarea name="note" value={note} onChange={this.handleOnChange} placeholder="enter some note..."></textarea>
                            </div>
                            <div className="group-item">
                                <span className="price-info">Price:</span>
                                <label className="price-input">45.000 vnd</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
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
        orderList: orderSelector.selectOrderList(state)
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        addFoodOnOrder: (data: any) => dispatch(UpdateOrderList(data))
    }
};


// const withConnect = connect(mapStateToProps, null);

export const AdditionalForm = connect(mapStateToProps, mapDispatchToProps)(AdditionalComponent);