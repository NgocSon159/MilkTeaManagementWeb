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
        const bgcl ={
            backgroundColor: '#FFFFFF'
        };
        const bgclOrange ={
            backgroundColor: '#FFFFFF'
        }

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
                <div className="panel-body text-center" aria-hidden="true" >
                    <table className="table" style={bgcl}>
                        <thead>
                                <tr className="panel-heading">
                                   <th style={{width: "40%"}}> Order No. </th>
                                   <th style={{width: "30%"}}> Table </th>
                                   <th style={{width: "30%"}}> Status </th>
                                </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">001001</th>
                                <th>1</th>
                                <th>Ordered <button>Process</button></th>
                                 {/*if status Order = Ordered => <th> Status <button> Process </button> </th>*/}
                                 {/*   else <th> Status </th>*/}
                            </tr>
                            <tr>
                                <th scope="row">001002</th>
                                <th>2</th>
                                <th>Processing </th>
                            </tr>
                            <tr>
                                <table style={{width: "250%"}}>
                                    <thead>
                                    <tr className="panel-heading">
                                        <td style={{width: "5%"}} > No: </td>
                                        <td style={{width: "50%"}}> Name: </td>
                                        <td style={{width: "10%"}}> Size: </td>
                                        <td style={{width: "20%"}}> Quantity: </td>
                                        <td style={{width: "40%"}}> Status </td>
                                        <td style={{width: "40%"}}> Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{width: "5%"}} > 1 </td>
                                            <td style={{width: "50%"}}> Cafe Sữa </td>
                                            <td style={{width: "10%"}}> Medium </td>
                                            <td style={{width: "20%"}}> 3 </td>
                                            <td style={{width: "40%"}}> Processing </td>
                                            <td style={{width: "40%"}}> <button>Done</button></td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "5%"}} scope="row"> 2 </td>
                                            <td style={{width: "50%"}}> Trà Sữa </td>
                                            <td style={{width: "10%"}}> Large </td>
                                            <td style={{width: "20%"}}> 2 </td>
                                            <td style={{width: "40%"}}> Processing </td>
                                            <td style={{width: "40%"}}> <button>Done</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>
                            <tr>
                                <th scope="row">001003</th>
                                <th>4</th>
                                <th>Ordered <button>Process</button> </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
        )
    };
}

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export const KitchenHomeComponent = compose(withConnect)(KitchenHomeComponent);