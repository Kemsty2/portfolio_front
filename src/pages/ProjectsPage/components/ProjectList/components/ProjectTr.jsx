import React from "react";
import { Link } from "react-router-dom";

class ProjectTr extends React.PureComponent {
  render() {
    return (
      <tr>
        <td><Link to="/projects/portfolio">Portfolio</Link></td>
        <td>En Bonne Voie</td>
        <td>30/01/2020</td>
        <td>Kemgne Moyo Steeve Aymard</td>
      </tr>
    );
  }
}

export default ProjectTr;
