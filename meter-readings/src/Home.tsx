import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Button,Alert,Container, Row, Col, ButtonGroup, Jumbotron} from 'react-bootstrap'
import {Accounts} from './Accounts'
import { MeterReadings } from './MeterReadings';
import { Account} from './Account';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { CsvUploader } from './CsvUploader';
import {ToastContainer, toast} from 'react-toastify'

export const Home : React.FC = () => {  

  const history = useHistory();

  function navigate(path:string) {
    history.push(path);
    history.go(0);
  }

  return(
  <Router>
    <Container>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      <Row>
        <Col>
        <Jumbotron>
          <h1>ABC Energy</h1>
          <p>
            Welcome to ABC energy, we're here to make uploading meter readings easy!
          </p>
        </Jumbotron>
        </Col>        
      </Row>
      <Row id="navbar">
        <Col>
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate("/")}>Home</Button>&nbsp;
            <Button variant="primary" onClick={() => navigate("/accounts")}>View accounts</Button>&nbsp;
            <Button variant="primary" onClick={() => navigate("/readings")}>View readings</Button>&nbsp;
            <Button variant="primary" onClick={() => navigate("/upload")}>Upload CSV</Button>&nbsp;
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
            <Route path ="/upload">
              <CsvUploader/>
            </Route>
          </Switch>          
        </Col>
        </Row>      
      </Container>
    </Router>   
  ) 
};
