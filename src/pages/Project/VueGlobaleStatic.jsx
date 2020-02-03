import React from "react";
import {
  Card,
  Row,
  Col,
  CardHeader,
  CardTitle,
  CardBody,  
  Table,  
} from "reactstrap";
import Select from "react-select";
import { colourStyles } from "../../utils/utilsSelect";
import { Link } from "react-router-dom";

class VueGlobaleStatic extends React.Component {  

  componentDidMount(){
    const {idProject} = this.props.match.params;
    console.log("idProject", idProject);
  }

  render() {
    const options = [
      { value: "3", label: "Sur la Bonne Voie", color: "#36B37E" },
      { value: "1", label: "Sur la Mauvaise Voie", color: "#FF5630" },
      { value: "2", label: "A Risque", color: "#FF8B00" },
      { value: "0", label: "Non Défini", color: "#666666" }
    ];
    return (
      <div className="content">
        <Row>
          <Col md="6">
            <Card className="global-card">
              <CardHeader>
                <CardTitle tag="h4">Etat du Projet</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="row">
                  <Select
                    options={options}
                    styles={colourStyles}
                    className="col-md-8 text-capitalize"
                  />
                </div>
                <hr />
                <div className="text-justify mt-2">
                  <h4>Description de l'état</h4>
                  <p className="project_statut_desc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Vel quo non dolorem voluptatum repudiandae dolore at
                    molestias
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card className="global-card">
              <CardHeader>
                <CardTitle tag="h5" className="text-capitalize">
                  Membres
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>Rôles</th>
                      <th>Noms et Prénoms</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Propriétaire Projet</td>
                      <td className="text-capitalize">
                        Kemgne Moyo Steeve Aymard
                      </td>
                    </tr>
                    <tr>
                      <td>Membre</td>
                      <td className="text-capitalize">Kouayep Paterne</td>
                    </tr>
                    <tr>
                      <td>Membre</td>
                      <td className="text-capitalize">Kouayep Paterne</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-flex justify-content-start">
                  <Link
                    to="/projects/1/members/new"
                    className="btn btn-success mr-3"
                  >
                    <i className="fa fa-plus mr-1"></i>
                    <span>Membre </span>
                  </Link>
                  <Link
                    to="/projects/1/members/"
                    className="btn btn-outline-primary"
                  >
                    <i className="fa fa-users mr-2"></i>
                    <span>Afficher tous les membres</span>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4" className="text-capitilize">
                  Plan du Projet
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table hover bordered>
                  <thead className="text-primary text-capitilize">
                    <tr>
                      <th>Type</th>
                      <th>Id</th>
                      <th>Sujet</th>
                      <th>Statut</th>
                      <th>Assigné A</th>
                    </tr>
                  </thead>
                  <tbody>
                    <WorkTr />
                    <WorkTr />
                    <WorkTr />
                    <WorkTr />
                    <WorkTr />
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

class WorkTr extends React.Component {
  render() {
    return (
      <tr>
        <td className="text-capitilize">Phase</td>
        <td>36</td>
        <td>Develop v1.0</td>
        <td>In Progress</td>
        <td>Kemgne Moyo Steeve Aymard</td>
      </tr>
    );
  }
}

export default VueGlobaleStatic;
