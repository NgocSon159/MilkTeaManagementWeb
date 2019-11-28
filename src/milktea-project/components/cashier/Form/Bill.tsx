import * as React from "react";
import { connect } from "react-redux";

interface IProps {
    closeModal?: any;
    subTotal?: any;
}
interface StateToProps {
    paymentOrder?: any;
    loginInfo?: any;
}

export class Bill extends React.Component<IProps & StateToProps> {
    public render(): React.ReactNode {
        var widht200 = {
            width: '200px'
        }
        const { paymentOrder = {}, loginInfo = {}, subTotal } = this.props;
        const { userName = "" } = loginInfo;
        const foodList = paymentOrder && paymentOrder.foods && paymentOrder.foods.map((food: any, idx: any) => {
            return <tr key={idx}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>{`${food.discount || 0 } %`}</td>
                <td>{food.quantity}</td>
                <td>{food.sum}</td>
            </tr>
        });

        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span onClick={this.props.closeModal}>&times;</span>
                    </button> */}
                    <div className="modal-header">
                        {/* <div>
                            <h5 className="modal-title text-center" >FOOD FUNDAY</h5>
                        </div> */}
                        <div>
                            <h6> {paymentOrder && paymentOrder.completedOn}</h6>
                        </div>
                        <div>
                            <h6> Payment Staff: {userName}</h6>
                        </div>
                        <div>
                            <h6> Number of table: {paymentOrder && paymentOrder.tableId}</h6>
                        </div>
                        <div>
                            <h6> CustomerID: {paymentOrder && paymentOrder.phoneNumber}</h6>
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
                                    {foodList}
                                </tbody>
                            </table>
                            <div className="sub-panel-footer">
                                <div className="input-group">
                                    <label>Subtotal:</label>
                                    <input readOnly value={subTotal || 0} /><br />
                                    <label>Member:</label>
                                    <input readOnly value={paymentOrder && paymentOrder.discount} /><br />
                                    <label>Total:</label>
                                    <input readOnly value={paymentOrder && paymentOrder.total} placeholder="" /><br />
                                    <label>Cash:</label>
                                    <input value={paymentOrder && paymentOrder.cash} /><br />
                                    <label>Change:</label>
                                    <input readOnly value={paymentOrder && paymentOrder.change} placeholder="" /><br />
                                </div>
                                <div style={widht200}>
                                    <br />
                                    <h3>Thank you!</h3><br /><br />
                                    <button style={{ marginRight: "10px" }} onClick={this.props.closeModal}>Cancel</button>
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
        paymentOrder: state.orderState.paymentOrder,
        loginInfo: state.globalState.loginInfo,
    }
}

export const BillForm = connect(mapStateToProps, null)(Bill);
