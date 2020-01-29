import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import {store} from './redux/store';
import HomePage from './pages/HomePage';
import {Provider} from 'react-redux';
import NotFound from './pages/NotFound/NotFound';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>                
        <Route exact= {false} path="/home" render={props => <HomePage {...props} />} />      
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>        
        {/* <Route exact={true} path="/login" render={props => <Login {...props} />} /> */}
        <Route component={NotFound} />
      </Switch>
    </Provider>
  </BrowserRouter>
)

export default App;
