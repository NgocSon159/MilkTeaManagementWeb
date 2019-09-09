import React, { Component } from 'react';
import {
    Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form

} from 'react-bootstrap';
import {Link, Switch } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Button from 'elements/CustomButton/CustomButton.jsx';
import cellEditFactory from 'react-bootstrap-table2-editor';

var Categoryrow = ""
var tenloai = ""
var Foodrow = ""
var formData = { "data": {} };
var formDataMenuDetail = {"data":{}}

const columnchonloai = [{
    dataField: 'Name',
    text: 'Name',
    sort: true
},
{
    dataField: 'Image',
    text: 'Image',
    formatter: ImageFormatter
}
];

var soluong = 1;



function ImageFormatter(cell, row) {
    return (
        <img src={cell} height="100px" />
    );
}


function abc() {
    window.Component.deleteFood(); //Call method inside component
}

function addfoodout() {
    window.Component.addFood();
}

function logout() {
    console.log('chay')
}

const options = {
    sizePerPageList: [5, 10, 20, 50]
}

class CreateOneOrder extends Component {

    constructor(props) {
        super(props)
        window.Component = this; //Use this to call a method inside componet from outside
        this.state = {
            soluong: 1,
            menuname: null,
            discount: 0,
            tongtien: 0,
            listcategory: [],
            listfood: [],
            listfoodofcategory: [],
            listmenudetail: [],
            isSelectedCategory: false,
            nameError :null,
            nameValidation:"",
            rowEvents: {
                onClick: (e, row, rowIndex) => {
                    console.log(`clicked on row with index: `, this.state.listcategory[Categoryrow].CategoryID);
                    tenloai = this.state.listcategory[this.state.listcategory.indexOf(row)].Name

                    this.setState({ isSelectedCategory: true })
                    this.loadFoodFromCategorySelected(this.state.listcategory[this.state.listcategory.indexOf(row)].CategoryID)
                },
                onMouseEnter: (e, row, rowIndex) => {
                    Categoryrow = rowIndex;
                }
            },
            rowEventsforSelectFood: {

                onMouseEnter: (e, row, rowIndex) => {
                    Foodrow = rowIndex;
                }
            },
            rowEventsforOrderDetailDeleteFood: {
                onMouseEnter: (e, row, rowIndex) => {
                    Foodrow = rowIndex;

                }

            },
            columnorderdetail: [{
                dataField: 'Name',
                text: 'Name',
                sort: true,
                editable: false
            },
            {
                dataField: 'Size',
                text: 'Size',
                editable: false
            },
            {
                dataField: 'Price',
                text: 'Price',
                editable: false

            },
            {
                text: 'Action',
                editable: false,
                formatter: this.ActionFormatterforOrderdetail
            }
            ],
            columnfood: [{
                dataField: 'Name',
                text: 'Name',
                sort: true
            },
            {
                dataField: 'Price',
                text: 'Price'
            },
            {
                dataField: 'Size',
                text: 'Size'
            },
            {
                text: 'Action',
                formatter: this.ActionFormatter
            }
            ]
        }
        this.loadFoodFromCategorySelected = this.loadFoodFromCategorySelected.bind(this)
        this.eventback = this.eventback.bind(this)
        this.ActionFormatterforOrderdetail = this.ActionFormatterforOrderdetail.bind(this)
        this.ActionFormatter = this.ActionFormatter.bind(this)
        this.deleteFood = this.deleteFood.bind(this)
        this.logout = this.logout.bind(this)
        this.addFood = this.addFood.bind(this)
    }

    logout() {
        if (this.state.nameError == null && this.state.nameValidation!="")
        {
    
        console.log('state', this.state.listmenudetail)


        //Get datetimenow
        var d = new Date();
        var timenow = d.toJSON();
        //*************//

        try {
            var menuid = ""
            formData.data['CreatedOn'] = timenow;
            formData.data['BranchID'] = "BR001";
            fetch('http://localhost:3003/menus', {
                method: 'POST',
                body: JSON.stringify(formData),
            })
            .then(res => res.json())
            .then(body => {
                console.log('res',body)
                menuid = body.data["MenuID"]
                formDataMenuDetail.data = this.state.listmenudetail
                fetch('http://localhost:3003/menu/details/'+ menuid ,{
                    method: 'POST',
                    body: JSON.stringify(formDataMenuDetail),
                });
            alert('Order Success!!')

        })
    }
        catch (err) {
            alert('Error!!')
        }
    }
    else{
        alert('Please check again your info')
        this.state.nameValidation.length < 2 ? this.setState({ nameError: (<small className="text-danger">You must enter a name of at least 2 characters.</small>) }):this.setState({ nameError: null });
    }
    }

    //Button Thêm Food
    addFood() {
        var data = this.state.listmenudetail
        var temp = this.state.listfoodofcategory[Foodrow]
        console.log('data', data)

        data.push(temp)
        this.setState({ listmenudetail: data })

    }

    //Button Delete Food
    deleteFood() {
        var data = this.state.listmenudetail


        
        data.splice(data.indexOf(this.state.listmenudetail[Foodrow]), 1)

        this.setState({ listmenudetail: data })
    }

    //formater cho button thêm food
    ActionFormatter(cell, row) {
        return (
            [
                <Button onClick={addfoodout} fill bsStyle="success" bsSize="xs">
                    +</Button>
            ]
        );
    }

    //formater cho button xóa food
    ActionFormatterforOrderdetail() {
        return (
            [
                <Button onClick={abc} fill bsStyle="danger" bsSize="xs">
                    X</Button>
            ]
        );
    }

    //Get api lấy food từ categoryid
    loadFoodFromCategorySelected(categoryid) {
        console.log('loadFood', this.state.listfood)
        var ls = [];
        for (var i = 0; i < this.state.listfood.length; i++) {
            if (this.state.listfood[i].CategoryID == categoryid) {
                ls.push(this.state.listfood[i])
            }
        }
        console.log('ls', ls)
        this.setState({ listfoodofcategory: ls })
    }

    eventback() {
        this.setState({ isSelectedCategory: false })
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3002/food')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    listfood: json.data
                })
            });
        fetch('http://localhost:3002/categories')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    listcategory: json.data
                })
            });
    }

    handleMenuName(event) {
        formData.data[event.target.id] = event.target.value;
        this.setState({nameValidation:event.target.value})
        event.target.value.length < 2 ? this.setState({ nameError: (<small className="text-danger">You must enter a name of at least 2 characters.</small>) }):this.setState({ nameError: null });
   
    }
    render() {
        console.log('render', this.state.listcategory)
        console.log('render')

        if (this.state.isSelectedCategory == false) {
            return (
                <div className="main-content">
                    <Grid fluid>
                        <Row>
                            <Col md={6}>
                                <Form horizontal>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-3">
                                                Menu Name
                                                </ControlLabel>
                                            <Col sm={8}>
                                                <FormControl
                                                    id="Name"
                                                    type="text"
                                                    value={this.state.menuname}
                                                    onChange={(event) => this.handleMenuName(event)}
                                                //onKeyPress={(event) => this.handlePhoneNumber2(event)}
                                                />
                                                {this.state.nameError}
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form horizontal>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-3">
                                                Branch ID
                                                </ControlLabel>
                                            <Col sm={6}>
                                                <FormControl
                                                    id="BranchID"
                                                    type="text"
                                                    value="BR001"
                                                    readOnly="true"
                                                // onChange={(event) => this.handlePhoneNumber(event)}
                                                // onKeyPress={(event) => this.handlePhoneNumber2(event)}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                            <span><pre>   {"Category"}</pre></span>
                                <BootstrapTable keyField='ID' data={this.state.listcategory} columns={columnchonloai} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={this.state.rowEvents} />
                            </Col>
                            <Col md={6}>
                            <span><pre>   {"Menu Details"}</pre></span>
                                <BootstrapTable keyField='ID' data={this.state.listmenudetail} columns={this.state.columnorderdetail} filter={filterFactory()} rowEvents={this.state.rowEventsforOrderDetailDeleteFood} />
                            </Col>
                        </Row>

                    </Grid>
                </div>
            );
        }
        else {
            return (
                <div className="main-content">
                    <Grid fluid>
                        <Row>

                            <Col md={6}>
                                <Form horizontal>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-3">
                                                Menu Name
                                                </ControlLabel>
                                            <Col sm={8}>
                                                <FormControl
                                                    id="Name"
                                                    type="text"
                                                    value={this.state.menuname}
                                                    onChange={(event) => this.handleMenuName(event)}
                                                //onKeyPress={(event) => this.handlePhoneNumber2(event)}
                                                />
                                                {this.state.nameError}
                                            </Col>
                                        </FormGroup>
                                    </fieldset>

                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form horizontal>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-3">
                                                Branch ID
                                                </ControlLabel>
                                            <Col sm={6}>
                                                <FormControl
                                                    id="BranchID"
                                                    type="text"
                                                    value="BR001"
                                                    readOnly="true"
                                                // onChange={(event) => this.handlePhoneNumber(event)}
                                                // onKeyPress={(event) => this.handlePhoneNumber2(event)}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>

                                </Form>
                            </Col>
                            
                            </Row>
                            <Row>
                            <Col md={6}>
                                <button onClick={this.eventback} className="btn btn-success">
                                    Back
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                            <span><pre>   {tenloai}</pre></span>
                                <BootstrapTable keyField='ID' data={this.state.listfoodofcategory} columns={this.state.columnfood} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={this.state.rowEventsforSelectFood} />
                            </Col>
                            <Col md={6}>
                            <span><pre>   {"Menu Details"}</pre></span>
                                <BootstrapTable keyField='ID' data={this.state.listmenudetail} columns={this.state.columnorderdetail} filter={filterFactory()} rowEvents={this.state.rowEventsforOrderDetailDeleteFood} onChange={logout} />
                                <Link to="/Menu/ReadAllMenu" >
                                <Row><Col md={4} mdOffset={6}></Col>
                                
                                    <button onClick={this.logout} className="btn btn-info">Create</button></Row>
                                    </Link>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
    }
}

export default CreateOneOrder;
