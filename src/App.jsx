import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { store } from "./redux/store";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import NotFound from "./pages/NotFound/NotFound";

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
