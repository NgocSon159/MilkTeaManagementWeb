import React, { Component } from 'react';
import {
    Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form

} from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Button from 'elements/CustomButton/CustomButton.jsx';
import cellEditFactory from 'react-bootstrap-table2-editor';

var Categoryrow = ""
var tenloai = ""
var Foodrow = ""
var formData = { "data": {} };

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

function order() {
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
            phonenumber: "",
            discount: 0,
            tongtien: 0,
            listcategory: [],
            listfoodofcategory: [],
            listorderdetail: [],
            isSelectedCategory: false,
            rowEvents: {
                onClick: (e, row, rowIndex) => {
                    console.log(`clicked on row with index: `, this.state.listcategory[Categoryrow].CategoryID);
                    console.log('row',row)
                    console.log('indexof',this.state.listcategory[this.state.listcategory.indexOf(row)])
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
                dataField: 'Quantity',
                text: 'Quantity'
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
        this.xulylaylistcategoryid = this.xulylaylistcategoryid.bind(this)
        this.xulylocdistinctcategoryid = this.xulylocdistinctcategoryid.bind(this)
        this.GetFullInfoCategoryFromCategoryID = this.GetFullInfoCategoryFromCategoryID.bind(this)
        this.loadFoodFromCategorySelected = this.loadFoodFromCategorySelected.bind(this)
        this.layFoodtheocategoryid = this.layFoodtheocategoryid.bind(this)
        this.eventback = this.eventback.bind(this)
        this.ActionFormatterforOrderdetail = this.ActionFormatterforOrderdetail.bind(this)
        this.ActionFormatter = this.ActionFormatter.bind(this)
        this.deleteFood = this.deleteFood.bind(this)
        this.CheckFoodIsExist = this.CheckFoodIsExist.bind(this)
        this.order = this.order.bind(this)
        this.addFood = this.addFood.bind(this)
        this.handlePhoneNumber2 = this.handlePhoneNumber2.bind(this)
    }


    order() {

        console.log('state', this.state.listorderdetail)


        //Get datetimenow
        var date = (new Date().getDate()) > 9 ? new Date().getDate() : '0' + new Date().getDate(); //Current Date
        var month = (new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1); //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = (new Date().getHours()) > 9 ? new Date().getHours() : '0' + new Date().getHours(); //Current Hours
        var min = (new Date().getMinutes()) > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes(); //Current Minutes
        var sec = (new Date().getSeconds()) > 9 ? new Date().getSeconds() : '0' + new Date().getSeconds(); //Current Seconds

        var timenow = year + '-' + month + '-' + date
            + 'T' + hours
            + ':' + min
            + ':' + sec + 'Z';
        //*************//
        if(this.state.listorderdetail.length!==0)
        {
            try {
                formData.data['OrderID'] = 'OD000' + (parseInt(localStorage.getItem('countorder')) + 1)
                formData.data['CreatedOn'] = timenow;
                formData.data['CreatedBy'] = localStorage.getItem('username')
                formData.data['PhoneNumber'] = this.state.phonenumber
                formData.data['Discount'] = this.state.discount
                var tong = 0
                var data = this.state.listorderdetail
                console.log('data', data)
                for (var i = 0; i < data.length; i++) {
                    var sum = data[i].Price * data[i].Quantity
                    data[i].Quantity = parseInt(data[i].Quantity)
                    data[i].Sum = sum
                    tong = tong + sum
                }
    
                formData.data['Total'] = Math.round(tong*(100-this.state.discount)/100)
                formData.data['StatusOrder'] = "Ordered"
                formData.data['Foods'] = data
                console.log('formdata', formData)
    
    
                fetch('http://localhost:3001/orders', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
    
                alert('Order Success!!')
                localStorage.setItem('countorder', parseInt(localStorage.getItem('countorder')) + 1)
                this.setState({isSelectedCategory:false,phonenumber:"",discount:0,listorderdetail:[]})
            }
            catch (err) {
                alert('Error!!')
            }
        }
        else{
            alert('Order Need Atleast 1 Food!!')
        }
        
    }

    CheckFoodIsExist(data, FoodIDCanTim) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].FoodID == FoodIDCanTim) {
                return true
            }
        }
        return false
    }

    //Button Thêm Food
    addFood() {
        var data = this.state.listorderdetail
        var temp = this.state.listfoodofcategory[Foodrow]
        console.log('data', data)
        var IsFoodExist = this.CheckFoodIsExist(data, temp.FoodID);

        if (IsFoodExist == true) {
            var soluong = parseInt(data[Foodrow].Quantity, 10)
            soluong++;
            data[Foodrow].Quantity = soluong
            this.setState({ tongtien: data[Foodrow].Quantity * data[Foodrow].Price })
            this.setState({ listorderdetail: data })
        }
        else {
            temp.Quantity = 1
            var tongtiens = this.state.tongtien
            tongtiens = tongtiens + temp.Quantity * temp.Price
            this.setState({ tongtien: tongtiens })
            data.push(temp)
            this.setState({ listorderdetail: data })
        }
    }

    //Button Delete Food
    deleteFood() {
        var data = this.state.listorderdetail
        var tongtiens = this.state.tongtien

        tongtiens = tongtiens - this.state.listorderdetail[Foodrow].Quantity * this.state.listorderdetail[Foodrow].Price
        data.splice(data.indexOf(this.state.listorderdetail[Foodrow]), 1)
        this.setState({ tongtien: tongtiens })
        this.setState({ listorderdetail: data })
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
        fetch('http://localhost:3002/food')
            .then(res => res.json())
            .then(json => {
                let data = this.layFoodtheocategoryid(json.data, categoryid)
                //console.log(json.data);
                this.setState({ listfoodofcategory: data })
            });
    }

    //Thực hiện lấy food từ categoryid
    layFoodtheocategoryid(list, categoryid) {
        var mangfoodtheocategory = []
        for (var i = 0; i < list.length; i++) {
            if (list[i].CategoryID == categoryid) {
                mangfoodtheocategory.push(list[i])
            }
        }
        return mangfoodtheocategory
    }

    xulylaylistcategoryid(list) {
        var newlist = []
        for (var i = 0; i < list.length; i++) {
            newlist.push(list[i].CategoryID)
        }
        this.xulylocdistinctcategoryid(newlist)
    }

    xulylocdistinctcategoryid(list) {
        var newlistloc = [...new Set(list)];
        this.GetFullInfoCategoryFromCategoryID(newlistloc)
    }

    GetFullInfoCategoryFromCategoryID(listloc) {
        var listcategoryfull = []
        for (var i = 0; i < listloc.length; i++) {
            fetch('http://localhost:3002/categories/' + listloc[i])
                .then(res => res.json())
                .then(json => {
                    //let data = xulu(json.data)
                    //console.log(json.data);
                    listcategoryfull.push(json)
                    this.setState({ listcategory: listcategoryfull })
                });
        }
    }


    eventback() {
        this.setState({ isSelectedCategory: false })
    }

    handlePhoneNumber(Event) {
        formData.data[Event.target.id] = Event.target.value;
        this.setState({ phonenumber: Event.target.value })
        //console.log(Event.target.value)
    }

    handlePhoneNumber2(Event) {
        if (Event.key == 'Enter') {
            fetch('http://localhost:3004/customers/' + this.state.phonenumber)
                .then(res => {
                    console.log(res)
                    if (res.status == "200") {
                        res.json().then(json => {
                            //let data = xulu(json.data)
                            //console.log(json.Rank.Name)
                            console.log('res', json)
                            this.setState({
                                discount: json.Rank.Discount
                            });
                        });
                    }
                    else {
                        alert("Phone number is incorrect!!")
                    }
                })
        }
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3001/orders')
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('countorder', json.data.length)
            });
        fetch('http://localhost:3003/menu/details/Menu001')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                //console.log(json.data);
                this.xulylaylistcategoryid(json.data);
                this.setState({
                    menudetailitems: json.data
                })
            });
    }

    render() {
        console.log('render', this.state.listorderdetail)
        console.log('render')

        if (this.state.isSelectedCategory == false) {
            return (
                <div className="main-content">
                    <Grid fluid>
                        <Row>
                            <Col md={6}>
                                <h3>Select Category: </h3>
                            </Col>
                            <Col md={6}>
                                <Form horizontal>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-3">
                                                Phone Number
                                                </ControlLabel>
                                            <Col sm={3}>
                                                <FormControl
                                                    id="PhoneNumber"
                                                    type="text"
                                                    value={this.state.phonenumber}
                                                    onChange={(event) => this.handlePhoneNumber(event)}
                                                    onKeyPress={(event) => this.handlePhoneNumber2(event)}
                                                />
                                            </Col>
                                            <ControlLabel className="col-sm-3">
                                                Discount
                                                </ControlLabel>
                                            <Col sm={3}>
                                                <FormControl
                                                    type="text"
                                                    disabled="true"
                                                    value={this.state.discount}

                                                />
                                                {console.log('discount', this.state.discount)}
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <BootstrapTable keyField='ID' data={this.state.listcategory} columns={columnchonloai} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={this.state.rowEvents} />
                            </Col>
                            <Col md={6}>
                                <BootstrapTable keyField='ID' data={this.state.listorderdetail} columns={this.state.columnorderdetail} filter={filterFactory()} rowEvents={this.state.rowEventsforOrderDetailDeleteFood} cellEdit={cellEditFactory({
                                    mode: 'click',
                                    afterSaveCell: (oldValue, newValue, row, column) => {
                                        console.log('after')
                                        var tong = 0
                                        var data=this.state.listorderdetail
                                        for (var i = 0; i < data.length; i++) {
                                            var sum = data[i].Price * data[i].Quantity
                                            tong = tong + sum
                                        }
                                        this.setState({tongtien:tong})
                                    }
                                })} />
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
                                <button onClick={this.eventback} className="btn btn-success">
                                    Back
                                </button>
                                <span><pre>   {tenloai}</pre></span>
                            </Col>
                            <Col md={6}>
                                <Form horizontal>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-3">
                                                Phone Number
                                                </ControlLabel>
                                            <Col sm={3}>
                                                <FormControl
                                                    id="PhoneNumber"
                                                    type="text"
                                                    value={this.state.phonenumber}
                                                    onChange={(event) => this.handlePhoneNumber(event)}
                                                    onKeyPress={(event) => this.handlePhoneNumber2(event)}
                                                />
                                            </Col>
                                            <ControlLabel className="col-sm-3">
                                                Discount
                                                </ControlLabel>
                                            <Col sm={3}>
                                                <FormControl
                                                    type="text"
                                                    disabled="true"
                                                    value={this.state.discount}
                                                />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <BootstrapTable keyField='ID' data={this.state.listfoodofcategory} columns={this.state.columnfood} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={this.state.rowEventsforSelectFood} />
                            </Col>
                            <Col md={6}>
                                <BootstrapTable keyField='ID' data={this.state.listorderdetail} columns={this.state.columnorderdetail} filter={filterFactory()} rowEvents={this.state.rowEventsforOrderDetailDeleteFood} onChange={order} cellEdit={cellEditFactory({
                                    mode: 'click',
                                    afterSaveCell: (oldValue, newValue, row, column) => {
                                        console.log('after')
                                        var tong = 0
                                        var data=this.state.listorderdetail
                                        for (var i = 0; i < data.length; i++) {
                                            var sum = data[i].Price * data[i].Quantity
                                            tong = tong + sum
                                        }
                                        this.setState({tongtien:tong})
                                    }
                                })} />
                                <Row><Col md={2} mdOffset={6}></Col>
                                    <span>Total Money: {this.state.tongtien}</span></Row>
                                <Row><br></br></Row>
                                <Row><Col md={4} mdOffset={6}></Col>
                                    <button onClick={this.order} className="btn btn-info">Order</button></Row>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
    }
}

export default CreateOneOrder;
