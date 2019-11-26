import * as React from 'react';
import { connect } from 'react-redux';
import { foodSelector } from '../../redux/selector/FoodSelector';
import { Food } from '../../model/Food';
import { compose } from 'redux';
import { AdditionalForm } from './modal/additional-food';
import { Modal } from '../../../common/components/modal';
import { GetFoodListAction } from "../../redux/action/actions";

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
        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    // openModal() {
    // @ts-ignore
    openModal(foodItem) {
        const { food } = this.props;
        // @ts-ignore
        const arr = food.filter(item => item.name === foodItem.name);
        this.setState({
            openModal: true,
            foodItem: arr
        });
    };

    componentDidMount() {
        this.props.getFoodList();
    }
    hideModal() {
        this.setState({
            openModal: false
        });
    }

    public render(): React.ReactNode {
        // console.log('openModal', this.state.openModal);
        // const { openModal } = this.state;
        // return (
        //     <div className="col-md-7 col-sm-7 text-center">
        //         <div className="panel product-list">
        const { food } = this.props;
        const { openModal, foodItem } = this.state;
        const resultAll: any = [];
        const foodItemArr: string[] = [];
        if (food) {
            food.map((item, idx) => {
                let elementFood;
                elementFood = <>
                    <div className="product-item" key={idx}>
                        <div className="product-img">
                            <img src={item.image} />
                        </div>
                        <div className="product-footer">
                            <p>{item.name}</p>
                            <span onClick={() => this.openModal(item)}><i className="fa fa-plus-circle" /></span>
                        </div>
                    </div>
                </>;

                // @ts-ignore
                if (foodItemArr.indexOf(item.name) < 0) {
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

                <Modal show={openModal} handleClose={this.hideModal}>
                    <AdditionalForm foodInfo={foodItem} closeModal={this.hideModal} />
                </Modal>
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
