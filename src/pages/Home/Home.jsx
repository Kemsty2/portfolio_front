import * as React from "react";
import { Redirect } from "react-router";

class Home extends React.Component {
  render() {
    if (!this.props.match.isExact) {
      return <Redirect to="/404" />;
    }
    return <div className="content"></div>;
  }
}

export default Home;
