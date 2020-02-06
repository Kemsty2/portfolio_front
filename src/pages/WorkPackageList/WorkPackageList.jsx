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
import {isEmpty} from '../../utils/utilsFunction.js';

const columns = [
  { nom: "objet", title: "Nom", linkTo:"/projects" },
  { nom: "type", title: "Type Projet" },
  { nom: "createdAt", title: "Crée Le", date: true },
  { nom: "updatedAt", title: "Dernière Mise à Jour", date: true},
  { nom: "chefProjetName", title: "Chef Projet"}
];

class WorkPackageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOpen: false
    };
  }

  /* componentDidMount(){
    const {show_add_number} = this.props.location.search;
    console.log(show_add_number);    
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

  onEdit = (e, project) => {
    e.persist();

    if(!isEmpty(project)){
      this.props.history.push(`/projects/new?idProject=${project.id}`);
    }
  } */

  render() {
    return (
      <div className="content">
        Lots de travaux
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between bg-black">
                <CardTitle tag="h4">Projets</CardTitle>
                <div>
                  <Link to="/projects/new" className="btn btn-success">
                    <i className="fa fa-plus mr-1 d-inline"></i>
                    <span>Créer Projet</span>
                  </Link>                  
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
                  toggleModal={this.onEdit}
                  delete={this.props.delete}
                  idProject={this.props.match.params.idProject}
                />
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default WorkPackageList;
