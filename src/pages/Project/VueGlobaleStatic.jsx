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
import { Link, Redirect } from "react-router-dom";
import DefaultLoading from "../../components/DefaultLoading";
import { isEmpty } from "../../utils/utilsFunction";

class VueGlobaleStatic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      listOfMembers: [],
      redirect: false
    };
  }

  async componentDidMount() {
    try {
      const { idProject } = this.props.match.params;
      let listOfMembers = [];
      
      this.setState({
        isLoading: true
      });
      await this.props.init({ idProject }, this.props.token);

      listOfMembers = await this.props.getMembers(idProject, this.props.token);
      this.setState({
        listOfMembers: listOfMembers,
        isLoading: false
      });
    } catch (err) {
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    const { project } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/404" />;
    }
    const members = this.state.listOfMembers.map((member, key) => {
      return (
        <tr key={key}>
          <td>{member.nom}</td>
          <td className="text-capitalize">{member.type}</td>
        </tr>
      );
    });
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
                          src={
                            "http://microsvc.orange.cm/api/InfoEmployee/photo/v0/" +
                            project.chefProjetCuid
                          }
                          className="card-img align-self-center"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Chef Projet</h5>
                          <p className="card-text">
                            <span className="d-block">
                              <b>Nom</b> :{" "}
                              {!isEmpty(project) ? project.chefProjetName : ""}
                            </span>
                            <span className="d-block">
                              <b>Cuid</b> :{" "}
                              {!isEmpty(project) ? project.chefProjetCuid : ""}
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
                    <CardTitle tag="h4">
                      {!isEmpty(project) ? project.objet : ""}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <hr />
                    <div className="text-justify mt-2">
                      <h4>Périmètre du projet</h4>
                      <p className="project_statut_desc">
                        {!isEmpty(project) ? project.perimetre : ""}
                      </p>
                    </div>
                    <hr />
                    <div className="text-justify mt-2">
                      <h4>Objectifs du projet</h4>
                      <p className="project_statut_desc">
                        {!isEmpty(project) ? project.objectifs : ""}
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
                        {members.length <= 0 ? (
                          <tr>
                            <td colSpan="2" className="text-center">
                              Aucun Membre Disponible
                            </td>
                          </tr>
                        ) : (
                          members
                        )}
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
