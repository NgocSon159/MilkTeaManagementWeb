import * as React from 'react';
import { connect } from 'react-redux';
import { GetLoginInfo, SetFormInfor } from '../../milktea-project/redux/action/actions';

interface StateToProps {
    loginInfo?: any;
    history?: any;
}
interface DispatchToProps {
    getLoginInfor: () => void;
    setFormInfor: (data: any) => void;
}
export class LoginComponent extends React.Component<DispatchToProps & StateToProps> {
    constructor(props: any) {
        super(props);
    }
    state = {
        username: "",
        password: "",
        isLogin: false
    };

    handleOnchange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleLogin = () => {
        const { username, password } = this.state;
        this.props.setFormInfor({ userName: username, password });
        this.props.getLoginInfor(); //login
        this.setState({ isLogin: true });
    }

    handleRedirect = () => {
        const { history } = this.props;
        const { loginInfo = {} } = this.props;
        const { roleId } = loginInfo;
        switch (roleId) {
            case "RAdmin":
                history.push("/order");
                break;
            case "RCashier":
                history.push("/cashier");
                break;
            case "RBarista":
                history.push("/barista");
                break;
            case "RWaiter":
                history.push("/order");
                break;
            default:
                break;
        }
    }
    public render(): React.ReactNode {
        const { isLogin } = this.state;
        return (<>
            {
                (isLogin) ? this.handleRedirect() :
                    <div className="login-form" >
                        <h3>Login Form</h3>
                        <div className="group-item">
                            <span className="username">User name:</span>
                            <div>
                                <input type="text" name="username" onChange={this.handleOnchange} />
                            </div>
                        </div>
                        <div className="group-item">
                            <span className="password">Password:</span>
                            <div >
                                <input name="password" type="text" onChange={this.handleOnchange} />
                            </div>
                        </div>
                        <div className="group-item">
                            <button className="login-button" onClick={this.handleLogin}>login</button>
                        </div>
                    </div>
            }
        </>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    return {
        loginInfo: state.globalState.loginInfo
    }
}

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getLoginInfor: () => dispatch(GetLoginInfo()), //login
        setFormInfor: (data: any) => dispatch(SetFormInfor(data))
    };
}


export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);