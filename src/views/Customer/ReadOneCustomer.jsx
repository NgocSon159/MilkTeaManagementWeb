import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import { Link, Switch } from "react-router-dom";
import { isNull } from 'util';

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

class ReadOneCustomer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
            rankname: ""
        }

    }

    componentDidMount() {
        console.log('didmount')
        const customeridselected = localStorage.getItem('CustomerIDSelected');
        fetch('http://localhost:3004/customers/' + customeridselected)
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                console.log(json.Rank.Name)

                this.setState({
                    isLoaded: true,
                    items: json,
                    rankname: json.Rank.Name,
                });

            });

    }

    xoalocalstorage() {
        //console.log('adsasd')
        localStorage.removeItem('CustomerIDSelected')
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
                                                    Create On <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="CreateOn"
                                                        type="text"
                                                        value={DateFormatter(this.state.items.CreateOn)}
                                                        readOnly="true"
                                                    />

                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Point <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Point"
                                                        type="text"
                                                        value={this.state.items.Point}
                                                        readOnly="true"
                                                    />

                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Rank <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Rank"
                                                        type="text"
                                                        value={this.state.rankname}
                                                        readOnly="true"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <Switch>

                                            <Link to="/customer/ReadAllCustomer" onClick={this.xoalocalstorage}>
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

export default ReadOneCustomer;
