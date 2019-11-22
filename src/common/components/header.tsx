import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

interface StateToProps {
    loginInfo?: any;
}
export class HearderComponent extends React.Component<StateToProps> {
    constructor(props: any) {
        super(props);
    }
    renderSwitch = () => {
        const { loginInfo = {} } = this.props;
        const { roleId = "" } = loginInfo;
        switch (roleId) {
            case "RAdmin":
                return <>
                    <li className="">
                        <NavLink to="/cashier">Cashier</NavLink>
                    </li>
                    <li className="">
                        <NavLink to="/barista">Barista</NavLink>
                    </li>
                    <li className="">
                        <NavLink to="/order">Order</NavLink>
                    </li>
                </>
                break;
            case "RCashier":
                return <li className="">
                    <NavLink to="/cashier">Cashier</NavLink>
                </li>
                break;
            case "RBarista":
                return <li className="">
                    <NavLink to="/barista">Barista</NavLink>
                </li>
                break;
            case "RWaiter":
                return <li className="">
                    <NavLink to="/order">Order</NavLink>
                </li>
                break;
            default:
                break;
        }
    }
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
                                            {this.renderSwitch()}

                                            <li><a href="#menu">Drink</a></li>
                                            <li><a href="#our_team">Food</a></li>
                                            <li><a href="#gallery">Discount</a></li>
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

export function mapStateToProps(state: any): StateToProps {
    return {
        loginInfo: state.globalState.loginInfo
    }
}

export const HearderForm = connect(mapStateToProps, null)(HearderComponent)