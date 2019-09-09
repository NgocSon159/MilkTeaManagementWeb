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



const columns = [
{
    dataField: 'Name',
    text: 'Name',
    filter: textFilter(),
    sort: true
},
{
    dataField: 'CategoryID',
    text: 'Category Name',
    formatter: CategoryNameFormatter,
    filter: textFilter(),
    sort: true
},
{
    dataField: 'Price',
    text: 'Price',
    filter: textFilter()
},
{
    dataField: 'Size',
    text: 'Size',
    filter: textFilter()
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

var FoodIDrow=""
var Food_CategoryIDrow=""
var Categories = []

const rowEvents = {
    // onClick: (e, row, rowIndex) => {
    //   console.log(`clicked on row with index: ${rowIndex}`);
    // },
    onMouseEnter: (e, row, rowIndex) => {
        //console.log(`enter on row with index: ${rowIndex}`);
        FoodIDrow = row.FoodID;
        Food_CategoryIDrow=row.CategoryID;
    }
};

function ImageFormatter(cell, row) {
    return (
        <img src={cell} height="80px" />
    );
}

function click()
{
    alert(FoodIDrow);
    localStorage.setItem('FoodIDSelected', FoodIDrow);
    localStorage.setItem('Food_CategoryIDSelected', Food_CategoryIDrow)
}

function ActionFormatter(cell, row) {

    return (
        [
            <Switch>
                <Link to="/Food/ReadOneFood">
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
        timeZone: 'Asia/Jakarta' // GMT +7 , UTC -> GMT+0
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
var name=""
function CategoryNameFormatter(cell, row) {
    console.log('Categories',Categories)
    console.log('Cell',cell)
        for (var i=0;i<Categories.length;i++){
            if (cell == Categories[i].CategoryID)
                {
                    name = Categories[i].Name
                    break
                }
    
        }

        if (name != "") {
            return (
                <span>
                    {name} 
                </span>
            );
        }
        else{
        return (
            <span> 11 </span>
        );
        }
    
    
}


class ReadAllFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            categories:[],
            isLoaded: false,
        }
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3002/food')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json.data,
                })
            });
        fetch('http://localhost:3002/categories',{
            method:'GET'
        })
            .then(res => res.json())
            .then(json => {
                Categories = json.data
                this.setState({
                    isLoaded:true,
                    categories: json.data,
                })  
            });
            
    }

    render() {
        if (this.state.isLoaded == false){
            return null
        }
        else {
        console.log(this.state.categories)
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                        <button className="btn btn-success">
                        <Link to="/Food/CreateFood">Create</Link>
                        </button>                      
                            <BootstrapTable keyField='FoodID' data={this.state.items} columns={columns} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={rowEvents} />
                        </Col>
                    </Row>
                </Grid>

            </div>

        );
        }
    }
}

export default ReadAllFood;
