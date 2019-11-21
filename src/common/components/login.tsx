import * as React from 'react';
import { connect } from 'react-redux';
import { GetLoginInfo } from '../../milktea-project/redux/action/actions';
import { ReduxState } from '../../milktea-project/redux/model/ReduxState';

// interface StateToProps {
//     loginInfo?: any
// }
interface DispatchToProps {
    getLoginInfor: (data: any) => void;
}
export class LoginComponent extends React.Component<DispatchToProps> {
    constructor(props: any) {
        super(props);
    }
    state = {
        username: "",
        password: ""
    };

    handleOnchange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleLogin = () => {
        const { username, password } = this.state;
        this.props.getLoginInfor({ username, password });
    }

    public render(): React.ReactNode {
        const { username, password } = this.state;
        console.log('username', username);
        console.log('password', password);
        return (
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

                {/* <label>abc</label>
                <input type="text" name="" id="" className="form-control" placeholder="" aria-describedby="helpId" />
                <small id="helpId" className="text-muted">Help text</small> */}
            </div>
        )
    };
}

// export function mapStateToProps(state: ReduxState): StateToProps {
//     return {
//         // tables: tableSelector.selectAllTable(state),
//     }
// };

export function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getLoginInfor: (data: any) => dispatch(GetLoginInfo(data))
    };
}


export const LoginForm = connect(null, mapDispatchToProps)(LoginComponent);