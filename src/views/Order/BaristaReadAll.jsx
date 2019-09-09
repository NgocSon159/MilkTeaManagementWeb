import React, { Component } from 'react';
import {
    Grid, Row, Col,
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';



//List tat ca order
var listOrder = [];


//Khai bao column cho table order
const columnsorder = [{
    dataField: 'OrderID',
    text: 'Order ID',
    sort: true
},
{
    dataField: 'PhoneNumber',
    text: 'Phone Number',
},
{
    dataField: 'CreatedOn',
    text: 'Created On',
    sort: true,
    formatter: DateFormatter
},
{
    dataField: 'CreatedBy',
    text: 'Created By'
},
{
    dataField: 'Total',
    text: 'Total',
},
{
    dataField: 'StatusOrder',
    text: 'Status Order',
}

];

//Khai bao column cho table food cua 1 order
const columnsorderdetail = [{
    dataField: 'FoodID',
    text: 'Food ID',
    sort: true
},
{
    dataField: 'Name',
    text: 'Name'
},
{
    dataField: 'Size',
    text: 'Size',
    sort: true
},
{
    dataField: 'Price',
    text: 'Price'
},
{
    dataField: 'Quantity',
    text: 'Quantity',
},
{
    dataField: 'Sum',
    text: 'Sum',
},
{
    dataField: 'Note',
    text: 'Note',
}
];

//Use for pagelistsize
const options = {
    sizePerPageList: [5, 10, 20, 50]
}

var OrderIDrow = ""
var indexselected = -1
function DateFormatter(cell, row) {

    var myDate = new Date(cell);
    var offset = myDate.getTime();

    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        timeZone: 'UTC'
    };

    if (row.CreatedOn) {
        return (
            <span>
                {new Intl.DateTimeFormat('en-GB', options).format(offset)}
            </span>
        );
    }
    return (
        <span>$ {cell} </span>
    );
}

var formData = { "data": {} };

class ReadAllOrder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataaa:[{
                "OrderID":"asdasdad"
            }],
            items: [],
            orderdetailloaded: false,
            foodoforder: [],
            isfinish: true,
            orderid: "",
            statusorder: "",
            buttonprocessstate: "Process",
            buttonprocessdisable: false,
            rowEvents: {
                onClick: (e, row, rowIndex) => {
                    console.log(`clicked on row with index: `, OrderIDrow);
                    indexselected = rowIndex
                    this.xulytrong(listOrder, OrderIDrow)
                    this.setState({ orderid: OrderIDrow, statusorder: row.StatusOrder })
                    
                },
                onMouseEnter: (e, row, rowIndex) => {
                    OrderIDrow = row.OrderID;
                    //indexselected=rowIndex
                }
            }
        }
        this.changeOrderStatus = this.changeOrderStatus.bind(this)
        this.FinishOrder = this.FinishOrder.bind(this)
    }


    changeOrderStatus() {
        console.log('here')
        var data = this.state.items

        formData.data = data[indexselected]
        data[indexselected].CreatedBy="test"
        formData.data['StatusOrder'] = "Processing"

        this.setState({items:data})
        console.log('formdata', formData)
        console.log('orderidrow', this.state.orderid)
        fetch('http://localhost:3001/orders/' + this.state.orderid, {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        fetch('http://localhost:3001/barista')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                //console.log(json.data);
                listOrder = json.data;
                if (json.data !== null) {
                    this.setState({
                        items: json.data
                    })
                }
                else {
                    this.setState({
                        items: []
                    })
                }
            });
        this.setState({ buttonprocessstate: "In Processing...!!", buttonprocessdisable: true, isfinish: false, statusorder: "Processing" })
    }

    FinishOrder() {
        console.log('here')
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


        var data = this.state.items

        formData.data = data[indexselected]
        formData.data['StatusOrder'] = "Served"
        formData.data['FinishedOn']=timenow
        formData.data['FinishedBy']=localStorage.getItem('username')

        console.log('formdata', formData)
        console.log('orderidrow', this.state.orderid)
        fetch('http://localhost:3001/orders/' + this.state.orderid, {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        fetch('http://localhost:3001/barista')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                //console.log(json.data);
                listOrder = json.data;
                if (json.data !== null) {
                    this.setState({
                        items: json.data
                    })
                }
                else {
                    this.setState({
                        items: []
                    })
                }
            });
        fetch('http://localhost:3001/barista')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                //console.log(json.data);
                listOrder = json.data;
                if (json.data !== null) {
                    this.setState({
                        items: json.data
                    })
                }
                else {
                    this.setState({
                        items: []
                    })
                }
            });
        this.setState({ buttonprocessstate: "Process", buttonprocessdisable: false, isfinish: true, orderdetailloaded: false })
    }

    //Lay Food cua OrderID nhat dinh.
    xulytrong(listOrder, OrderIDrow) {
        for (var i = 0; i < listOrder.length; i++) {
            if (listOrder[i].OrderID == OrderIDrow) {
                this.setState({ foodoforder: listOrder[i].Foods })
                this.setState({ orderdetailloaded: true })
            }
        }
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3001/barista')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                //console.log(json.data);
                listOrder = json.data;
                if (json.data !== null) {
                    this.setState({
                        items: json.data
                    })
                }
                else {
                    this.setState({
                        items: []
                    })
                }
            });
    }

    render() {
        console.log('render')
        console.log('items', this.state.items)
        if (this.state.orderdetailloaded == false) {
            return (
                <div className="main-content">
                    <h3>New Order: </h3>
                    <br></br>
                    <Grid fluid>
                        <Row>
                            <Col md={12}>

                                <BootstrapTable keyField='ID' data={this.state.items} columns={columnsorder} pagination={paginationFactory(options)} rowEvents={this.state.rowEvents} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
        else {
            return (
                <div className="main-content">
                    <h3>New Order: </h3>
                    <br></br>
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <BootstrapTable keyField='ID' data={this.state.items} columns={columnsorder} pagination={paginationFactory(options)} rowEvents={this.state.rowEvents} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <h3>Order ID: {this.state.orderid}</h3>
                                <h3>Status Order: {this.state.statusorder}</h3>
                                <BootstrapTable keyField='ID' data={this.state.foodoforder} columns={columnsorderdetail} pagination={paginationFactory(options)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}></Col>
                            <Col md={1}>
                                <button disabled={this.state.buttonprocessdisable} onClick={this.changeOrderStatus} className="btn btn-success">
                                    {this.state.buttonprocessstate}
                                </button>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={2}>
                                <button disabled={this.state.isfinish} onClick={this.FinishOrder} className="btn btn-success">
                                    Finish!!
                                </button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
    }
}

export default ReadAllOrder;
