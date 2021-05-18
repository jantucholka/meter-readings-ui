import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {Account} from './Types'

const apiHost = "http://localhost:57674/api";

export function GetAccounts (){
    return Axios.get<Account[]>(
        apiHost + '/Account'
    );
}

export function DeleteAccount (accountId: string){
    return Axios.delete(
        `${apiHost}/Account/${accountId}`
    );
}