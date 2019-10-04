import axios from 'axios';
import * as Config from '../config';

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export const ApiCall= (method: Method, endpoint: string, data: any) => {
    return axios.request({
        method: method,
        url: `${Config.commonUrl}/${endpoint}`,
        data: data
    });
}