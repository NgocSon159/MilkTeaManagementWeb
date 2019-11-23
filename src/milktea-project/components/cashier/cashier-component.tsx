import * as React from 'react';


import {Bill} from "../cashier/Form/Bill";


export class CashierComponent extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = ({
            openModal: false
        });
        this.additionalModal = this.additionalModal.bind(this);
    }
    additionalModal() {
        this.setState({
            openModal: true
        });
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div className="col-md-7 col-sm-7 text-center">
                    <div className="panel product-list">
                        <div className="product-item">
                            <div className="product-img">
                                <img src="http://localhost:3000/assets/images/tableimg.png"/>
                            </div>
                            <div className="product-footer">
                                <p>Table 1</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-img">
                                <img src="http://localhost:3000/assets/images/tableimg.png"/>
                            </div>
                            <div className="product-footer">
                                <p>Table 2</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-img">
                                <img src="http://localhost:3000/assets/images/tableimg.png"/>
                            </div>
                            <div className="product-footer">
                                <p>Table 3</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-img">
                                <img src="http://localhost:3000/assets/images/tableimg.png"/>
                            </div>
                            <div className="product-footer">
                                <p>Table 4</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-img">
                                <img src="http://localhost:3000/assets/images/tableimg.png"/>
                            </div>
                            <div className="product-footer">
                                <p>Table 5</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-img">
                                <img src="http://localhost:3000/assets/images/tableimg.png"/>
                            </div>
                            <div className="product-footer">
                                <p>Table 6</p>
                            </div>
                        </div>

                    </div>
                    {/* <!-- Button trigger modal --> */}
                    {/* <button type="button" className="btn btn-primary btn-lg">
                  Launch
                </button> */}
                    {/*<div className="modal fade" id="modelId"  role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">*/}
                    {/*    <AdditionalForm />*/}
                    {/*</div>*/}
                </div>
                <div className="modal fade" id="modelId"  role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <Bill />
                </div>
                <div className="col-md-5 col-sm-5 text-center">
                    <div className="panel">
                        <div className="panel-heading">

                            <div>
                                <label>Table 1</label> &nbsp;
                                <label>Order 01</label> &nbsp;
                                <label>Customer's ID:</label> &nbsp;
                                <input/>
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
                                    <input readOnly value="198.000 vnd"/><br/>
                                    <label>Member:</label>
                                    <input readOnly value="10 %"/><br/>
                                    <label>Total:</label>
                                    <input readOnly value="179.000 vnd" placeholder=""/><br/>
                                    <label>Cash:</label>
                                    <input value="200.000 vnd"/><br/>
                                    <label>Change:</label>
                                    <input readOnly value="11.000 vnd" placeholder=""/><br/>
                                </div>
                                <div className="input-group">
                                    <label>Staff's Name:</label><br/>
                                    <input readOnly value="Nguyễn Văn A" placeholder=""/><br/><br/><br/>
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


// export const OrderHomeForm = compose(withConnect)(OrderHomeComponent);