import * as React from 'react';
import { connect } from 'react-redux';
import { foodSelector } from '../../redux/selector/FoodSelector';
import { Food } from '../../model/Food';
import { compose } from 'redux';
import { AdditionalForm } from './modal/additional-food';
import {GetFoodListAction} from "../../redux/action/actions";

interface StateToProps {
    food?: Food[];
}
interface DispatchToProps {
    getFoodList: () => void;
}
export class ProductListComponent extends React.Component<StateToProps & DispatchToProps, any> {
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

    componentDidMount() {
        this.props.getFoodList();
    }

    public render(): React.ReactNode {
        const { food } = this.props;
        const result = food && food.map((item, idx) => {
            return <>
                <div className="product-item">
                    <div className="product-img">
                        <img src={item.image}  />
                    </div>
                    <div className="product-footer">
                        <p>{item.name}</p>
                        <span onClick={this.additionalModal}  data-toggle="modal" data-target="#modelId"><i className="fa fa-plus-circle"/></span>
                    </div>
                </div>
                </>
        });
        return (
            <div className="col-md-7 col-sm-7 text-center">
                <div className="panel product-list">
                    {/*<div className="product-item">*/}
                    {/*    <div className="product-img">*/}
                    {/*        <img src="http://localhost:3000/assets/images/drink-1.jpg" />*/}
                    {/*    </div>*/}
                    {/*    <div className="product-footer">*/}
                    {/*        <p>Chè BlackBall</p>*/}
                    {/*        <span onClick={this.additionalModal}  data-toggle="modal" data-target="#modelId"><i className="fa fa-plus-circle"/></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {
                        result
                    }
                    {/*<div className="product-item">*/}
                    {/*    <div className="product-img">*/}
                    {/*        <img src="http://localhost:3000/assets/images/drink-1.jpg" />*/}
                    {/*    </div>*/}
                    {/*    <div className="product-footer">*/}
                    {/*        <p>Chè BlackBall</p>*/}
                    {/*        <span onClick={this.additionalModal}  data-toggle="modal" data-target="#modelId"><i className="fa fa-plus-circle"/></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="product-item">*/}
                    {/*    <div className="product-img">*/}
                    {/*        <img src="http://localhost:3000/assets/images/drink-1.jpg" />*/}
                    {/*    </div>*/}
                    {/*    <div className="product-footer">*/}
                    {/*        <p>Chè BlackBall</p>*/}
                    {/*        <span><i className="fa fa-plus-circle"/></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="product-item">*/}
                    {/*    <div className="product-img">*/}
                    {/*        <img src="http://localhost:3000/assets/images/drink-1.jpg" />*/}
                    {/*    </div>*/}
                    {/*    <div className="product-footer">*/}
                    {/*        <p>Chè BlackBall</p>*/}
                    {/*        <span><i className="fa fa-plus-circle"/></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="product-item">*/}
                    {/*    <div className="product-img">*/}
                    {/*        <img src="http://localhost:3000/assets/images/drink-1.jpg" />*/}
                    {/*    </div>*/}
                    {/*    <div className="product-footer">*/}
                    {/*        <p>Chè BlackBall</p>*/}
                    {/*        <span><i className="fa fa-plus-circle"/></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="product-item">*/}
                    {/*    <div className="product-img">*/}
                    {/*        <img src="http://localhost:3000/assets/images/drink-1.jpg" />*/}
                    {/*    </div>*/}
                    {/*    <div className="product-footer">*/}
                    {/*        <p>Chè BlackBall</p>*/}
                    {/*        <span><i className="fa fa-plus-circle"/></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="product-item">*/}
                    {/*    <div className="product-img">*/}
                    {/*        <img src="http://localhost:3000/assets/images/drink-1.jpg" />*/}
                    {/*    </div>*/}
                    {/*    <div className="product-footer">*/}
                    {/*        <p>Chè BlackBall</p>*/}
                    {/*        <span><i className="fa fa-plus-circle"/></span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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
        food: foodSelector.selectAllFood(state),
    }
};

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getFoodList: () => dispatch(GetFoodListAction()),
    }
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const ProductListForm = compose(withConnect)(ProductListComponent);
