import './App.css';
import {AddAccount, DeleteAccount, GetAccounts, GetMeterReadings} from './api/MeterReadingApi'
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
  const [formData, setFormData] = useState<MeterReading | any | undefined>({});

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

  const addAccount = () => {
    AddAccount(formData)
    .then(()=>{
      history.go(0);
    })    
    .catch(err => alert(err));
  }

  const hasMeterReadings = (accountId: number) => {
    return !meterReadings?.some((element)=> element.AccountId === accountId);
  }

  const handleInputChange = (event:any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value
    });
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
        <tr>
            <td><input name="accountId" value={formData.accountId} onChange={handleInputChange}/></td>
            <td><input name="FirstName" value={formData.FirstName} onChange={handleInputChange}/></td>
            <td><input name="LastName" value={formData.LastName} onChange={handleInputChange}/></td>
            <td><Button variant="success" onClick={() => addAccount()}>Create</Button></td>
          </tr>
      </tbody>
    </Table>: null          
  ) 
};
