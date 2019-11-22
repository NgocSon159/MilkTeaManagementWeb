import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

interface StateToProps {
    matchProp: any;
}
export class OrderListComponent extends React.Component<StateToProps> {

    public render(): React.ReactNode {
        const {matchProp = {params: {tableId: ""}}} = this.props;
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
                                    <th>Additional</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row">hi</td>
                                    <td>hi</td>
                                    <td>hi</td>
                                    <td>hi</td>
                                    <td>
                                        <span><i className="fa fa-minus-circle" /></span>
                                        <span><i className="fa fa-pencil-square" /></span>
                                    </td>
                                </tr>
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

// export function mapStateToProps(state: any): StateToProps {
//     return {
//         // tables: tableSelector.selectAllTable(state),
        // tables: state.globalState.tables
//         routeInfos: routeSelector.selectRouteInfo(state)
//     }
// };


const withConnect = connect(null, null);

export const OrderListForm = compose(withConnect)(OrderListComponent);