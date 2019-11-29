import * as React from 'react';
import { BillForm, Bill } from "../cashier/Form/Bill";
import { connect } from 'react-redux';
import { GetPaymentTable, GetPaymentOrder, PostPaymentOrder, GetMemberShip } from '../../redux/action/actions';
import { OrderStatusEnum } from '../../enum/OrderStatusEnum';
import { Modal } from '../../../common/components/modal';
import socketIo from "socket.io-client";
import {socketUrl} from "../../../common/config";

const socket = socketIo(socketUrl);

interface StateToProps {
    paymentTables?: any;
    paymentOrder?: any;
    loginInfo?: any;
    customerInfo?: any;
}

interface DispatchToProps {
    getPaymentTable: () => void;
    getPaymentOrder: (tableId: number) => void;
    postPaymentOrder: (order: any) => void;
    getMemberShip: (customerId: any) => void;
}
export class CashierComponent extends React.Component<StateToProps & DispatchToProps, any> {
    constructor(props: any) {
        super(props);
        console.log('CashierComponent');
        if(props.loginInfo) {
            this.subcribe(props.loginInfo);
        }
        this.state = ({
            openModal: false,
            customerId: "",
            cash: 0,
        });
        const thisClone = this;
        socket.on('plsUpdateCashier', function(){
            console.log("plsUpdateCashier recieved");
            thisClone.props.getPaymentTable();
        });

        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount() {
        this.props.getPaymentTable();
    }

    subcribe = (loginInfo: any) => {
        socket.emit('sendUserName', loginInfo)
    }

    hideModal() {
        this.setState({
            openModal: false
        });
        this.props.getPaymentTable();
    }

    handleOnChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    openModal() {
        this.setState({
            openModal: true
        });
    }
    getMemberShip = (e: any) => {
        const { customerId } = this.state;
        if (e.key === 'Enter') {
            //@ts-ignore
            document.getElementById(e.target.id).blur();
            this.props.getMemberShip(customerId)
        }
    }

    handlePay = () => {
        const { paymentOrder, loginInfo = {}, customerInfo = { rank: {} }, postPaymentOrder, getPaymentOrder } = this.props;
        const { customerId, cash, tableId } = this.state;

        const { userName = "" } = loginInfo;
        const discount = (customerInfo && customerInfo.rank && customerInfo.rank.discount) ? customerInfo.rank.discount : 0;
        let subTotal = 0;
        paymentOrder && paymentOrder.foods && paymentOrder.foods.map((food: any) => {
            subTotal = subTotal + food.sum;
        });
        const total = subTotal - subTotal * discount / 100;
        const numberCash = Number(cash);
        if(numberCash < total) {
            alert('Cash is not enough');
        } else {
            const change = (Number(cash) > 0) ? Number(cash) - total : 0;
            const order = {
                ...paymentOrder,
                completedBy: userName,
                phoneNumber: customerId,
                discount,
                total,
                cash: Number(cash),
                change
            }

            const thisClone = this;
            postPaymentOrder(order);
            socket.emit('waiterUpdate');
            setTimeout(function () {

                thisClone.alertStatus();
            }, 1000);
        }
    this.resetForm();
    }
    resetForm = () => {
        this.setState({
            customerId: "",
            cash: 0,
        });
    }
    alertStatus = () => {
        const { paymentOrder } = this.props;
        if (paymentOrder.statusOrder === OrderStatusEnum.Completed) {
            alert('payment success !');
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Do you want to print Bill?')) {
                this.openModal();
            }
            else {
                this.props.getPaymentTable();
            }
        } else {
            alert('payment false !')
        }
    }

    handleDetailOrder = (tableId: number) => {
        this.setState({
            tableId
        })
        this.props.getPaymentOrder(tableId);
    }
    public render(): React.ReactNode {
        const { paymentTables, paymentOrder, loginInfo = {}, customerInfo = { rank: {} } } = this.props;
        // if(loginInfo) {
        //     this.subcribe(loginInfo);
        // }
        const { customerId, cash, openModal } = this.state;
        const { userName = "" } = loginInfo;
        const discount = (customerInfo && customerInfo.rank && customerInfo.rank.discount) ? customerInfo.rank.discount : 0;
        console.log('paymentOrder', paymentOrder)
        const tableList = paymentTables && paymentTables.map((paymentTable: any, idx: any) => {
            // const footerClass = paymentTable.statusTable === 'Empty' ? 'footer-table-empty' : 'footer-table-full';
            let footerClass = "";
            if(paymentTable.statusTable === 'Empty'){
                footerClass = 'footer-table-empty';
            }else if (paymentTable.statusTable === 'Full') {
                footerClass = 'footer-table-full';
            } else {
                footerClass = 'footer-table-payment';
            }
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
        let subTotal = 0;
        const foodList = paymentOrder && paymentOrder.foods && paymentOrder.foods.map((food: any, idx: any) => {
            subTotal = subTotal + food.sum;
            return <tr key={idx}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>{`${food.discount || 0 } %`}</td>
                <td>{food.quantity}</td>
                <td>{food.sum}</td>
            </tr>
        });
        let total = subTotal - subTotal * discount / 100;
        let change = (Number(cash) > 0) ? Number(cash) - total : 0;
        return (
            <div>
                <div className="col-md-7 col-sm-7 text-center">
                    <div className="panel product-list">
                        {tableList}
                    </div>

                </div>
                <Modal show={openModal} handleClose={this.hideModal} title="FOOD FUNDAY">
                    <BillForm subTotal={subTotal} closeModal={this.hideModal} />
                </Modal>
                <div className="col-md-5 col-sm-5 text-center">
                    <div className="panel" style={{minWidth: "fit-content"}}>
                        <div className="panel-heading" style={{color: "white"}}>

                            <div>
                                <label>Table {paymentOrder && paymentOrder.tableId}</label> &nbsp;
                                <label>Order {paymentOrder && paymentOrder.orderId}</label> &nbsp;
                                <label>Customer's ID:</label> &nbsp;
                                <input name="customerId" id="customerId" value={customerId}
                                    style={{color: "black"}}
                                    onChange={this.handleOnChange}
                                    onKeyDown={this.getMemberShip}
                                    disabled={!paymentOrder ? true : false} />
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
                                    {foodList}
                                </tbody>
                            </table>
                            <div className="sub-panel-footer">
                                <div className="input-group cashier">
                                    <label>Subtotal:</label>
                                    <input readOnly value={subTotal} /><br />
                                    <label>Member:</label>
                                    <input readOnly value={`${discount} %`} /><br />
                                    <label>Total:</label>
                                    <input readOnly value={total} placeholder="" /><br />
                                    <label>Cash:</label>
                                    <input name="cash" value={cash} onChange={this.handleOnChange} disabled={!paymentOrder ? true : false} /><br />
                                    <label>Change:</label>
                                    <input readOnly value={change} placeholder="" /><br />
                                </div>
                                <div className="input-group">
                                    <label>Staff's Name:</label><br />
                                    <input readOnly value={userName} placeholder="" /><br /><br /><br />
                                    <button className="btn btn-secondary"
                                        style={{ marginLeft: "5px" }}
                                        type="button"
                                        aria-label=""
                                        onClick={this.handlePay}
                                        // data-toggle="modal" data-target="#modelId"
                                        disabled={!paymentOrder ? true : false}>Pay
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
        paymentTables: state.orderState.paymentTables,
        paymentOrder: state.orderState.paymentOrder,
        loginInfo: state.globalState.loginInfo,
        customerInfo: state.orderState.customerInfo
    }
}

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getPaymentTable: () => dispatch(GetPaymentTable()),
        getPaymentOrder: (tableId) => dispatch(GetPaymentOrder(tableId)),
        postPaymentOrder: (order) => dispatch(PostPaymentOrder(order)),
        getMemberShip: (customerId) => dispatch(GetMemberShip(customerId))
    }
}

export const CashierForm = connect(mapStateToProps, mapDispatchToProps)(CashierComponent);
