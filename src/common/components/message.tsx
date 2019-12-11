import * as React from 'react';
import { connect } from 'react-redux';
import { GetLoginInfo, SetFormInfor } from '../../milktea-project/redux/action/actions';

interface RouteProps {
    history?: any;
    match?: any;
    location?: any;
}
export class MessageComponent extends React.Component<RouteProps> {
    constructor(props: any){
        super(props);
    }
    back = (e: any) => {
        e.preventDefault();
        const {history} = this.props;
        history.goBack();
    }
    public render(): React.ReactNode {
        return (
        <div className="" style={{textAlign: "center", marginTop: "50px"}} >
            <h1 style={{color: "red"}}>NOT PERMISSION !</h1>
            <h3 style={{color: "white"}}>you can not access this page</h3>
            {/* <button style={{marginTop:"20px"}} onClick={(e) => this.back(e)}> Back</button> */}
        </div>
        )
    };
}


