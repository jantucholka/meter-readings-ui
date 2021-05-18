import './App.css';
import {Alert,Container, Row, Col} from 'react-bootstrap'
import {Accounts} from './Accounts'

type AppProps = {
}

export const App : React.FC<AppProps> = (props) => {  
  
  return(
    <Container>
      <Row>
        <Col><Alert variant="success">Welcome to meter readings management page</Alert></Col>
      </Row>
      <Row>
        <Col><Alert variant="secondary">Accounts</Alert></Col>
        <Col><Alert variant="secondary">Readings</Alert></Col>
      </Row>
      <Row>
        <Col>
        <Accounts/>
        </Col>
        <Col></Col>
      </Row>
    </Container>   
  ) 
};
