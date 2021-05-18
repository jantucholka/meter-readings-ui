import './App.css';
import {AddMeterReading, DeleteMeterReading, GetMeterReadings} from './api/MeterReadingApi'
import React, { useState, useEffect } from 'react';
import {MeterReading} from './api/Types'
import { AxiosResponse } from 'axios';
import {Table, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

type MeterReadingProps = {
  accountId?: number | undefined
}

export const MeterReadings : React.FC<MeterReadingProps> = (props) => {

  const history = useHistory();
  const [meterReadings, setMeterReadings] = useState<MeterReading[]|undefined>([]);
  const [formData, setFormData] = useState<MeterReading | any | undefined>({});
  
  useEffect(()=>{
    if (meterReadings?.length === 0)
    fetchMeterReadings();
    if (formData.accountId === undefined && props.accountId !== undefined){
      setFormData({...formData, accountId: props.accountId})
    }
    if (formData.MeterReadingDateTime === undefined){
      setFormData({...formData, MeterReadingDateTime: getCurrentTimestamp()})
    }
  });

  useEffect(()=>{
  },[meterReadings]);

  const fetchMeterReadings = () => {
    GetMeterReadings()
      .then((response : AxiosResponse<MeterReading[]>) => {
        if (props.accountId !== undefined){
          setMeterReadings(response.data.filter((element) => element.AccountId == props.accountId));
        }
        else{
          setMeterReadings(response.data);
        }
      });
  }

  const deleteMeterReading = (id : string) =>{
    DeleteMeterReading(id).then(()=>{
      fetchMeterReadings();
    });    
  }
  
  const addMeterReading = () => {
    AddMeterReading(formData)
    .then(()=>{
      setFormData({});
      history.go(0);
    })    
    .catch(err => alert(err));
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

  const getCurrentTimestamp = () =>{
    var now = new Date();
    let result = `${now.getDay()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`
    return result;
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
        <tr>
          <td>{props.accountId ? <span>{props.accountId}</span>:<input name="accountId" value={formData.accountId} onChange={handleInputChange}/>}</td>
          <td><input name="meterReadingDateTime" value={formData.MeterReadingDateTime} onChange={handleInputChange}/></td>
          <td><input name="meterReadValue" value={formData.meterReadValue} onChange={handleInputChange}/></td>
          <td><Button variant="success" onClick={() => addMeterReading()}>Create</Button></td>
        </tr>
      </tbody>
    </Table>: null          
  ) 
};