import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import {Link, Switch } from "react-router-dom";

function DateFormatter(string) {
    if (string == null)
        return null
    else{
        console.log('DateFormatter', string)
        var myDate = new Date(string); // Gán giá trị trong cell cho biến Date    
        var offset = myDate.getTime(); // Đổi sang milisecond
    
        var options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false, 
            timeZone: 'Asia/Jakarta' // GMT +0
        };
     
        {/* Đổi milisecond sang date format -> 28/03/2019, 13:55:17
            en-GB: d/m/y , en-US: m/d/y */}  
        return  new Intl.DateTimeFormat('en-GB', options).format(offset)       
    }    

} 



class  ReadOneCategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
        
    }

    componentDidMount() {
        console.log('didmount')
        const CategoryIDSelected=localStorage.getItem('CategoryIDSelected');
        fetch('http://localhost:3002/categories/'+ CategoryIDSelected)
        .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });   
    }

    xoalocalstorage()
    {
        //console.log('adsasd')
        localStorage.removeItem('CategoryIDSelected')
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Category Info</legend>}
                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    CategoryID <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="CategoryID"
                                                        type="text"
                                                        value={this.state.items.CategoryID}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
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
                                                    Image <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <img src= {this.state.items.Image} width="100px"></img>
                                                    
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
                                                        type="text"
                                                        value={DateFormatter(this.state.items.CreatedOn)}
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
                                        
                                        <Link to="/Category/ReadAllCategory" onClick={this.xoalocalstorage}>
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
export default ReadOneCategory;
