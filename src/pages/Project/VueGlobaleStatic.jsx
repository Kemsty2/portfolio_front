import React from "react";
import {
  Card,
  Row,
  Col,
  CardHeader,
  CardTitle,
  CardBody,
  Table
} from "reactstrap";
import Select from "react-select";
import { colourStyles } from "../../utils/utilsSelect";
import { Link } from "react-router-dom";
import DefaultLoading from "../../components/DefaultLoading";
import logo from "../../assets/img/ORANGE_LOGO_rgb.jpg";

class VueGlobaleStatic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  async componentDidMount() {
    const { idProject } = this.props.match.params;
    console.log("idProject", idProject);
    this.setState({
      isLoading: true
    });
    await this.props.init({ idProject }, this.props.token);
    this.setState({
      isLoading: false
    });
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
        {this.state.isLoading ? (
          <DefaultLoading />
        ) : (
          <>
            {" "}
            <Row>
              <Col md="8">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h5">Date Jalons</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table hover bordered>
                      <thead className="text-primary text-capitilize">
                        <tr>
                          <th>T-1</th>
                          <th>T0</th>
                          <th>T1</th>
                          <th>T2</th>
                          <th>T3</th>
                          <th>T4</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>13 Fev 2013</td>
                          <td>30 Juil 2013</td>
                          <td>30 Juil 2013</td>
                          <td>30 Mai 2013</td>
                          <td>30 Juil 2014</td>
                          <td>30 Oct 2014</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <div
                  className="card"
                  style={{ maxWidth: "540px", minHeight: "201px" }}
                >
                  <div className="card-body">
                    <div className="row no-gutters">
                      <div className="col-md-4 align-items-center">
                        <img
                          src="http://microsvc.orange.cm/api/InfoEmployee/photo/v0/WDTN4590"
                          className="card-img align-self-center"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Chef Projet</h5>
                          <p className="card-text">
                            <span className="d-block">
                              <b>Nom</b> : Kemgne Moyo Steeve Aymard
                            </span>
                            <span className="d-block">
                              <b>Cuid</b> : WDTN4590
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Card className="global-card">
                  <CardHeader>
                    <CardTitle tag="h4">Objet du Projet</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <hr />
                    <div className="text-justify mt-2">
                      <h4>Périmètre du projet</h4>
                      <p className="project_statut_desc">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                    <hr />
                    <div className="text-justify mt-2">
                      <h4>Objectifs du projet</h4>
                      <p className="project_statut_desc">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit.
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
                        to={`/projects/${this.props.project.id}/members?show_add_members=true`}
                        className="btn btn-success mr-3"
                      >
                        <i className="fa fa-plus mr-1"></i>
                        <span>Membre </span>
                      </Link>
                      <Link
                        to={`/projects/${this.props.project.id}/members/`}
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
            <Row className="mb-3">
              <Col md="6">
                <Card className="h-100">
                  <CardHeader>
                    <CardTitle tag="h5" className="text-capitalize">
                      Risques
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <tbody>
                        <tr>
                          <td>Risque 1</td>
                        </tr>
                        <tr>
                          <td>Risque 2</td>
                        </tr>
                        <tr>
                          <td>Risque 3</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <Card className="h-100">
                  <CardHeader>
                    <CardTitle tag="h5" className="text-capitalize">
                      Problèmes
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table>
                      <thead>
                        <tr>
                          <th>Problèmes rencontrés</th>
                          <th>Réalisations</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1.</td>
                          <td>1.</td>
                        </tr>
                        <tr>
                          <td>1.</td>
                          <td>1.</td>
                        </tr>
                        <tr>
                          <td>1.</td>
                          <td>1.</td>
                        </tr>
                      </tbody>
                    </Table>
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
          </>
        )}
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
