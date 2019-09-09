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

class CreateEmployee extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
           
            
            dateTime: null,
            image: '',
            employeeId: "",
            name: "",
            address: "",
            email: "",
            phoneNumber: "",
            identity: "",

            //
            employeeIdError: null,
            nameError: null,
            addressError: null,
            emailError: null,
            phoneNumberError: null,
            identiyError: null,
            //
            idCheck : false,
            nameCheck : false,
            birthdayCheck : false,
            phoneCheck : false,
            identityCheck : false,
            addressCheck : false,
            emailCheck : false,
            startCheck : false,
            endCheck : false
        };
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handleEmployeeID = this.handleEmployeeID.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        //this.handleFile = this.handleFile.bind(this);
        this.handleDateStart = this.handleDateStart.bind(this);
        this.handleDateEnd = this.handleDateEnd.bind(this);
        this.handleIdentity = this.handleIdentity.bind(this);
    }
    // handleRadio = event => {
    //     const target = event.target;
    //     this.setState({
    //         [target.name]: target.value
    //     });
    // };

    handleEmployeeID(event){
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        this.setState({
            employeeId : formData.data[event.target.id],
            idCheck : true
        })
        event.target.value === "" ? this.setState({ employeeIdError: (<small className="text-danger">Please enter the Information</small>)})
            : this.setState({ employeeIdError : null })
    }
    handleName(event){
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        this.setState({
            name : formData.data[event.target.id],
            idCheck : true
        })
        event.target.value === "" ? this.setState({ nameError: (<small className="text-danger">Please enter the Information</small>)})
            : this.setState({ nameError : null })
        console.log(event.target.value)
       
    }
    handleAddress(event){
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        this.setState({
            address : formData.data[event.target.id],
            addressCheck : true
        })
        event.target.value === "" ? this.setState({ addressError: (<small className="text-danger">Please enter the Information</small>)})
            : this.setState({ addressError : null })
        console.log(event.target.value)
       
    }

    handlePhoneNumber(phone){
        //event.preventDefault();
        formData.data[phone.target.id] = phone.target.value;
        this.setState({
            phoneNumber : formData.data[phone.target.id],
            phoneCheck : true
        })
        phone.target.value.length < 10 ? this.setState({ phoneNumberError: (<small className="text-danger">Please enter 10 numbers</small>) })
              : this.setState({ phoneNumberError: null })
        console.log(phone.target.value)
    }

    handleIdentity(phone){
        //event.preventDefault();
        formData.data[phone.target.id] = phone.target.value;
        this.setState({
            identity : formData.data[phone.target.id],
            identityCheck : true
        })
        phone.target.value.length < 10 ? this.setState({ identiyError: (<small className="text-danger">Please enter 10 numbers</small>) })
              : this.setState({ identiyError: null })
        console.log(phone.target.value)
    }

    handleBirthday(event){
        this.setState({
            birthdayCheck : true
        })
        let date = new Date(event._d);      
        let day, month = 0;
        day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        month = (date.getMonth() + 1) > 9 ? date.getMonth() : "0" + date.getMonth();

        let birthday = date.getFullYear() + "-" + month + "-" + day + "T00:00:00Z";

        console.log(birthday);
        formData.data['Birthday'] = birthday;
    }
    handleDateStart(event){
        this.setState({
            startCheck : true
        })
        let date = new Date(event._d);      
        let day, month = 0;
        day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        month = (date.getMonth() + 1) > 9 ? date.getMonth() : "0" + date.getMonth();

        let birthday = date.getFullYear() + "-" + month + "-" + day + "T00:00:00Z";

        console.log(birthday);
        formData.data['DateStart'] = birthday;
    }

    handleDateEnd(event){
        this.setState({
            endCheck : true
        })
        let date = new Date(event._d);      
        let day, month = 0;
        day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        month = (date.getMonth() + 1) > 9 ? date.getMonth() : "0" + date.getMonth();

        let birthday = date.getFullYear() + "-" + month + "-" + day + "T00:00:00Z";

        console.log(birthday);
        formData.data['DateEnd'] = birthday;
    }

    // handleFile(event) {

    //     let files = event.target.files;
    //     // FileReader đổi file sang base64
    //     let reader = new FileReader();
    //     reader.readAsDataURL(files[0]);
    //     // Nếu Reader được thì chạy tiếp code trong => ép đồng bộ
    //     reader.onload = (e) => {
    //         console.warn("image1", e.target.result)
    //         // Bỏ đi "data:image/png;base64,"" trong phần encode
    //         let str = e.target.result;
    //         str = str.replace('data:image/jpeg;base64,', '')
    //         console.log("image2", str)
    //         // Tạo 1 Object dạng FormData để gửi https://api.imgbb.com/

    //         let data = new FormData();
    //         data.append('key', '831664694dfed807b9844c35270b602a'); //append the values with key, value pair
    //         data.append('image', str); // chuỗi mã hóa
    //         // Phải chạy for để đọc được form data
    //         for (var pair of data.entries()) {
    //             console.log(pair[0] + ', ' + pair[1]);
    //         }
    //         //https://api.imgbb.com/1/upload
    //         fetch('https://api.imgbb.com/1/upload', {
    //             body: data,
    //             method: 'POST',
    //         })
    //             .then(response => response.json())
    //             .then(body => {
    //                 console.log('body', body)
    //                 this.setState({
    //                     image: body.data.url
    //                 })
    //             });
    //     };
    // }
    handleEmailChange(event){
        formData.data[event.target.id] = event.target.value;
        this.setState({
            email : formData.data[event.target.id]
        })
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(event.target.value) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }):this.setState({ emailError: null });
    }

    handleSubmit(event) {
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
        this.state.employeeId === "" ? this.setState({ employeeIdError: (<small className="text-danger">Please enter the Information</small>)})
            : this.setState({ employeeIdError : null })
        this.state.name === "" ? this.setState({ nameError: (<small className="text-danger">Please enter the Information</small>)})
            : this.setState({ nameError : null })
        this.state.address === "" ? this.setState({ addressError: (<small className="text-danger">Please enter the Information</small>)})
            : this.setState({ addressError : null })
        this.state.phoneNumber.length < 10 ? this.setState({ phoneNumberError: (<small className="text-danger">Please enter 10 numbers</small>) })
            : this.setState({ phoneNumberError: null })
        this.state.identity.length < 10 ? this.setState({ identiyError: (<small className="text-danger">Please enter 10 numbers</small>) })
            : this.setState({ identiyError: null })
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(this.state.email) === false ? this.setState({ emailError: (<small className="text-danger">Email is required and format should be <i>john@doe.com</i>.</small>) }):this.setState({ emailError: null });


        if (this.state.employeeIdError === null && this.state.nameError === null && this.state.addressError === null
            && this.state.phoneNumberError === null && this.state.identiyError === null && this.state.emailError === null
            && this.state.idCheck && this.state.nameCheck && this.state.birthdayCheck 
            && this.state.phoneCheck && this.state.identityCheck && this.state.addressCheck 
            && this.state.emailCheck && this.state.startCheck && this.state.endCheck) {
                fetch('http://localhost:3005/employees', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
                this.props.history.push('/Employee/ReadAllEmployee')
        } else {
            alert("Failed!")
        }
        ///
        
    }

    render() {
        
        if (this.state.image != null) {
            formData.data['image'] = this.state.image;
        }
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
                                                    Employee ID
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="EmployeeID" 
                                                        name="EmployeeID"
                                                        type="text"
                                                        onChange={ (event) => this.handleEmployeeID(event) }
                                                    />
                                                    {this.state.employeeIdError}
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
                                                        onChange={ (event) => this.handleName(event) }                                    
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
                                                    Phone
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
                                                    Identity
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="Identity" 
                                                        name="Identity"
                                                        type="text"
                                                        maxLength={10}
                                                        pattern="[0-9]*"
                                                        onChange={ (phone) => this.handleIdentity(phone) }                                    
                                                    />
                                                    {this.state.identiyError}
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
                                                        onChange={ (event) => this.handleAddress(event) }                                    
                                                    />
                                                    {this.state.addressError}
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Email
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="Email" 
                                                        name="Email"
                                                        type="email"
                                                        onChange={ (event) => this.handleEmailChange(event) }                                     
                                                    />
                                                    {this.state.emailError}
                                                </Col>
                                                
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Start day
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <Datetime
                                                        id="DateStart"
                                                        name="DateStart"
                                                        timeFormat={false}
                                                        inputProps={{placeholder:"Date Picker Here"}}
                                                        defaultValue={new Date()}
                                                        onChange={ (event) => this.handleDateStart(event) }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset> 
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    End day
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <Datetime
                                                        id="DateEnd"
                                                        name="DateEnd"
                                                        timeFormat={false}
                                                        inputProps={{placeholder:"Date Picker Here"}}
                                                        defaultValue={new Date()}
                                                        onChange={ (event) => this.handleDateEnd(event) }
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset> 
                                        {/* <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Image
                                                    </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="image"
                                                        name="N"
                                                        type="file"
                                                        onChange={(event) => this.handleFile(event)}
                                                    //style ={{ display: 'none' }} 
                                                    />
                                                </Col>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="image"
                                                        value={this.state.image}
                                                        readOnly="true"
                                                        type="text"
                                                    //onChange={ (event) => this.handleFile(event) }
                                                    //style ={{ display: 'none' }} 
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset> */}
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

export default CreateEmployee;
