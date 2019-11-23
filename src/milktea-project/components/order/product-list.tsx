import * as React from 'react';
import { connect } from 'react-redux';
import { tableSelector } from '../../redux/selector/TableSelector';
import { Table } from '../../model/Table';
import { compose } from 'redux';
import { AdditionalForm } from './modal/additional-food';
import { Modal } from '../../../common/components/modal';

interface StateToProps {
    tables?: Table[];
}
export class ProductListComponent extends React.Component<StateToProps, any> {
    constructor(props: any) {
        super(props);
        this.state = ({
            openModal: false
        });
        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    openModal() {
        this.setState({
            openModal: true
        });
    }
    hideModal() {
        this.setState({
            openModal: false
        });
    }

    public render(): React.ReactNode {
        console.log('openModal', this.state.openModal);
        const { openModal } = this.state;
        const { tables } = this.props;
        const result = tables && tables.map((table, idx) => {
            return <p key={idx}>hello test {idx}</p>
        });
        return (
            <div className="col-md-7 col-sm-7 text-center">
                <div className="panel product-list">
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span data-toggle="modal"
                                data-target={openModal}
                                onClick={this.openModal}
                            // data-target="#modelId"
                            >
                                <i className="fa fa-plus-circle" />
                            </span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle" /></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle" /></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle" /></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle" /></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle" /></span>
                        </div>
                    </div>

                </div>
                <Modal show={openModal} handleClose={this.hideModal}>
                    <AdditionalForm closeModal={this.hideModal}/>
                </Modal>
                {/* <div className="modal fade" id="modelId" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <AdditionalForm />
                </div> */}
            </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    return {
        tables: tableSelector.selectAllTable(state),
    }
};


const withConnect = connect(mapStateToProps, null);

export const ProductListForm = compose(withConnect)(ProductListComponent);