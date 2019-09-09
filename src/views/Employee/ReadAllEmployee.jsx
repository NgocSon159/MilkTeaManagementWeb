import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import React, { Component } from 'react';
import Button from 'elements/CustomButton/CustomButton.jsx';


import {Link, Switch } from "react-router-dom";

//import "./imageresize.css"
const columns = [{
    dataField: 'EmployeeID',
    text: 'ID',
    filter: textFilter(),
    sort: true
},
{
    dataField: 'Name',
    text: 'Name',
    filter: textFilter(),
    sort: true
},
{
    dataField: 'Birthday',
    text: 'Birthday',
    formatter: DateFormatter
},
{
    dataField: 'PhoneNumber',
    text: 'Phone Number',
    filter: textFilter(),
    sort: true
},
{
    dataField: 'Identity',
    text: 'Identity',
    filter: textFilter(),
    sort: true
},
{
    dataField: 'Address',
    text: 'Address',
},
// {
//     dataField: 'Email',
//     text: 'Email',
// },
// {
//     dataField: 'DateStart',
//     text: 'Start Day',
//     formatter: DateFormatter
// },
// {
//     dataField: 'DateEnd',
//     text: 'End Day',
//     formatter: DateFormatter
// },
{
    dataField: 'Status',
    text: 'Status',
    formatter: StatusFormatter
},
{
    text: 'Actions',
    formatter: ActionFormatter
}
];

//Use for pagelistsize
const options = {
    sizePerPageList: [5, 10, 20, 50]
}

var EmployeeIDrow = ""

const rowEvents = {
    // onClick: (e, row, rowIndex) => {
    //   console.log(`clicked on row with index: ${rowIndex}`);
    // },
    onMouseEnter: (e, row, rowIndex) => {
        //console.log(`enter on row with index: ${rowIndex}`);
        EmployeeIDrow=row.EmployeeID;
    }
};



function click() {
    //alert(Usernamerow);
    localStorage.setItem('EmployeeIDSelected', EmployeeIDrow)

}

function ImageFormatter(cell, row) {
    return (
        <img src={cell} height="100px" />
    );
}

function ActionFormatter(cell, row) {

    return (
        [

            <Switch>
                <Link to="/employee/ReadOneEmployee">
                    <Button onClick={click} simple bsStyle="info" bsSize="xs">
                        <i className="fa fa-user"></i></Button>
                </Link>
            </Switch>,
            <Button simple bsStyle="success" bsSize="xs">
                <i className="fa fa-edit"></i>
            </Button>,
            <Button simple bsStyle="danger" bsSize="xs">
                <i className="fa fa-times"></i>
            </Button>
        ]
    );
}

function DateFormatter(cell, row) {
    console.log('cell', cell)
    var myDate = new Date(cell); // Gán giá trị trong cell cho biến Date    
    var offset = myDate.getTime(); // Đổi sang milisecond

    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false, 
        timeZone: 'UTC' // GMT +0
    };

    if (row.Birthday) {
        return (
            <span>
                {/* Đổi milisecond sang date format -> 28/03/2019, 13:55:17
                en-GB: d/m/y , en-US: m/d/y */}
                {new Intl.DateTimeFormat('en-GB', options).format(offset)} 
            </span>
        );
    }
    return (
        <span> {cell} </span>
    );
}


function StatusFormatter(cell, row) {
    if (cell) {
        return (
            <span>
                Active
        </span>
        );
    }
    else {
        return (
            <span>
                InActive
        </span>
        );
    }
}

// function xulu(list) {

//     for (var i = 0; i < list.length; i++) {
//         //console.log()
//         list[i].CreatedOn = "2018"
//     };
//     return list;
// }

class ReadAllEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentWillUnmount() {
        console.log('unmoont')
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3005/employees')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)

                this.setState({
                    isLoaded: true,
                    items: json.data,
                })
            });
    }

    render() {
        console.log(this.state.items)

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Switch><button className="btn btn-success">
                                <Link to="/employee/CreateEmployee">Create</Link>
                            </button>
                            </Switch>
                            <BootstrapTable keyField='PhoneNumber' data={this.state.items} columns={columns} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={rowEvents} />
                        </Col>
                    </Row>
                </Grid>

            </div>

        );
    }
}

export default ReadAllEmployee;
