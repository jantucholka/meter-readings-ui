import './App.css';
import {DeleteAccount, GetAccounts, GetMeterReadings} from './api/MeterReadingApi'
import React, { useState, useEffect } from 'react';
import {Account, MeterReading} from './api/Types'
import { AxiosResponse } from 'axios';
import {Table, Button} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

type AccountsProps = {
}

export const Accounts : React.FC<AccountsProps> = (props) => {

  const [accounts, setAccounts] = useState<Account[]|undefined>([]);
  const [meterReadings, setMeterReadings] = useState<MeterReading[]|undefined>([]);

  const history = useHistory();

  function navigate(path:string) {
    history.push(path);
    history.go(0);
  }
  
  useEffect(()=>{
    if (accounts?.length === 0)
    fetchAccounts();
    if (meterReadings?.length === 0)
    fetchMeterReadings();
  });

  useEffect(()=>{
  },[accounts, meterReadings]);

  const fetchMeterReadings = () => {
    GetMeterReadings()
      .then((response : AxiosResponse<MeterReading[]>) => {
          setMeterReadings(response.data);
      });
  }


  const fetchAccounts = () => {
    GetAccounts()
      .then((response : AxiosResponse<Account[]>) => {
          setAccounts(response.data);
      });
  }

  const deleteAccount = (accountId : number) => {
    DeleteAccount(accountId).then(()=>{
      fetchAccounts();
    });    
  }

  const hasMeterReadings = (accountId: number) => {
    return !meterReadings?.some((element)=> element.AccountId === accountId);
  }
  
  return( 
    accounts !== undefined ?
    <Table striped bordered hover>
      <thead>
        <th>Account Id</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {accounts.map((account : Account) => (
          <tr>
            <td>{account.AccountId}</td>
            <td>{account.FirstName}</td>
            <td>{account.LastName}</td>
            <td>                    
              <Button variant="primary" onClick={()=> navigate(`account/${account.AccountId}`)}>View</Button>&nbsp;
              {hasMeterReadings(account.AccountId) === true && <Button variant="danger" onClick={() => deleteAccount(account.AccountId)}>Remove</Button>}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>: null          
  ) 
};
