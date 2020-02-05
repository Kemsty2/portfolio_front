import React from "react";
import { Link } from "react-router-dom";

class MemberTr extends React.PureComponent {
  render() {
    return (
      <tr>
        <td><Link to="/projects/1/members/1">WDTN4590</Link></td>
        <td><Link to="/projects/1/members/1">Kemgne Steeve</Link></td>
        <td><Link to="/projects/1/members/1">Projet</Link></td>
        <td>22/10/2013</td>
        <td>Kemgne Steeve</td>
      </tr>
    );
  }
}

export default MemberTr;
