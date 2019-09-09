import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import React, { Component } from 'react';
import Button from 'elements/CustomButton/CustomButton.jsx';
//import demo from './demo.jsx';
// import demo from 'views/test/demo.jsx';
import {Switch,Link} from "react-router-dom";
//import "./imageresize.css"



const columns = [{
    dataField: 'CategoryID',
    text: 'CategoryID',
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
    dataField: 'Image',
    text: 'Image',
    formatter: ImageFormatter
},
{
    dataField: 'CreatedOn',
    text: 'Created On',
    formatter: DateFormatter
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

var CategoryIDrow=""

const rowEvents = {
    // onClick: (e, row, rowIndex) => {
    //   console.log(`clicked on row with index: ${rowIndex}`);
    // },
    onMouseEnter: (e, row, rowIndex) => {
        //console.log(`enter on row with index: ${rowIndex}`);
        CategoryIDrow = row.CategoryID;
    }
};

function ImageFormatter(cell, row) {
    return (
        <img src={cell} height="80px" />
    );
}

function click()
{
    alert(CategoryIDrow);
    localStorage.setItem('CategoryIDSelected', CategoryIDrow)
}

function ActionFormatter(cell, row) {

    return (
        [
            <Switch>
                <Link to="/Category/ReadOneCategory">
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

function DateFormatter(cell, row) {
    console.log('cell', cell)
    var myDate = new Date(cell); // Gán giá trị trong cell cho biến Date    
    var offset = myDate.getTime(); // Đổi sang milisecond

    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false, 
        timeZone: 'Asia/Jakarta' // GMT +0
    };

    if (row.CreatedOn) {
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

// function xulu(list) {

//     for (var i = 0; i < list.length; i++) {
//         //console.log()
//         list[i].CreatedOn = "2018"
//     };
//     return list;
// }

class ReadAllCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3002/categories')
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
                        <button className="btn btn-success">
                        <Link to="/Category/CreateCategory"  >create</Link>
                        {/* <Route path="views/tables/data-table" component={DataTables} /> */}
                        </button>
                        
                            <BootstrapTable keyField='CategoryID' data={this.state.items} columns={columns} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={rowEvents} />
                        </Col>
                    </Row>
                </Grid>

            </div>

        );
    }
}

export default ReadAllCategory;
