import * as React from 'react';
import { connect } from 'react-redux';
import { foodSelector } from '../../redux/selector/FoodSelector';
import { Food } from '../../model/Food';
import { compose } from 'redux';
import { AdditionalForm } from './modal/additional-food';
import { Modal } from '../../../common/components/modal';
import {GetFoodListAction, SetPageListFood} from "../../redux/action/actions";

interface StateToProps {
    food?: Food[];
}
interface DispatchToProps {
    getFoodList: () => void;
    setPageListFood: (data: any) => void;
}
export class ProductListComponent extends React.Component<StateToProps & DispatchToProps, any> {
    constructor(props: any) {
        super(props);
        this.state = ({
            openModal: false,
            foodItem: [],
            pageFood: {
                pageSize: 9,
                pageIndex: 1
            }
        });
        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
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
        const {pageFood} = this.state;
        this.props.setPageListFood(pageFood);
        this.props.getFoodList();
    }
    hideModal() {
        this.setState({
            openModal: false
        });
    }

    forward = (e: any) =>  {
        e.preventDefault();
        const {pageFood} = this.state;
        pageFood.pageIndex = Number(pageFood.pageIndex) + 1;
        this.props.setPageListFood(pageFood);
        this.props.getFoodList();
        this.setState({pageFood});
    }

    back = (e: any) =>  {
        e.preventDefault();
        const {pageFood} = this.state;
        pageFood.pageIndex = Number(pageFood.pageIndex) - 1;
        this.props.setPageListFood(pageFood);
        this.props.getFoodList();
        this.setState({pageFood});
    }

    public render(): React.ReactNode {


        // console.log('openModal', this.state.openModal);
        // const { openModal } = this.state;
        // return (
        //     <div className="col-md-7 col-sm-7 text-center">
        //         <div className="panel product-list">
        const { food } = this.props;
        const {openModal, foodItem, pageFood} = this.state;
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
                {/* //             <p>Chè BlackBall</p>
                             <span data-toggle="modal"
                //                 data-target={openModal}
                //                 onClick={this.openModal}
                //             // data-target="#modelId"
                //             >
                //                 <i className="fa fa-plus-circle" />
                //             </span>
                //         </div>
                //     </div>
                // </div>
                // <Modal show={openModal} handleClose={this.hideModal}>
                //     <AdditionalForm closeModal={this.hideModal}/>
                // </Modal>
                {/* <div className="modal fade" id="modelId" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <AdditionalForm />
                </div> */}
                            <p>{item.name}</p>
                            <span onClick={() => this.openModal(item)}><i className="fa fa-plus-circle"/></span>
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
                <button onClick={(e) => this.back(e)} className="btn btn-secondary" type="button" aria-label="" disabled={(pageFood.pageIndex === 1) ? true : false}>Back</button>
                <button className="btn btn-secondary" type="button" aria-label="">{pageFood.pageIndex}</button>
                <button onClick={(e) => this.forward(e)} className="btn btn-secondary" type="button" aria-label="">Forward</button>
              <Modal show={openModal} handleClose={this.hideModal}>
                    <AdditionalForm foodInfo={foodItem} closeModal={this.hideModal}/>
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
        setPageListFood: (data) => dispatch(SetPageListFood(data))
    }
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const ProductListForm = compose(withConnect)(ProductListComponent);
