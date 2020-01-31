import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CrudTable from "../../../../components/CrudTable";
import {
  listerProjets,
  addProject,
  updateProject
} from "../../../../redux/actions/";

const columns = [
  { nom: "objet", title: "Nom" },
  { nom: "", title: "Statut" },
  { nom: "createdAt", title: "Crée Le" },
  { nom: "", title: "Responsable" }
];

class ProjectList extends React.Component {
  constructor(props) {
    super(props);    

    this.state = {
      filterOpen: false
    }
  }  

  setFilterOpen = (filterOpen) => {
    this.setState({
      filterOpen
    })
  }

  toggle = (e) => {
    e.preventDefault();

    this.setFilterOpen(!this.state.filterOpen)
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
                  <Button onClick={(e) => this.toggle(e)}><i className="fa fa-filter mr-1 d-inline"></i> Filtrer</Button>
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

const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    //  State Project
    sp = state.project, su = state.profile;
    console.log("projects", sp);


  return {
    message: sm.message,
    status: sm.status,
    rows: sp.listOfProjects,
    totalItems: sp.numProjects,
    user: state.admin
  };
};

const mapDispatchToProps = dispatch => ({
  onEvent: data => dispatch(listerProjets(data)),
  create: d => dispatch(addProject(d)),
  update: d => dispatch(updateProject(d))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
