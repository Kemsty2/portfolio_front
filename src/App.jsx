import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import NotFound from "./pages/NotFound/NotFound";
import { createBrowserHistory } from 'history';
import Loadable from 'react-loadable';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const HomePage = Loadable({
  loader: () => import('./pages/HomePage'),
  loading
});

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={HomePage} />        
        <Route component={NotFound} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default App;
