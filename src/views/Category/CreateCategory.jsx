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
import { EEXIST } from 'constants';

const formData = {"data":{}};

class CreateCategory extends Component {
    constructor(props) {
        super(props);
         this.state = {
            nameError :null,
            nameValidation:"",
             image:null,
        //     radioVariant: "1"
        };
        this.handleName = this.handleName.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleRadio = event => {
    //     const target = event.target;
    //     this.setState({
    //         [target.name]: target.value
    //     });
    // };

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.nameError == null && formData.data['Name']!=null)
        {
        console.log('handleSubmit', 'bam')
        console.log('handleSubmit', formData)
         
        // Thêm ngày tạo
        var d = new Date();
        var CreatedOn = d.toJSON();
        formData.data["CreatedOn"] = CreatedOn

        
        //}
        try{
        console.log('-->', formData);
            fetch('http://localhost:3002/categories', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        alert('Create Category Succcess!!')
        this.props.history.push('/Category/ReadAllCategory')
        }
        catch(err){
            alert('ERORR!!')
        }
    }
    else{
        alert('Please check again your info')
        this.state.nameValidation.length < 2 ? this.setState({ nameError: (<small className="text-danger">You must enter a name of at least 2 characters.</small>) }):this.setState({ nameError: null });
    }
        
    }

    handleName(event){
        //event.preventDefault();
        formData.data[event.target.id] = event.target.value;
        console.log(event.target.value)
        this.setState({nameValidation:event.target.value})
        event.target.value.length < 2 ? this.setState({ nameError: (<small className="text-danger">You must enter a name of at least 2 characters.</small>) }):this.setState({ nameError: null });

    }
    handleFile(event){

        let files = event.target.files;
        // FileReader đổi file sang base64
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        // Nếu Reader được thì chạy tiếp code trong => ép đồng bộ
        reader.onload = (e) =>{
            console.warn("image1",e.target.result)
            // Bỏ đi "data:image/png;base64,"" trong phần encode
            let str = e.target.result;
            str = str.replace('data:image/jpeg;base64,','')
            console.log("image2",str)
            // Tạo 1 Object dạng FormData để gửi https://api.imgbb.com/
            let data = new FormData();
            data.append('key', 'ffc63ad5d7edc7cc14789c2151f9be25');   //append the values with key, value pair
            data.append('image', str); // chuỗi mã hóa
            // Phải chạy for để đọc được form data
            for(var pair of data.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
             }
            //https://api.imgbb.com/1/upload
            fetch('https://api.imgbb.com/1/upload', {
                body: data,
                method: 'POST',
            })
             .then(response => response.json())
             .then(body => {
                console.log('body',body)
                this.setState({
                    image: body.data.url
                })
            });
        };
    }

    render() {
        // Lấy địa chỉ từ server trả xuống cho image vừa up
        if (this.state.image!=null){
            formData.data['image']=this.state.image;
        }
        console.log('image',this.state.image)
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Create</legend>}
                                content={
                                    /////--------------------------------------------------
                                    <Form horizontal onSubmit={(event) => this.handleSubmit(event)} >
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
                                                    Image
                                                </ControlLabel>
                                                <Col sm={10}>
                                                    <FormControl
                                                        id="image" 
                                                        name="N"
                                                        type="file"
                                                        onChange={ (event) => this.handleFile(event) }
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

export default CreateCategory;
