import * as React from 'react';

export class HearderComponent extends React.Component {
    state = {
        counter: 0
    };
    increase = () => {
        let {counter} = this.state;
        this.setState({
            counter: ++counter
        });
    }
    decrease = () => {
        let {counter} = this.state;
        this.setState({
            counter: --counter
        });
    }
    public render(): React.ReactNode {
        return (
            <div className="counter">
                <span onClick={this.decrease}><i /></span><input readOnly value={this.state.counter} /><span onClick={this.increase}><i /></span>
            </div>
        )
    };

}