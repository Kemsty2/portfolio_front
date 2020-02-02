import React from "react";
import {Row, Col, Card, CardHeader, CardTitle, CardBody, Table} from 'reactstrap';
import MemberTr from "./MemberTr";
import { Link } from "react-router-dom";

class MembersList extends React.Component {  

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between bg-black">
                <CardTitle tag="h4">Projets</CardTitle>
                <Link to="/projects/new" className="btn btn-primary d-flex justify-content-between">
                  <i className="nc-icon nc-simple-add"></i>
                  <span>Créer Projet</span>
                </Link>
              </CardHeader>
              <CardBody>
                <Table hover bordered>
                  <thead className="text-primary text-capitilize">
                    <tr>
                      <th>Nom de Famille</th>
                      <th>Prénom</th>
                      <th>Courriel</th>
                      <th>Rôles</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <MemberTr />   
                    <MemberTr />   
                    <MemberTr />   
                    <MemberTr />   
                    <MemberTr />                  
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MembersList;
