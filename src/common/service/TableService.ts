import { Table } from './../../milktea-project/model/Table';
import { Observable } from 'rxjs';

export interface TableService {
    getAllTableInfor(): Observable<any>;
}