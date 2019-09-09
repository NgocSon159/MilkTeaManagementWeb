import React, { Component } from 'react';
import {
    Grid, Row, Col, FormGroup, ControlLabel, FormControl, Form

} from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Button from 'elements/CustomButton/CustomButton.jsx';



var indexselected = -1
var formData = { "data": {} };

const columnchonorder = [{
    dataField: 'OrderID',
    text: 'Order ID',
    sort: true
},
{
    dataField: 'PhoneNumber',
    text: 'Phone Number'

},
{
    dataField: 'Total',
    text: 'Total'
},
{
    dataField: 'StatusOrder',
    text: 'Status Order'
}
];


const options = {
    sizePerPageList: [5, 10, 20, 50]
}

class Payment extends Component {

    constructor(props) {
        super(props)
        window.Component = this; //Use this to call a method inside componet from outside
        this.state = {
            phonenumber: "",
            discount: 0,
            tongtien: 0,
            cash: 0,
            change: 0,
            classname:"hidden",
            errorcash:null,
            cantcheckout:true,
            listorderserved: [],
            listfoodoforder: [],
            rowEvents: {
                onClick: (e, row, rowIndex) => {
                    console.log(`clicked on row `, this.state.listorderserved[rowIndex].OrderID);
                    indexselected=rowIndex
                    this.setState({ listfoodoforder: this.state.listorderserved[rowIndex].Foods })
                    this.setState({ tongtien: this.state.listorderserved[rowIndex].Total, cash:0,change:0,phonenumber:this.state.listorderserved[rowIndex].PhoneNumber,discount:this.state.listorderserved[rowIndex].Discount})
                    this.setState({classname:""})
                }
            },
            rowEventsforordercompleted: {
                onClick: (e, row, rowIndex) => {
                    console.log(`clicked on row `, this.state.listordercompleted[rowIndex].OrderID);

                    this.setState({ listfoodoforder: this.state.listordercompleted[rowIndex].Foods })
                    this.setState({ tongtien: this.state.listordercompleted[rowIndex].Total })
                }
            },
            columnorderdetail: [{
                dataField: 'Name',
                text: 'Name',
                sort: true,
            },
            {
                dataField: 'Size',
                text: 'Size',
            },
            {
                dataField: 'Price',
                text: 'Price',
            },
            {
                dataField: 'Quantity',
                text: 'Quantity'
            },
            {
                dataField: 'Note',
                text: 'Note'
            }
            ]
        }
        this.checkout = this.checkout.bind(this)
        this.cong500=this.cong500.bind(this)
        this.cong200=this.cong200.bind(this)
        this.cong100=this.cong100.bind(this)
        this.cong50=this.cong50.bind(this)
        this.cong20=this.cong20.bind(this)
        this.cong10=this.cong10.bind(this)
        this.cong5=this.cong5.bind(this)
        this.cong1=this.cong1.bind(this)
        this.checkout=this.checkout.bind(this)
    }

    checkout() {

        var array1 = [1, 4, 9, 16];
        const map1 = array1.map(x=>{
            if(x==4)
            {
                x*2
            }
        });
        console.log('map1',map1);

        console.log('here')

        //Get datetimenow
        var date = (new Date().getDate()) > 9 ? new Date().getDate() : '0' + new Date().getDate(); //Current Date
        var month = (new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : '0' + (new Date().getMonth() + 1); //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = (new Date().getHours()) > 9 ? new Date().getHours() : '0' + new Date().getHours(); //Current Hours
        var min = (new Date().getMinutes()) > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes(); //Current Minutes
        var sec = (new Date().getSeconds()) > 9 ? new Date().getSeconds() : '0' + new Date().getSeconds(); //Current Seconds

        var timenow = year + '-' + month + '-' + date
            + 'T' + hours
            + ':' + min
            + ':' + sec + 'Z';
        //*************//


        var data = this.state.listorderserved

        formData.data = data[indexselected]
        formData.data['StatusOrder'] = "Completed"
        formData.data['CompletedOn']=timenow
        formData.data['CompletedBy']=localStorage.getItem('username')

        console.log('formdata', formData)

        var pointcustomer=formData.data['Total']/10000
        var pointfinal=Math.round(pointcustomer)

        //console.log('orderid',data[indexselected].OrderID)

        fetch('http://localhost:3001/orders/' + data[indexselected].OrderID, {
            method: 'POST',
            body: JSON.stringify(formData),
        }).then(
            fetch('http://localhost:3004/customers/' + data[indexselected].PhoneNumber +'/'+pointfinal, {
                method: 'POST'
            })
        );
        

        alert('Payment Success!!')
        this.setState({listfoodoforder:[],tongtien:0,classname:"hidden",phonenumber:"",discount:0})
        fetch('http://localhost:3001/cashier')
            .then(res => res.json())
            .then(json => {
                //let data = xulu(json.data)
                
                if(json.data!==null)
                {
                    let data = this.layorderserved(json.data)
                    //data[0] is list order served
                    //data[1] is list order completed
    
                    this.setState({ listorderserved: data[0] })
                }
                else 
                {
                    this.setState({ listorderserved: [] })
                }
                
            });
        
        
    }


    //chia ra 2 state: 1 state luu list order served, 1 state luu list order completed
    layorderserved(list) {
        var mangorderserved = []
        var mangordercompleted = []
        for (var i = 0; i < list.length; i++) {
            if (list[i].StatusOrder == "Served") {
                mangorderserved.push(list[i])
            }
            if (list[i].StatusOrder == "Completed") {
                mangordercompleted.push(list[i])
            }
        }
        return [mangorderserved, mangordercompleted]
    }

    componentDidMount() {
        console.log('didmount')
        fetch('http://localhost:3001/cashier')
            .then(res => res.json())
            .then(json => {

                let data = this.layorderserved(json.data)
                //data[0] is list order served
                //data[1] is list order completed

                this.setState({ listorderserved: data[0] })
                
            });

    }


    

    cong500()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+500000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Phone number must have 10 numbers</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
        
    }

    cong200()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+200000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Not Enough Money!!!</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
    }

    cong100()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+100000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Not Enough Money!!!</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
    }

    cong50()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+50000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Not Enough Money!!!</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
    }

    cong20()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+20000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Not Enough Money!!!</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
    }

    cong10()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+10000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Not Enough Money!!!</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
    }

    cong5()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+5000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Not Enough Money!!!</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
    }

    cong1()
    {
        var tongtiens=this.state.tongtien
        var cashs=this.state.cash+1000
        var changes=cashs-tongtiens
        if(changes<0)
        {
            this.setState({errorcash:<span><small className="text-danger">Not Enough Money!!!</small></span>})
            
        }
        else{
            this.setState({errorcash:null,cantcheckout:false})
        }
        this.setState({cash:cashs,change:changes})
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            <h3>Payment </h3>
                        </Col>
                        <Col md={6}>
                            <Form horizontal>
                                <fieldset>
                                    <FormGroup>
                                        <ControlLabel className="col-sm-3">
                                            Phone Number
                                                </ControlLabel>
                                        <Col sm={3}>
                                            <FormControl
                                                id="PhoneNumber"
                                                type="text"
                                                disabled="true"
                                                value={this.state.phonenumber}
                                            />
                                        </Col>
                                        <ControlLabel className="col-sm-3">
                                            Discount
                                                </ControlLabel>
                                        <Col sm={3}>
                                            <FormControl
                                                type="text"
                                                disabled="true"
                                                value={this.state.discount}
                                            />
                                        </Col>
                                    </FormGroup>
                                </fieldset>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <BootstrapTable keyField='ID' data={this.state.listorderserved} columns={columnchonorder} pagination={paginationFactory(options)} filter={filterFactory()} rowEvents={this.state.rowEvents} />
                        </Col>
                        <Col md={6}>
                            <BootstrapTable keyField='ID' data={this.state.listfoodoforder} columns={this.state.columnorderdetail} filter={filterFactory()} rowEvents={this.state.rowEventsforOrderDetailDeleteFood} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>

                        </Col>
                        <Col md={2} mdOffset={4}>
                            <span>Total Money: {this.state.tongtien}</span>
                        </Col>
                    </Row>
                    <Row>
                        <br></br>
                    </Row>
                    <Row className={this.state.classname}>
                        <Col md={6}>

                        </Col>
                        <Col md={6}>
                            <Col md={3}><Button onClick={this.cong500} bsStyle="info" bsSize="sm" fill wd>
                                500k
                                </Button></Col>
                            <Col md={3}><Button onClick={this.cong200} bsStyle="info" bsSize="sm" fill wd>
                                200k
                                </Button></Col>
                            <Col md={3}><Button onClick={this.cong100} bsStyle="info" bsSize="sm" fill wd>
                                100k
                                </Button></Col>
                            <Col md={3}><Button onClick={this.cong50} bsStyle="info" bsSize="sm" fill wd>
                                50k
                                </Button></Col>
                        </Col>
                    </Row>
                    <Row className={this.state.classname}>
                        <br></br>
                    </Row>
                    <Row className={this.state.classname}>
                        <Col md={6}>

                        </Col>
                        <Col md={6}>
                            <Col md={3}><Button onClick={this.cong20} bsStyle="success" bsSize="sm" fill wd>
                                20k
                                </Button></Col>
                            <Col md={3}><Button onClick={this.cong10} bsStyle="success" bsSize="sm" fill wd>
                                10k
                                </Button></Col>
                            <Col md={3}><Button onClick={this.cong5} bsStyle="success" bsSize="sm" fill wd>
                                5k
                                </Button></Col>
                            <Col md={3}><Button onClick={this.cong1} bsStyle="success" bsSize="sm" fill wd>
                                1k
                                </Button></Col>
                        </Col>
                    </Row>
                    <Row className={this.state.classname}>
                        <br></br>
                    </Row>
                    <Row className={this.state.classname}>
                        <Col md={6}>

                        </Col>
                        <Col md={2} mdOffset={4}>
                            <span>Cash: {this.state.cash}</span>
                            <br></br>
                            {this.state.errorcash}
                        </Col>
                    </Row>
                    <Row className={this.state.classname}>
                        <Col md={6}>

                        </Col>
                        <Col md={2} mdOffset={4}>
                            <span>Change: {this.state.change}</span>
                        </Col>
                    </Row>
                    <Row className={this.state.classname}>
                        <br></br>
                    </Row>
                    <Row className={this.state.classname}>
                        <Col md={6}>
                        </Col>
                        <Col md={2} mdOffset={1}>
                            <button onClick={()=>this.setState({cash:0,change:0,cantcheckout:true,errorcash:null})} className="btn btn-success">
                                    Reset
                                </button>
                            
                        </Col>
                        <Col md={2} mdOffset={1}>
                        <button disabled={this.state.cantcheckout} onClick={this.checkout} className="btn btn-success">
                                    Check Out
                                </button>
                        </Col>
                    </Row>

                </Grid>
            </div>
        );
    }


}

export default Payment;
