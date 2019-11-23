import * as React from 'react';

export default class AdditionalComponent {
    public render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* <div style={{ width: "100%" }}> */}
                        <div className="col-md-4 col-sm-4">
                            {/* <div className="product-img"> */}
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" className="img-item"/>
                            {/* </div> */}
                            <span>Price: 45.000 vnd</span>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <div className="group-item">
                                <span>Size:</span>
                                <div className="size-info">
                                    <input name="size-input" type="radio" value="S"/> <label>S</label>
                                    <input name="size-input" type="radio" value="M"/> <label>M</label>
                                    <input name="size-input" type="radio" value="L"/> <label>L</label>
                                </div>
                            </div>
                            <div className="group-item">
                                <span>Amount:</span>
                                <div className="counter">
                                    <span onClick={this.decrease}><i/>-</span>
                                    <span><input readOnly value={this.state.counter}/></span>
                                    <span onClick={this.increase}>+<i/></span>
                                </div>
                            </div>
                            <div className="group-item">
                                <span>Sugar percent:</span>
                                <div className="sugar-percent-info">
                                    <input name="sugar-percent" type="radio"/> <label>25%</label>
                                    <input name="sugar-percent" type="radio"/> <label>50%</label>
                                    <input name="sugar-percent" type="radio"/> <label>75%</label>
                                    <input name="sugar-percent" type="radio"/> <label>100%</label>
                                </div>
                            </div>
                            <div className="group-item">
                                <span>Ice percent:</span>
                                <div className="ice-percent-info">
                                    <input name="ice-percent" type="radio"/> <label>25%</label>
                                    <input name="ice-percent" type="radio"/> <label>50%</label>
                                    <input name="ice-percent" type="radio"/> <label>75%</label>
                                    <input name="ice-percent" type="radio"/> <label>100%</label>
                                </div>
                            </div>
                            <div className="group-item">
                                <span className="note-info">Note:</span>
                                <textarea placeholder="enter some note..."></textarea>
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
                </div>
            </div>
        )
    }