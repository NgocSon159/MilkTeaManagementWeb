import * as React from 'react';
import { Table } from '../../model/Table';
import { tableSelector } from '../../redux/selector/TableSelector';
import { ReduxState } from '../../redux/model/ReduxState';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { GetTableListAction, AddTableListAction } from '../../redux/action/actions';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ApiCall } from '../../../common/utils/callApi';

export class KitchenHomeComponent extends React.Component {

    public render(): React.ReactNode {
        let tables: any = [{id: '1', statusTable: 'Empty'} , {id: '2', statusTable: 'Empty'}, {id: '3', statusTable: 'Full'}];
        const result = tables && tables.map(() => {
            const footerClass = tables.statusTable === 'Empty' ? 'footer-table-empty' : 'footer-table-full';
            const iconClass = tables.statusTable === 'Empty' ? 'fa  fa-smile-o' : 'fa  fa-frown-o';
            return <div className="small-box custom-table" style={{height:"120px", width:"120px" }}>
                <div className="inner">
                    <h3>{tables.id}</h3>
                </div>
                <div style={{borderBottomRightRadius: "25px", borderBottomLeftRadius: "25px"}} className={`small-box-footer ${footerClass}`}>{tables.statusTable === 'Empty' ? 'Empty' : 'Full'} <i className={iconClass}></i></div>
            </div>
        });
        return (
                <div className="table-container">
                    <table style={{width: "100%"}}>
                        <tr>
                           <th style={{width: "40%"}}> Order No. </th>
                           <th style={{width: "30%"}}> Table </th>
                           <th style={{width: "30%"}}> Status </th>
                        </tr>
                        <tr>
                            <th>001001</th>
                            <th>1</th>
                            <th>Ordered <button>Process</button> </th>
                             {/*if status Order = Ordered => <th> Status <button> Process </button> </th>*/}
                             {/*   else <th> Status </th>*/}
                        </tr>
                        <tr>
                            <th>001002</th>
                            <th>2</th>
                            <th>Processing </th>
                        </tr>
                        <tr>
                            <table style={{width: "250%"}}>
                                <div>
                                    <td style={{width: "5%"}}> #No: </td>
                                    <td style={{width: "50%"}}> #Name: </td>
                                    <td style={{width: "10%"}}> #Size: </td>
                                    <td style={{width: "20%"}}> #Quantity: </td>
                                    <td style={{width: "40%"}}> #Status </td>
                                    <td style={{width: "40%"}}> <button>Done</button></td>
                                </div>
                            </table>
                        </tr>
                        <tr>
                            <th>001003</th>
                            <th>4</th>
                            <th>Ordered <button>Process</button> </th>
                        </tr>
                    </table>
                </div>
        )
    };
}

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export const KitchenHomeComponent = compose(withConnect)(KitchenHomeComponent);