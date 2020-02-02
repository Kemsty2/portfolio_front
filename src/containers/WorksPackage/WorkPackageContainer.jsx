import React from "react";
import { RouteWithSubRoutes } from "../../../../../../../../utils/utilsComponents";
import { Switch } from "react-router";

class WorksPackageContainer extends React.Component {  
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

export default WorksPackageContainer;
