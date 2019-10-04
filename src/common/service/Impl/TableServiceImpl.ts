import { AuthorInfo } from './../../../milktea-project/model/Author';
import { TableService } from './../TableService';
import { Observable } from 'rxjs';
import { Table } from '../../../milktea-project/model/Table';
import * as config from '../../config';
import { BaseRequest } from '../../formater/BaseRequest';
import axios from 'axios';

export class TableServiceImpl implements TableService {
    getAllTableInfor(): Observable<any> {
        debugger;
        const url = config.commonUrl + '/table';
        let result: any = [];
        axios.get(url).then(res => {
            result = res.data
        });
        return result;
    }
}