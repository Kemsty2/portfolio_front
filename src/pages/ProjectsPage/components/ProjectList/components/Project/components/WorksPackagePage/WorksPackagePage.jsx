import React from "react";
import { RouteWithSubRoutes } from "../../../../../../../../utils/utilsComponents";
import { Switch } from "react-router";

class WorksPackagePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        {this.props.routes.map((prop, key) => (
          <RouteWithSubRoutes key={key} {...prop} />
        ))}
      </Switch>
    );
  }
}

export default WorksPackagePage;
