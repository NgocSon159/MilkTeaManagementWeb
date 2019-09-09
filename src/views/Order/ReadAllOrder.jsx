import React, { Component } from 'react';
import {
    Grid, Row, Col,
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


//List tat ca order
var listOrder = [];

//Khai bao column cho table order
const columnsorder = [{
    dataField: 'OrderID',
    text: 'Order ID',
    filter: textFilter(),
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
    filter: textFilter(),
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

class ReadAllOrder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            orderdetailloaded: false,
            foodoforder: [],
            rowEvents: {
                onClick: (e, row, rowIndex) => {
                    console.log(`clicked on row with index: `, OrderIDrow);
                    this.xulytrong(listOrder,OrderIDrow)
                },
                onMouseEnter: (e, row, rowIndex) => {
                    OrderIDrow = row.OrderID;
                }
            }
        }
    }

    //Lay Food cua OrderID nhat dinh.
    xulytrong(listOrder,OrderIDrow) {
        for (var i = 0; i < listOrder.length; i++) {
            if(listOrder[i].OrderID==OrderIDrow)
            {
                this.setState({foodoforder:listOrder[i].Foods})
                this.setState({ orderdetailloaded: true })
            }
        }
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3001/orders')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                //console.log(json.data);
                listOrder = json.data;
                //console.log(listOrder.length)
                localStorage.setItem('countorder',listOrder.length)
                this.setState({
                    items: json.data
                })
            });
    }

    render() {
        if (this.state.orderdetailloaded == false) {
            return (
                <div className="main-content">

                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                            
                                <BootstrapTable keyField='ID' data={this.state.items} columns={columnsorder} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={this.state.rowEvents} />
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
                            <Col md={12}>
                                <BootstrapTable keyField='ID' data={this.state.items} columns={columnsorder} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={this.state.rowEvents} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                            <h3>Order ID: {OrderIDrow}</h3>
                                <BootstrapTable keyField='ID' data={this.state.foodoforder} columns={columnsorderdetail} pagination={paginationFactory(options)} filter={filterFactory()} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }

    }
}

export default ReadAllOrder;
