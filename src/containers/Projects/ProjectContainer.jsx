import React from "react";
import { Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../../utils/utilsComponents";

class ProjectsContainer extends React.Component {  

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

export default ProjectsContainer;
