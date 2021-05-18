import './App.css';
import {DeleteAccount, GetAccounts} from './api/MeterReadingApi'
import React, { useState, useEffect } from 'react';
import {Account} from './api/Types'
import { AxiosResponse } from 'axios';
import {Table, Button} from 'react-bootstrap'

type AccountProps = {
}

export const Accounts : React.FC<AccountProps> = (props) => {

  const [accounts, setAccounts] = useState<Account[]|undefined>([]);
  
  useEffect(()=>{
    if (accounts?.length === 0)
    fetchAccounts();
  });

  useEffect(()=>{
  },[accounts]);


  const fetchAccounts = () => {
    GetAccounts()
      .then((response : AxiosResponse<Account[]>) => {
          setAccounts(response.data);
      });
  }

  const deleteAccount = (accountId : number) =>{
    DeleteAccount(accountId).then(()=>{
      fetchAccounts();
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
                    <Button variant="danger" onClick={() => deleteAccount(account.AccountId)}>Remove</Button>&nbsp;
                    <Button variant="primary" onClick={() => alert('Not implemented yet!')}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>: null          
  ) 
};
