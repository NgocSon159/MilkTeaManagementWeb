import * as React from 'react';
import {NavLink} from 'react-router-dom';

export class HearderComponent extends React.Component {
    public render(): React.ReactNode {
        return (
                <div id="site-header">
                    <header id="header" className="header-block-top">
                        <div className="container">
                            <div className="row">
                                <div className="main-menu">
                                    <nav className="navbar navbar-default" id="mainNav">
                                        <div className="navbar-header">
                                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                            <div className="logo">
                                                <a className="navbar-brand js-scroll-trigger logo-header" href="#">
                                                    <img src="assets/images/logo.png" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                        <div id="navbar" className="navbar-collapse collapse">
                                            <ul className="nav navbar-nav navbar-right">
                                                
                                                <li className="active">
                                                {/* <a href="#banner">Home</a> */}
                                                <NavLink to="">Order</NavLink>
                                                </li>
                                                {/* <li><a href="#about">Order</a></li> */}
                                                <li><a href="#menu">Drink</a></li>
                                                <li><a href="#our_team">Food</a></li>
                                                <li><a href="#gallery">Discount</a></li>
                                                {/* <li><a href="#blog">Blog</a></li>
                                                <li><a href="#pricing">pricing</a></li> */}
                                                <li><a href="#reservation">Reservaion</a></li>
                                                <li><a href="#footer">Contact us</a></li>
                                            </ul>
                                        </div>
                                        {/* <!-- end nav-collapse --> */}
                                    </nav>
                                    {/* <!-- end navbar --> */}
                                </div>
                            </div>
                            {/* <!-- end row --> */}
                        </div>
                        {/* <!-- end container-fluid --> */}
                    </header>
                    {/* <!-- end header --> */}
                </div>
        )
    };

}