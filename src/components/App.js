import ListRoute from './List_points/Route_trip';
import AddPoint from './Add_point/Add_point';
import {
  Switch,
  Route,
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
