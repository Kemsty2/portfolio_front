import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import CrudTable from "../../components/CrudTable";

const columns = [
  { nom: "objet", title: "Nom", linkTo:"/projects" },
  { nom: "type", title: "Type Projet" },
  { nom: "createdAt", title: "Crée Le", date: true },
  { nom: "updatedAt", title: "Dernière Mise à Jour", date: true},
  { nom: "chefProjetCuid", title: "Chef Projet", getNameFromApi: true }
];

class ProjectListStatic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOpen: false
    };
  }

  setFilterOpen = filterOpen => {
    this.setState({
      filterOpen
    });
  };

  toggle = e => {
    e.preventDefault();

    this.setFilterOpen(!this.state.filterOpen);
  };

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between bg-black">
                <CardTitle tag="h4">Projets</CardTitle>
                <div>
                  <Link to="/projects/new" className="btn btn-success">
                    <i className="fa fa-plus mr-1 d-inline"></i>
                    <span>Créer Projet</span>
                  </Link>
                  {/* <Link to="/projects/new" className="btn btn-warning">
                    <i className="fa fa-plus mr-1 d-inline"></i>
                    <span>Ajouter Membre</span>
                  </Link> */}
                  <Button onClick={e => this.toggle(e)}>
                    <i className="fa fa-filter mr-1 d-inline"></i> Filtrer
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <CrudTable
                  actions={["edit", "delete", "search"]}
                  {...this.props}
                  columns={columns}
                  filterOpen={this.state.filterOpen}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectListStatic;
