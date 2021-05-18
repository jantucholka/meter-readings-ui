import './App.css';
import { Button,Container, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";
import { UploadMeterReadings } from './api/MeterReadingApi';

export const CsvUploader : React.FC = () => {  

  const history = useHistory();
  const [fileToUpload, setFileToUpload] = useState<Blob | null | undefined>(undefined);

  const handleFileSelection = (event:any) =>{
    setFileToUpload(event.target.files[0]);
  }

  const uploadFile = () => {
    let data = new FormData();

    data.append("meterReadings", fileToUpload as Blob);

    UploadMeterReadings(data)
    .then(()=>{
      toast.success('Upload successful', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setTimeout(() => {
        navigate("/readings");
      }, 2000);      
    });
  }

  function navigate(path:string) {
    history.push(path);
    history.go(0);
  }

  return(
    <Container>      
      <Row>
        <Col>
          <Form>
            <input
            type="file"
            name="meterReadingsCsv"
            onChange={handleFileSelection}/>
            <Button onClick={() => uploadFile()}>Upload</Button>
          </Form>
          </Col>        
      </Row>        
    </Container>
  ) 
};
