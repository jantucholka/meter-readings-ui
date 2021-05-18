import './App.css';
import {DeleteMeterReading, GetMeterReadings} from './api/MeterReadingApi'
import React, { useState, useEffect } from 'react';
import {MeterReading} from './api/Types'
import { AxiosResponse } from 'axios';
import {Table, Button} from 'react-bootstrap'

type MeterReadingProps = {
}

export const MeterReadings : React.FC<MeterReadingProps> = (props) => {

  const [meterReadings, setMeterReadings] = useState<MeterReading[]|undefined>([]);
  
  useEffect(()=>{
    if (meterReadings?.length === 0)
    fetchMeterReadings();
  });

  useEffect(()=>{
  },[meterReadings]);


  const fetchMeterReadings = () => {
    GetMeterReadings()
      .then((response : AxiosResponse<MeterReading[]>) => {
          setMeterReadings(response.data);
      });
  }

  const deleteMeterReading = (id : string) =>{
    DeleteMeterReading(id).then(()=>{
      fetchMeterReadings();
    });    
  }
  
  return( 
          meterReadings !== undefined ?
          <Table striped bordered hover>
            <thead>
              <th>Account Id</th>
              <th>Date</th>
              <th>Reading</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {meterReadings.map((meterReading : MeterReading) => (
                <tr>
                  <td>{meterReading.AccountId}</td>
                  <td>{meterReading.MeterReadingDateTime}</td>
                  <td>{meterReading.MeterReadValue}</td>
                  <td><Button variant="danger" onClick={() => deleteMeterReading(meterReading.Id)}>Remove</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>: null          
  ) 
};
