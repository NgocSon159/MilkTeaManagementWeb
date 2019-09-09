import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';
import Select from 'react-select';
import Card from 'components/Card/Card.jsx';

import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';
import { create } from 'domain';
import { EEXIST } from 'constants';
import { Link, Switch } from "react-router-dom";
const formData = {"data":{}};
var categoryid="";
var size=""
var sizelist=[
                {value:'1a',label:'Small'},
                {value:'2a',label:'Medium'},
                {value:'3a',label:'Large'},
            ];
// Dropdown list nhận giá trị là mảng kiểu: [value:"id",label:"something",value:"id2",label:"something",....]
function xuly(list) {
    var categories_option=[];
    for (var i = 0; i < list.length; i++) {

        categories_option.push({ value: list[i].CategoryID, label: list[i].CategoryID + ' - ' + list[i].Name })
    };
    return categories_option;
}

class CreateFood extends Component {
    constructor(props) {
        super(props);
         this.state = {
             //food:{},
             Categories:[],
             CategorySelect:null,
             SizeSelect:null,
             nameError :null,
             nameValidation:"",
             priceError :null,
             priceValidation:"",
             categoryError : null,

        };
        this.handleName = this.handleName.bind(this);
        this.handleSize = this.handleSize.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleCategoryID = this.handleCategoryID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.nameError == null && this.state.nameValidation!="" &&
            this.state.priceError == null && this.state.priceValidation!=""&&
            this.state.categoryError == null && formData.data["CategoryID"]!=null )
        {
         
        // Thêm ngày tạo
        var d = new Date();
        var CreatedOn = d.toJSON();
        formData.data["CreatedOn"] = CreatedOn
        // Parse price
        var price = formData.data['Price'];
        formData.data['Price']= parseInt(price);
        console.log('price',price)

        //}
        console.log('-->', formData);
        try{
            fetch('http://localhost:3002/food', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        alert('Create Success!!!')
        this.props.history.push('/Food/ReadAllFood');
        }
        catch(err){
            alert('ERROR!!')
        }
        }
        else{
            alert('Please check again your info')
            this.state.nameValidation.length < 2 ? this.setState({ nameError: (<small className="text-danger">You must enter a name of at least 2 characters.</small>) }):this.setState({ nameError: null });
            this.state.priceValidation < 1000 || this.state.priceValidation > 10000000 ? this.setState({ priceError: (<small className="text-danger">You must enter a price that is in this range 1000 -> 10.000.000.</small>) }):this.setState({ priceError: null });
            formData.data["CategoryID"]==null ? this.setState({ categoryError: (<small className="text-danger">You must chose a category.</small>) }):this.setState({ categoryError: null });

        }
    }

    handleName(event){
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        console.log(event.target.value)
        this.setState({nameValidation:event.target.value})
        event.target.value.length < 2 ? this.setState({ nameError: (<small className="text-danger">You must enter a name of at least 2 characters.</small>) }):this.setState({ nameError: null });
    }
    handlePrice(event){
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        console.log(event.target.value)
        this.setState({priceValidation:event.target.value})
        event.target.value < 1000 || event.target.value > 10000000  ? this.setState({ priceError: (<small className="text-danger">You must enter a price that is in this range 1000 -> 10.000.000.</small>) }):this.setState({ priceError: null });

    }
    handleSize(){
        //event.preventDefault();
        formData.data["Size"] = size;
        console.log(this.state.SizeSelect)
    }
    handleCategoryID() {
        console.log(this.state.EmployeeIDSelect)
        formData.data['CategoryID'] = categoryid;
    }
    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3002/categories')
            .then(res => res.json())
            .then(json => {
                let data = xuly(json.data)
                this.setState({
                    Categories: data
                })
            });
    }

    render() {
        
        console.log('state',this.state.Categories)
        console.log('size',size)
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Create</legend>}
                                content={
                                    /////--------------------------------------------------
                                    <Form horizontal onSubmit={(event) => this.handleSubmit(event)} >
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Name
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="Name" 
                                                        name="Name"
                                                        type="text"
                                                        onChange={ (event) => this.handleName(event) }                                    
                                                    />
                                                    {this.state.nameError}
                                                </Col>                 
                                            </FormGroup>
                                        </fieldset>       
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Size
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <Select
                                                        id="Size"
                                                        placeholder="Single Select" 
                                                        name="Size"
                                                        value={this.state.SizeSelect}
                                                        options={sizelist}
                                                        onChange={ (value) => {
                                                            size = value.label
                                                            this.setState({ SizeSelect: value })
                                                            this.handleSize()
                                                        } 
                                                    }                              
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>        
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Price
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="Price" 
                                                        name="Price"
                                                        type="text"
                                                        onChange={ (event) => this.handlePrice(event) }                              
                                                    />
                                                    {this.state.priceError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>       
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Category <span className="star">*</span>
                                                </ControlLabel>
                                                <Col md={6}>
                                                    <Select
                                                        id="CategoryID"
                                                        placeholder="Single Select"
                                                        name="Category"
                                                        value={this.state.CategorySelect}
                                                        options={this.state.Categories}
                                                        onChange={(value) => {
                                                            categoryid=value.value
                                                            this.setState({ CategorySelect: value.value })
                                                            this.handleCategoryID()
                                                        }
                                                        }
                                                    />
                                                    {this.state.categoryError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>      
                                        <Button bsStyle="info" fill type='submit'>
                                            Submit
                                        </Button>
                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default CreateFood;
