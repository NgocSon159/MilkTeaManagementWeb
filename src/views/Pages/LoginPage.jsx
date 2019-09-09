import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { Redirect } from 'react-router';
import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';


var username = "";
var password = "";



//function 



class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.click=this.click.bind(this);
        this.login=this.login.bind(this);
        this.state = {
            cardHidden: true,
            token:""
        }
    }

    click() {
        console.log(username);
        console.log(password);
        this.login();
    }

    login() {
    
        var url = 'http://localhost:3006/login';
        var data = {
            "data":
            {
                "Username": username,
                "Password": password
            }
        };
    
        //var aaa=JSON.stringify(data)
        //console.log(aaa)
        fetch(url, {
            method: 'post', 
            mode: 'cors',
            body: JSON.stringify(data),
        }).then(res => res.json())
            .then(response => {
                if(typeof(response.data.token)!== 'undefined')
                {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('username', username)
                    this.setState({token:response.data.token})
                    
                }
                else {
                    this.setState({token:""})
                    alert("sai mat khau hoac tai khoan")
                }
                
                }
                )
            .catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        setTimeout(function () { this.setState({ cardHidden: false }); }.bind(this), 700);
    }
    render() {
        const token=this.state.token
        if(token=="")
        {
            console.log("ko co token")
        }
        else {
            console.log(token)
            return([
                alert("Đăng nhập thành công"),
                <Redirect to="/dashboard" />
            ])
        }
            
        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>
                                                Username
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter Username"
                                                id="username"
                                                onChange={(evt) => { username = evt.target.value; }}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Password"
                                                id="Password"
                                                type="password"
                                                onChange={(evt) => { password = evt.target.value; }}
                                            />
                                        </FormGroup>

                                    </div>
                                }
                                legend={
                                    <Button onClick={this.click} bsStyle="info" fill wd>
                                        Login
                                    </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default LoginPage;
