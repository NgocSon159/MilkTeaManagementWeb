import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import {Link, Switch } from "react-router-dom";
import { isNullOrUndefined } from 'util';

function DateFormatter(date) {
    if (date == null)
        return null
    else{
    console.log('DateFormatter', date)
    var myDate = new Date(date); // Gán giá trị trong cell cho biến Date    
    var offset = myDate.getTime(); // Đổi sang milisecond

    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false, 
        timeZone: 'Asia/Jakarta' // GMT +0, UTC
    };
 
    {/* Đổi milisecond sang date format -> 28/03/2019, 13:55:17
        en-GB: d/m/y , en-US: m/d/y */}
    return new Intl.DateTimeFormat('en-GB', options).format(offset)
    }
} 



class  ReadOneCategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: {},
            category:{},
            isLoaded: false,
        }
        
    }

    componentDidMount() {
        console.log('didmount')
        const FoodIDSelected=localStorage.getItem('FoodIDSelected');
        fetch('http://localhost:3002/food/'+ FoodIDSelected)
        .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });  
        const Food_CategoryIDSelected = localStorage.getItem('Food_CategoryIDSelected')
        console.log('Food_CategoryID',Food_CategoryIDSelected)
        fetch('http://localhost:3002/categories/' + Food_CategoryIDSelected)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    category: json,
                })
            });
        
    }

    xoalocalstorage()
    {
        //console.log('adsasd')
        localStorage.removeItem('FoodIDSelected')
        localStorage.removeItem('Food_CategoryIDSelected')
    }

    render() {
        if (this.state==null){
            return (
                <div>listening...</div>
            )
        }
        else{
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Food Info</legend>}
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
                                                        value={this.state.items.Name}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Price <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Price"
                                                        value={this.state.items.Price}
                                                        readOnly="true"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Size <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Size"
                                                        value={this.state.items.Size}
                                                        readOnly="true"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    CreateOn <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="CreatedOn"
                                                        value={DateFormatter(this.state.items.CreatedOn)}
                                                        readOnly="true"
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    CategoryID <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="CategoryID"
                                                        value={this.state.category.Name}
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
                                        <Link to="/Food/ReadAllFood" onClick={this.xoalocalstorage}>
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
}
export default ReadOneCategory;
