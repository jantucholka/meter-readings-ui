import Axios, { AxiosResponse } from 'axios'
import {Account, MeterReading} from './Types'

const apiHost = "http://localhost:57674/api";

export function GetAccounts (){
    return Axios.get<Account[]>(
        apiHost + '/Account'
    );
}

export function GetAccount (accountId : number){
    return Axios.get<Account>(
        `${apiHost}/Account/${accountId}`
    );
}

export function DeleteAccount (accountId: number){
    return Axios.delete(
        `${apiHost}/Account/${accountId}`
    );
}

export function GetMeterReadings (){
    return Axios.get<MeterReading[]>(
        apiHost + '/Reading'
    );
}

export function DeleteMeterReading (id: string){
    return Axios.delete(
        `${apiHost}/Reading/${id}`
    );
}

export function UploadMeterReadings(data: FormData): Promise<AxiosResponse>{
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }
    return Axios.post(
        `${apiHost}/meter-reading-uploads`,
        data,
        config
    )
}