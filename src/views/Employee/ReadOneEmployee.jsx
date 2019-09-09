import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import {Link, Switch } from "react-router-dom";

function DateFormatter(data) {
    if (data == null) {
        return null;
    }
    else {
        var myDate = new Date(data); // Gán giá trị trong cell cho biến Date    
        var offset = myDate.getTime(); // Đổi sang milisecond

        var options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZone: 'UTC' // GMT +0
        };
        {/* Đổi milisecond sang date format -> 28/03/2019, 13:55:17
                en-GB: d/m/y , en-US: m/d/y */}
        return new Intl.DateTimeFormat('en-GB', options).format(offset)
    }

}

class ReadOneEmployee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
        
    }

    componentDidMount() {
        console.log('didmount')
        const employeeidselected=localStorage.getItem('EmployeeIDSelected');
        fetch('http://localhost:3005/employees/'+employeeidselected)
        .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)

                this.setState({
                    isLoaded: true,
                    items: json,
                });
               
            });
        
    }

    xoalocalstorage()
    {
        //console.log('adsasd')
        localStorage.removeItem('EmployeeIDSelected')
    }

    render() {
        
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Create Customer</legend>}
                                content={
                                    <Form horizontal>
                                    {/* {elm} */}
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Name <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Name"
                                                        type="text"
                                                        value={this.state.items.Name}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Employee ID <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="EmployeeID"
                                                        type="text"
                                                        value={this.state.items.EmployeeID}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Birthday <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Birthday"
                                                        type="text"
                                                        value={DateFormatter(this.state.items.Birthday)}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Phone Number <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="PhoneNumber"
                                                        type="text"
                                                        value={this.state.items.PhoneNumber}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Identity <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Identity"
                                                        type="text"
                                                        value={this.state.items.Identity}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Address <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Address"
                                                        type="text"
                                                        value={this.state.items.Address}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Email <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Email"
                                                        type="text"
                                                        value={this.state.items.Email}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    DateStart <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="DateStart"
                                                        type="text"
                                                        value={DateFormatter(this.state.items.DateStart)}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    DateEnd <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="DateEnd"
                                                        type="text"
                                                        value={DateFormatter(this.state.items.DateEnd)}
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
                                                        value={this.state.items.Status}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <Switch>
                                        
                                        <Link to="/employee/ReadAllEmployee" onClick={this.xoalocalstorage}>
                                        <button className="btn btn-success" fill>Back
                                        </button></Link>
    
                                        </Switch>
                                       
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

export default ReadOneEmployee;
