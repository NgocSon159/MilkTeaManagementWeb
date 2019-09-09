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
    dataField: 'Username',
    text: 'Username',
    filter: textFilter(),
    sort: true
},
{
    dataField: 'EmployeeID',
    text: 'EmployeeID',
    sort: true
},
{
    dataField: 'RoleID',
    text: 'RoleID'
},
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

var Usernamerow = ""

const rowEvents = {
    // onClick: (e, row, rowIndex) => {
    //   console.log(`clicked on row with index: ${rowIndex}`);
    // },
    onMouseEnter: (e, row, rowIndex) => {
        //console.log(`enter on row with index: ${rowIndex}`);
        Usernamerow = row.Username;
    }
};



function click() {
    //alert(Usernamerow);
    localStorage.setItem('UserIDSelected', Usernamerow)

}

function ActionFormatter(cell, row) {

    return (
        [

            <Switch>
                <Link to="/User/ReadOneUser">
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

class test extends Component {
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
        fetch('http://localhost:3006/users')
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
                                <Link to="/User/Create">Create</Link>
                            </button>
                            </Switch>
                            <BootstrapTable keyField='ID' data={this.state.items} columns={columns} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={rowEvents} />
                        </Col>
                    </Row>
                </Grid>

            </div>

        );
    }
}

export default test;
