import './App.css';
import { GetAccount, GetMeterReadings } from './api/MeterReadingApi'
import React, { useState, useEffect } from 'react';
import { Account as AccountModel, MeterReading } from './api/Types'
import { AxiosResponse } from 'axios';
import { Container, Row, Col, Image, Card} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { MeterReadings } from './MeterReadings';

type AccountParams = {
  accountId: string | undefined
}

export const Account : React.FC<any> = () => {

  const [account, setAccount] = useState<AccountModel|undefined>(undefined);
  const [meterReadings, setMeterReadings] = useState<MeterReading[]|undefined>([]);
  
  let { accountId } = useParams<AccountParams>();

  useEffect(()=>{
    if (account === undefined)
    fetchAccount(parseInt(accountId as string));
    if (meterReadings?.length === 0)
    fetchMeterReadings();
  });

  useEffect(()=>{
  },[account, meterReadings]);

  const fetchMeterReadings = () => {
    GetMeterReadings()
      .then((response : AxiosResponse<MeterReading[]>) => {
          setMeterReadings(response.data);
      });
  }

  const fetchAccount = (accountId: number) => {
    GetAccount(accountId)
      .then((response : AxiosResponse<AccountModel>) => {
          setAccount(response.data);
      });
  }
  
  return( account !== undefined ?
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>{account.FirstName} {account.LastName}</Card.Title>
              <Card.Text>
                Account Id: {account.AccountId}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col><MeterReadings accountId={parseInt(accountId as string)}/></Col>
      </Row>
    </Container> : null          
  ) 
};