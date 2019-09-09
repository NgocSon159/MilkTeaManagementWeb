import React, { Component } from 'react';
import {
    Nav,NavDropdown, MenuItem,
    
} from 'react-bootstrap';
import { Redirect } from 'react-router';

class HeaderLinks extends Component {

    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.state = {
            logout: false
        }
    }

    click() {
        //alert('clicked')
        localStorage.clear();
        this.setState({ logout: true })

    }

    render() {
        const islogout = this.state.logout
        if (islogout == true) {
            return (
                <Redirect to="/pages/login-page" />
            )
        }
        else {
            return (
                <div>
                    <Nav pullRight>
                        <NavDropdown
                            eventKey={4}
                            title={(
                                <div>
                                    <i className="fa fa-list"></i>
                                    <p className="hidden-md hidden-lg">
                                        More
                                    <b className="caret"></b>
                                    </p>
                                </div>
                            )} noCaret id="basic-nav-dropdown-3" bsClass="dropdown-with-icons dropdown">
                            <MenuItem eventKey={4.5}><div onClick={this.click} className="text-danger"><i className="pe-7s-close-circle"></i> Log out</div></MenuItem>
                        </NavDropdown>
                    </Nav>
                </div>
            );
        }
    }
}
export default HeaderLinks;
