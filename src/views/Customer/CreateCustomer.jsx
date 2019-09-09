import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';
import { create } from 'domain';
import Datetime from 'react-datetime';


const formData = {"data":{}};

class CreateCustomer extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            phoneNum: "",
            name: "",
            address: "",
            //
            phoneNumberError: null,
            nameError: null,
            addressError: null,
            dateTime: null,
            //
            phoneCheck: false,
            nameCheck: false,
            addressCheck: false,
            birthdayCheck: false
        };
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handlName = this.handlName.bind(this);
        this.handlAddress = this.handlAddress.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
    }
    // handleRadio = event => {
    //     const target = event.target;
    //     this.setState({
    //         [target.name]: target.value
    //     });
    // };


    handlePhoneNumber(phone){
        //event.preventDefault();
        
        formData.data[phone.target.id] = phone.target.value;
        this.setState({
            phoneNum : formData.data[phone.target.id],
            phoneCheck : true
        });
        phone.target.value.length < 10 ? this.setState({ phoneNumberError: (<small className="text-danger">Phone number must have 10 numbers</small>) })
              : this.setState({ phoneNumberError: null })
        console.log(phone.target.value)
    }

    handlName(event){
        
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        this.setState({
            name : formData.data[event.target.id],
            nameCheck : true
        });
        this.state.event === "" ? this.setState({ nameError: (<small className="text-danger">Please enter the information</small>)})
            : this.setState({ nameError : null })
        //console.log(event.target.value)
    }

    handlAddress(event){
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        this.setState({
            address : formData.data[event.target.id],
            addressCheck : true
        });
        this.state.event === "" ? this.setState({ addressError: (<small className="text-danger">Please enter the address</small>)})
            : this.setState({ addressError : null })
        //console.log(event.target.value)
    }

    handleBirthday(event){
        this.setState({
            birthdayCheck : true
        })
        console.log(event);
        let date = new Date(event._d);
        //console.log(date.getDate());        
        let day, month = 0;
        day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        month = (date.getMonth() + 1) > 9 ? date.getMonth() : "0" + date.getMonth();
        // hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
        // minute = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
        // second = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
        //console.log(month);
        console.log(date.getFullYear());
        let birthday = date.getFullYear() + "-" + month + "-" + day + "T00:00:00Z";
                // + "T" + hour
                // + ":" + minute + ":" 
                // + second + "Z";

        console.log(birthday);
        formData.data['Birthday'] = birthday;
    }

    handleSubmit(event) {
        var date = (new Date().getDate()) > 9 ? new Date().getDate() : '0' + new Date().getDate(); //Current Date
        var month = (new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1); //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = (new Date().getHours()) > 9 ? new Date().getHours() : '0' + new Date().getHours(); //Current Hours
        var min = (new Date().getMinutes()) > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes(); //Current Minutes
        var sec = (new Date().getSeconds()) > 9 ? new Date().getSeconds() : '0' + new Date().getSeconds(); //Current Seconds

        var timenow = year + '-' + month + '-' + date
                    + 'T' + hours
                    + ':' + min 
                    + ':'+ sec + 'Z';
        console.log(timenow);
        
        formData.data['CreateOn'] = timenow;
        formData.data['Point'] = 0;
        
        event.preventDefault();
        console.log('handleSubmit', 'bam')
        console.log('handleSubmit', formData)
         
        //const data = new FormData(event.target);

        // console.log('body', data)
        // fetch('http://localhost:3001/Categorys', {
        //     method: 'POST',
        //     body: data,
        // });
        

        //}
        // console.log('-->', formData);

        this.state.phoneNum.length < 10 ? this.setState({ phoneNumberError: (<small className="text-danger">Phone number must have 10 numbers</small>) })
              : this.setState({ phoneNumberError: null })
        this.state.name === "" ? this.setState({ nameError: (<small className="text-danger">Please enter the information</small>)})
            : this.setState({ nameError : null })
        this.state.address === "" ? this.setState({ addressError: (<small className="text-danger">Please enter the address </small>)})
            : this.setState({ addressError : null })    
        // console.log(this.state.phoneNum);
        // console.log(this.state.name);
        // console.log(this.state.phoneNumberError);
        // console.log(this.state.nameError);  

        if (this.state.phoneNumberError === null && this.state.nameError === null && this.state.addressError === null
            && this.state.phoneCheck && this.state.nameCheck && this.state.addressCheck 
            && this.state.birthdayCheck) {
            fetch('http://localhost:3004/customers', {
                method: 'POST',
                body: JSON.stringify(formData),    
            });
        } else {
            alert("Failed!");
        }
        ///
        this.props.history.push('/Customer/ReadAllCustomer')
    }


    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Add Customer</legend>}
                                content={
                                    // <form onSubmit={this.handleSubmit}>
                                    //     <label htmlFor="CategoryID">CategoryID</label>
                                    //     <input ref="CategoryID" id="CategoryID" name="CategoryID" type="text" />

                                    //     <label htmlFor="email">Enter your email</label>
                                    //     <input ref="Name" id="Name" name="Name" type="text" />


                                    //     <button>Send data!</button>
                                    // </form> 
                                    /////--------------------------------------------------
                                    <Form horizontal onSubmit={(event) => this.handleSubmit(event)} >
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    PhoneNumber
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="PhoneNumber" 
                                                        name="PhoneNumber"
                                                        type="text"
                                                        maxLength={10}
                                                        pattern="[0-9]*"
                                                        onChange={ (phone) => this.handlePhoneNumber(phone) }                                    
                                                    />
                                                    {this.state.phoneNumberError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Name
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="Name" 
                                                        name="Name"
                                                        type="text"
                                                        onChange={ (event) => this.handlName(event) }                                    
                                                    />
                                                    {this.state.nameError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Birthday
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <Datetime
                                                        id="Birthday"
                                                        name="Birthday"
                                                        timeFormat={false}
                                                        inputProps={{placeholder:"Date Picker Here"}}
                                                        defaultValue={new Date()}
                                                        onChange={ (event) => this.handleBirthday(event) }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset> 
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Address
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="Address" 
                                                        name="Address"
                                                        type="text"
                                                        onChange={ (event) => this.handlAddress(event) }                                    
                                                    />
                                                    {this.state.addressError}
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

export default CreateCustomer;
