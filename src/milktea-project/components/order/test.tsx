import * as React from 'react';
import { connect } from 'react-redux';
import { tableSelector } from '../../redux/selector/TableSelector';
import { Table } from '../../model/Table';
import store from '../../../common/redux/store';
import { compose } from 'redux';

interface StateToProps {
    tables?: Table[];
}
export class TestComponent extends React.Component<StateToProps> {
    
    public render(): React.ReactNode {
        const { tables } = this.props;
        // const list = store.getState();
        console.log('props', this.props);
        const result = tables && tables.map((table, idx) => {
            // return <button key={idx} type="button" className="order-btn-image" >
            //     Table {table.tableId}
            // </button>
            return <p key={idx}>hello test {idx}</p>
        });
        return (
            <div>
                <div className="table-container">
                    {result}
                </div>
           </div>
        )
    };
}

export function mapStateToProps(state: any): StateToProps {
    return {
        tables: tableSelector.selectAllTable(state),
        // tables: state.globalState.tables
    }
};


const withConnect = connect(mapStateToProps, null);

export const TestForm = compose(withConnect)(TestComponent);