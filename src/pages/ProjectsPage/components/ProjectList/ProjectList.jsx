import React from "react";
import {Row, Col, Card, CardHeader, CardTitle, CardBody, Table, Button} from 'reactstrap';
import ProjectTr from "./components/ProjectTr";
import { Link } from "react-router-dom";

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
  }

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
                  <thead className="text-primary">
                    <tr>
                      <th>Nom</th>
                      <th>Statut</th>
                      <th>Crée Le</th>
                      <th>Responsable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ProjectTr />   
                    <ProjectTr />   
                    <ProjectTr />   
                    <ProjectTr />   
                    <ProjectTr />                  
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

export default ProjectList;
