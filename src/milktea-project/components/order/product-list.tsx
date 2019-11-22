import * as React from 'react';
import { connect } from 'react-redux';
import { tableSelector } from '../../redux/selector/TableSelector';
import { Table } from '../../model/Table';
import { compose } from 'redux';
import { AdditionalForm } from './modal/additional-food';

interface StateToProps {
    tables?: Table[];
}
export class ProductListComponent extends React.Component<StateToProps, any> {
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
                            <span onClick={this.additionalModal}  data-toggle="modal" data-target="#modelId"><i className="fa fa-plus-circle"/></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle"/></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle"/></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle"/></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle"/></span>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="product-img">
                            <img src="http://localhost:3000/assets/images/drink-1.jpg" />
                        </div>
                        <div className="product-footer">
                            <p>Chè BlackBall</p>
                            <span><i className="fa fa-plus-circle"/></span>
                        </div>
                    </div>
                
                </div>
             <div className="modal fade" id="modelId"  role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
             <AdditionalForm />
             </div>
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