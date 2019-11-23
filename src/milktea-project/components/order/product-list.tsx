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
            openModal: false,
            foodItem: []
        });
        this.additionalModal = this.additionalModal.bind(this);
    }
    // @ts-ignore
    additionalModal = (foodItem) =>  {
        const { food } = this.props;
        // @ts-ignore
        const arr = food.filter(item => item.name === foodItem.name);
        this.setState({
            openModal: true,
            foodItem: arr
        });
    };

    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

    componentDidMount() {
        this.props.getFoodList();
    }

    public render(): React.ReactNode {
        const { food } = this.props;
        const {openModal, foodItem} = this.state;
        const resultAll: JSX.Element[] = [];
        const foodItemArr: string[] = [];
        if(food) {
            food.map((item, idx) => {
                let elementFood;
                // @ts-ignore
                elementFood =  <>
                    <div className="product-item">
                        <div className="product-img">
                            <img src={item.image}  />
                        </div>
                        <div className="product-footer">
                            <p>{item.name}</p>
                            <span onClick={() => this.additionalModal(item)} data-toggle="modal" data-target="#modelId"><i className="fa fa-plus-circle"/></span>
                        </div>
                    </div>
                </>;

                // @ts-ignore
                if(foodItemArr.indexOf(item.name) < 0) {
                    // @ts-ignore
                    foodItemArr.push(item.name);
                    resultAll.push(elementFood);
                }
            });
        }
        return (
            <div className="col-md-7 col-sm-7 text-center">
                <div className="panel product-list">
                    {
                        resultAll
                    }
                </div>
             <div className="modal fade" id="modelId"  role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                 {
                    openModal ? <AdditionalForm foodInfo={foodItem} closeModal={this.closeModal}/> : ""
                 }
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
