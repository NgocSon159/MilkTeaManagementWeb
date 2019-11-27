import * as React from 'react';


import { Bill } from "../cashier/Form/Bill";
import { connect } from 'react-redux';
import { GetPaymentTable, GetPaymentOrder } from '../../redux/action/actions';
import { NavLink } from 'react-router-dom';

interface StateToProps {
    paymentTables: any;
}

interface DispatchToProps {
    getPaymentTable: () => void;
    getPaymentOrder: (tableId: number) => void;
}
export class CashierComponent extends React.Component<StateToProps & DispatchToProps> {
    constructor(props: any) {
        super(props);
        this.state = ({
            openModal: false
        });
        this.additionalModal = this.additionalModal.bind(this);
    }
    componentDidMount() {
        this.props.getPaymentTable();
    }
    additionalModal() {
        this.setState({
            openModal: true
        });
    }

    handleDetailOrder = (tableId: number) => {
        debugger;
        this.props.getPaymentOrder(tableId);
    }
    public render(): React.ReactNode {
        const { paymentTables } = this.props;
        console.log('paymentTables', paymentTables)
        const tableList = paymentTables && paymentTables.map((paymentTable: any, idx: any) => {
            const footerClass = paymentTable.statusTable === 'Empty' ? 'footer-table-empty' : 'footer-table-full';
            const iconClass = paymentTable.statusTable === 'Empty' ? 'fa  fa-smile-o' : 'fa  fa-frown-o';
            return <div className="product-item">
                <div className="small-box custom-table" key={idx}>
                    <div className="inner">
                        <h3 id="paymentTable" style={{ textAlign: "left" }}>{paymentTable.tableId}</h3>

                        {/* <NavLink to={`/order/${paymentTable.tableId}`} style={{ color: 'white' }}> */}
                        <p style={{ color: "white", textAlign: "left" }} onClick={() => this.handleDetailOrder(paymentTable.tableId)}>detail</p>
                        {/* Need to {paymentTable.statusTable === 'Empty' ? 'order' : 'payment'} */}
                        {/* </NavLink> */}
                    </div>
                    <div className="icon">
                        <i className="fa fa-coffee"></i>
                    </div>
                    <div style={{ borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px" }} className={`small-box-footer ${footerClass}`}>{paymentTable.statusTable === 'Empty' ? 'Empty' : 'Full'} <i className={iconClass}></i></div>
                </div>
            </div>
        });
        return (
            <div>
                <div className="col-md-7 col-sm-7 text-center">
                    <div className="panel product-list">
                        {tableList}
                    </div>

                </div>
                <div className="modal fade" id="modelId" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <Bill />
                </div>
                <div className="col-md-5 col-sm-5 text-center">
                    <div className="panel">
                        <div className="panel-heading">

                            <div>
                                <label>Table 1</label> &nbsp;
                                <label>Order 01</label> &nbsp;
                                <label>Customer's ID:</label> &nbsp;
                                <input />
                            </div>

                        </div>
                        <div className="panel-body text-center">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Amount</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">Trà đen</td>
                                        <td>S</td>
                                        <td>40.000 vnd</td>
                                        <td>10%</td>
                                        <td>1</td>
                                        <td>36.000 vnd</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Cafe sữa</td>
                                        <td></td>
                                        <td>38.000 vnd</td>
                                        <td>0%</td>
                                        <td>2</td>
                                        <td>76.000 vnd</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">Trà sữa trân châu</td>
                                        <td>M</td>
                                        <td>41.000 vnd</td>
                                        <td>5%</td>
                                        <td>2</td>
                                        <td>78.000 vnd</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="sub-panel-footer">
                                <div className="input-group">
                                    <label>Subtotal:</label>
                                    <input readOnly value="198.000 vnd" /><br />
                                    <label>Member:</label>
                                    <input readOnly value="10 %" /><br />
                                    <label>Total:</label>
                                    <input readOnly value="179.000 vnd" placeholder="" /><br />
                                    <label>Cash:</label>
                                    <input value="200.000 vnd" /><br />
                                    <label>Change:</label>
                                    <input readOnly value="11.000 vnd" placeholder="" /><br />
                                </div>
                                <div className="input-group">
                                    <label>Staff's Name:</label><br />
                                    <input readOnly value="Nguyễn Văn A" placeholder="" /><br /><br /><br />
                                    <button className="btn btn-secondary"
                                        type="button"
                                        aria-label=""
                                        onClick={this.additionalModal}
                                        data-toggle="modal" data-target="#modelId">Pay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export function mapStateToProps(state: any): StateToProps {
    return {
        paymentTables: state.orderState.paymentTables
    }
}

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getPaymentTable: () => dispatch(GetPaymentTable()),
        getPaymentOrder: (tableId) => dispatch(GetPaymentOrder(tableId))
    }
}

export const CashierForm = connect(mapStateToProps, mapDispatchToProps)(CashierComponent);