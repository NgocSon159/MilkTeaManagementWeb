import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import {Link, Switch } from "react-router-dom";


class Read extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
        
    }

    componentDidMount() {
        console.log('didmount')
        const useridselected=localStorage.getItem('UserIDSelected');
        fetch('http://localhost:3006/users/'+useridselected)
        .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)

                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
        
    }

    xoalocalstorage()
    {
        //console.log('adsasd')
        localStorage.removeItem('UserIDSelected')
    }

    render() {
        console.log(this.state.items)
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Create User</legend>}
                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Username <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Username"
                                                        type="text"
                                                        value={this.state.items.Username}
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
                                                    Role ID <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="RoleID"
                                                        type="text"
                                                        value={this.state.items.RoleID}
                                                        readOnly="true"
                                                    />
                                                    
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <Switch>
                                        
                                        <Link to="/User/ReadAll" onClick={this.xoalocalstorage}>
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

export default Read;
