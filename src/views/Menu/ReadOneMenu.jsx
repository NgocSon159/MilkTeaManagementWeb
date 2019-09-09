import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';


import { Link, Switch } from "react-router-dom";
import { isNullOrUndefined } from 'util';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import Button from 'elements/CustomButton/CustomButton.jsx';

//import "./imageresize.css"

function DateFormatter(date) {
    if (date == null)
        return null
    else {
        console.log('DateFormatter', date)
        var myDate = new Date(date); // Gán giá trị trong cell cho biến Date    
        var offset = myDate.getTime(); // Đổi sang milisecond

        var options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZone: 'Asia/Jakarta' // GMT +0
        };

        {/* Đổi milisecond sang date format -> 28/03/2019, 13:55:17
        en-GB: d/m/y , en-US: m/d/y */}
        return new Intl.DateTimeFormat('en-GB', options).format(offset)
    }
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
const columns = [{
    dataField: 'FoodID',
    text: 'FoodID',
    sort: true
},
{
    dataField: 'Name',
    text: 'Name',
    sort: true
},
{
    dataField: 'Size',
    text: 'Size',
    sort: true
},
{
    dataField: 'Price',
    text: 'Price',
    sort:true
},
];
const options = {
    sizePerPageList: [5, 10, 20, 50]
}

class ReadOneMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: {},
            menu_details: {},
            isLoaded: false,
        }

    }

    componentDidMount() {
        console.log('didmount')

        const MenuIDSelected = localStorage.getItem('MenuIDSelected')
        fetch('http://localhost:3003/menus/' + MenuIDSelected,{
            method:'GET',
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    menu: json,
                })
            });

        fetch('http://localhost:3003/menu/details/' + MenuIDSelected,{
            method: 'GET',
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    menu_details: json.data,
                })
            });

    }

    xoalocalstorage() {
        //console.log('adsasd')
        localStorage.removeItem('MenuIDSelected')
    }

    render() {
        if (this.state == null) {
            return (
                <div>listening...</div>
            )
        }
        else {
            return (
                <div className="main-content">
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <Card
                                    title={<legend>ReadOneMenu</legend>}
                                    content={
                                        <Form horizontal>
                                            <fieldset>
                                                <FormGroup>
                                                    <ControlLabel className="col-sm-2">
                                                        Name <span className="star">*</span>
                                                    </ControlLabel>
                                                    <Col sm={6}>
                                                        <FormControl
                                                            id="Name"
                                                            value={this.state.menu.Name}
                                                            readOnly="true"
                                                        />

                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                            <fieldset>
                                                <FormGroup>
                                                    <ControlLabel className="col-sm-2">
                                                        CreatedOn <span className="star">*</span>
                                                    </ControlLabel>
                                                    <Col sm={6}>
                                                        <FormControl
                                                            id="CreatedOn"
                                                            value={DateFormatter(this.state.menu.CreatedOn)}
                                                            readOnly="true"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                            <fieldset>
                                                <FormGroup>
                                                    <ControlLabel className="col-sm-2">
                                                        BranchID <span className="star">*</span>
                                                    </ControlLabel>
                                                    <Col sm={6}>
                                                        <FormControl
                                                            id="BranchID"
                                                            value={this.state.menu.BranchID}
                                                            readOnly="true"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                            <fieldset>
                                                <FormGroup>
                                                    <ControlLabel className="col-sm-2">
                                                        Status <span className="star">*</span>
                                                    </ControlLabel>
                                                    <Col sm={6}>
                                                        <FormControl
                                                            id="Status"
                                                            type="text"
                                                            value={this.state.menu.Status}
                                                            readOnly="true"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </fieldset>
                                            <Switch>
                                                <Link to="/Menu/ReadAllMenu" onClick={this.xoalocalstorage}>
                                                    <button className="btn btn-success" fill>Back
                                        </button></Link>

                                            </Switch>

                                        </Form>
                                    }
                                />
                            </Col>
                        </Row>


                        <Row>
                            <Col md={12}>
                                <BootstrapTable keyField='MenuID' data={this.state.menu_details} columns={columns} pagination={paginationFactory(options)} filter={filterFactory()}  />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
    }
}
export default ReadOneMenu;
