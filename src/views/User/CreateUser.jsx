import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Select from 'react-select';

const formData = { "data": {} };

const listemployeeID = [

];

const listroleID = [];

var emID = "";
var roleid = "";

function xulu(list) {

    var listcompleted=[]
    for (var i = 0; i < list.length; i++) {

        listcompleted.push({ value: list[i].EmployeeID, label: list[i].EmployeeID + ' - ' + list[i].Name })
    };
    return listcompleted;
}

function xulu1(list) {

    var listcomplete=[]
    for (var i = 0; i < list.length; i++) {

        listcomplete.push({ value: list[i].RoleID, label: list[i].RoleID + ' - ' + list[i].Name })
    };
    return listcomplete;
}

class Create extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     radio: "1",
        //     radioVariant: "1"
        // };
        this.state = {
            listemployee: null,
            listrole: null,
            EmployeeIDSelect: "",
            RoleIDSelect: "",
            username: "",
            password: "",
            usernameError: null,
            passwordError: null,
            employeeidError: null,
            roleidError: null
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmployeeID = this.handleEmployeeID.bind(this);
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3005/employees')
            .then(res => res.json())
            .then(json => {
                let data = xulu(json.data)

                this.setState({
                    listemployee: data
                })
            });

        fetch('http://localhost:3007/roles')
            .then(res => res.json())
            .then(json => {
                let data = xulu1(json.data)

                this.setState({
                    listrole: data
                })
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log('handleSubmit', 'bam')
        console.log('handleSubmit', formData)

        if (this.state.username == "" || this.state.usernameError != null ||
            this.state.password == "" || this.state.passwordError != null ||
            this.state.EmployeeIDSelect == "" || this.state.employeeidError != null ||
            this.state.RoleIDSelect == "" || this.state.roleidError) 
        {
                alert("Please check again your info!!!")
                this.state.username < 1 ? this.setState({ usernameError: (<small className="text-danger">You must enter a username of at least 1 characters.</small>) }) : this.setState({ usernameError: null });
                this.state.password < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ passwordError: null });
                formData.data['EmployeeID'] == null ? this.setState({ employeeidError: (<small className="text-danger">You must assign this to an employee.</small>) }) : this.setState({ employeeidError: null });
                formData.data['RoleID'] == null ? this.setState({ roleidError: (<small className="text-danger">You must assign this with a role.</small>) }) : this.setState({ roleidError: null });
        }
        else {
            try {
                fetch('http://localhost:3006/register', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
                alert('Success!!!')
            }
            catch (err) {
                alert("Create Failed")
            }
        }


    }

    handleUsername(Event) {
        formData.data[Event.target.id] = Event.target.value;
        this.setState({ username: Event.target.value })
        Event.target.value.length < 1 ? this.setState({ usernameError: (<small className="text-danger">You must enter a username of at least 1 characters.</small>) }) : this.setState({ usernameError: null });
    }

    handlePassword(event) {
        formData.data[event.target.id] = event.target.value;
        this.setState({ password: event.target.value })
        event.target.value.length < 6 ? this.setState({ passwordError: (<small className="text-danger">You must enter a password of at least 6 characters.</small>) }) : this.setState({ passwordError: null });
    }

    handleEmployeeID() {
        console.log('handle', this.state.EmployeeIDSelect)
        formData.data['EmployeeID'] = emID;
        //this.state.EmployeeIDSelect === "" ? this.setState({ employeeidError: (<small className="text-danger">You must select one Employee!</small>) }):this.setState({ employeeidError: null });
    }

    handleRoleID() {
        console.log(this.state.EmployeeIDSelect)
        formData.data['RoleID'] = roleid;
    }

    render() {
        console.log('emid', this.state.EmployeeIDSelect)
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Create User</legend>}
                                content={
                                    <Form horizontal onSubmit={(event) => this.handleSubmit(event)} >
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Username <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Username"
                                                        type="text"
                                                        onChange={(event) => this.handleUsername(event)}
                                                    />
                                                    {this.state.usernameError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Password <span className="star">*</span>
                                                </ControlLabel>
                                                <Col sm={6}>
                                                    <FormControl
                                                        id="Password"
                                                        type="password"
                                                        onChange={(event) => this.handlePassword(event)}
                                                    />
                                                    {this.state.passwordError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Employee ID <span className="star">*</span>
                                                </ControlLabel>
                                                <Col md={6}>
                                                    <Select
                                                        id="EmployeeID"
                                                        placeholder="Single Select"
                                                        name="EmployeeIDSelect"
                                                        value={this.state.EmployeeIDSelect}
                                                        options={this.state.listemployee}
                                                        onChange={(value) => {
                                                            //console.log(value)
                                                            //emID=value.value
                                                            if (value === null) {
                                                                this.setState({ EmployeeIDSelect: "" })
                                                                this.handleEmployeeID()
                                                            }
                                                            else {
                                                                emID = value.value
                                                                this.setState({ EmployeeIDSelect: value.value })
                                                                this.handleEmployeeID()
                                                            }

                                                        }
                                                        }
                                                    />
                                                    {this.state.employeeidError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Role ID <span className="star">*</span>
                                                </ControlLabel>
                                                <Col md={6}>
                                                    <Select
                                                        id="roleid"
                                                        placeholder="Single Select"
                                                        name="RoleIDSelect"
                                                        value={this.state.RoleIDSelect}
                                                        options={this.state.listrole}
                                                        onChange={(value) => {
                                                            if (value === null) {
                                                                this.setState({ RoleIDSelect: "" })
                                                                this.handleRoleID()
                                                            }
                                                            else {
                                                                roleid = value.value
                                                                this.setState({ RoleIDSelect: value.value })
                                                                this.handleRoleID()
                                                            }

                                                        }
                                                        }
                                                    />
                                                    {this.state.roleidError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>

                                        <Button bsStyle="info" fill type='submit'>
                                            Submit
                                        </Button>
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

export default Create;
