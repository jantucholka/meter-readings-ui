import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home } from './Home';

export const App : React.FC = () => {  
  return(
    <Router>          
      <Switch>
        <Route path ="/">
          <Home/>
        </Route>              
      </Switch>
    </Router>   
  ) 
};
