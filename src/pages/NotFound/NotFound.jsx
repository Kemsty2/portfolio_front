import * as React from "react";

import './style.css';
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const NotFound = props => {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <Link to="/" className="btn"><i className="fa fa-arrow-left mr-2"></i>Back To Home</Link>        
      </div>
    </div>
  );
};

export default NotFound;
