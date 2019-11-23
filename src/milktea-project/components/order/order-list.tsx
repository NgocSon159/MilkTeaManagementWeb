import * as React from 'react';
import { connect } from 'react-redux';
import { orderSelector } from '../../redux/selector/OrderSelector';

interface IProps {
    matchProp?: any;
}
interface StateToProps {
    // matchProp?: any;
    orderList?: any;
}
export class OrderListComponent extends React.Component<IProps & StateToProps> {
    constructor(props: any){
        super(props);
    }

    public render(): React.ReactNode {
        console.log('props', this.props.orderList);
        const { matchProp = { params: { tableId: "" } } } = this.props;
        const foods = this.props.orderList && this.props.orderList.map((food: any, idx: any) => {
            return <tr key={idx}>
                <td scope="row">{food.name}</td>
                <td>{food.size}</td>
                <td>{food.sugarPercent}% - {food.icePercent}%</td>
                <td>{food.price}</td>
                <td>
                    <span><i className="fa fa-minus-circle" /></span>
                    <span><i className="fa fa-pencil-square" /></span>
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
                                {/* <tr>
                                    <td scope="row">hi</td>
                                    <td>hi</td>
                                    <td>hi</td>
                                    <td>hi</td>
                                    <td>
                                        <span><i className="fa fa-minus-circle" /></span>
                                        <span><i className="fa fa-pencil-square" /></span>
                                    </td>
                                </tr> */}
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
                    {/* <ul className="list-group text-center">
                                <li className="list-group-item"><i className="fa fa-check"></i> One Website</li>
                                <li className="list-group-item"><i className="fa fa-check"></i> One User</li>
                                <li className="list-group-item"><i className="fa fa-check"></i> 10 GB Bandwidth</li>
                                <li className="list-group-item"><i className="fa fa-times"></i> 2GB Storage</li>
                                <li className="list-group-item"><i className="fa fa-times"></i> Offline work</li>
                                <li className="list-group-item"><i className="fa fa-check"></i> 24x7 Support</li>
                            </ul> */}
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

export const OrderListForm = connect(mapStateToProps, null)(OrderListComponent);