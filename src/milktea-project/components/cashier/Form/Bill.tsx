import * as React from "react";
import { connect } from "react-redux";

interface StateToProps {
    // paymentOrder?: any;
    // loginInfo?: any;
}

export class Bill extends React.Component {
    public render(): React.ReactNode {
        var widht200 = {
            width: '200px'
        }
        // const { paymentOrder, loginInfo } = this.props;
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="modal-header">
                        <div>
                            <h5 className="modal-title text-center" >FOOD FUNDAY</h5>
                        </div>
                        <div>
                            <h6> 12:10 23/11/2019</h6>
                        </div>
                        <div>
                            <h6> Payment Staff: Nguyễn Văn A</h6>
                        </div>
                        <div>
                            <h6> Number of table: 1</h6>
                        </div>
                        <div>
                            <h6> CustomerID: 3115410...</h6>
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
                                <div style={widht200}>
                                    <br />
                                    <h3>Thank you!</h3><br /><br />
                                    <button>Print Bill</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    return {
        // paymentOrder: state.orderState.paymentOrder,
        // loginInfo: state.globalState.loginInfo,
    }
}

export const BillForm = connect(mapStateToProps, null)(Bill);
