import logo from './logo.svg';
import './App.css';
import ListRoute from './route_trip';
import AddPoint from './add_point';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/'>
            <ListRoute/>
          </Route>
          <Route path='/add_point'>
            <AddPoint/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
