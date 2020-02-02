import React from "react";
import { Link } from "react-router-dom";

class MemberTr extends React.PureComponent {
  render() {
    return (
      <tr>
        <td><Link to="/projects/1/members/1">Kemgne Moyo</Link></td>
        <td><Link to="/projects/1/members/1">Steeve Aymard</Link></td>
        <td><Link to="/projects/1/members/1">steeve.kemgne@orange.com</Link></td>
        <td>Project Owner</td>
        <td>Actif</td>
      </tr>
    );
  }
}

export default MemberTr;
