import './App.css';
import {Button,Alert,Container, Row, Col, ButtonGroup} from 'react-bootstrap'
import {Accounts} from './Accounts'
import { MeterReadings } from './MeterReadings';
import { Account} from './Account';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

export const Home : React.FC = () => {  

  const history = useHistory();

  function navigate(path:string) {
    history.push(path);
    history.go(0);
  }

  return(
  <Router>
    <Container>
      <Row>
        <Col><Alert variant="success">Welcome to meter readings management page</Alert></Col>        
      </Row>
      <Row>
        <Col>
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate("/")}>Home</Button>&nbsp;
            <Button variant="primary" onClick={() => navigate("/accounts")}>View accounts</Button>&nbsp;
            <Button variant="primary" onClick={() => navigate("/readings")}>View readings</Button>&nbsp;
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>          
          <Switch>
            <Route path ="/accounts">
              <Accounts/>
            </Route>
            <Route path ="/readings">
              <MeterReadings/>
            </Route>
            <Route path ="/account/:accountId">
              <Account/>
            </Route>
          </Switch>          
        </Col>
        </Row>      
      </Container>
    </Router>   
  ) 
};
