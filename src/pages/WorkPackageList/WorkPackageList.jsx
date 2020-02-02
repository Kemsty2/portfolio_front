import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,  
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { Link } from "react-router-dom";
import WorkTr from "./WorkTr";

class WorkPackageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    }

    this.dropdownToggle = this.dropdownToggle.bind(this);
  }

  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between bg-black">
                <CardTitle tag="h4">Liste des Actions</CardTitle>
                <Dropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={e => this.dropdownToggle(e)}
                >
                  <DropdownToggle caret className="btn-success">                    
                    <>
                      <i className="fa fa-plus mr-1"></i>
                      <span className="d-md-inline">Créer</span>
                    </>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/projects/1/workpackages/create_new?type=1" className="dropdown-item">
                      Tâche
                    </Link>
                    <Link to="/projects/1/workpackages/create_new?type=2" className="dropdown-item">
                      Phase
                    </Link>
                  </DropdownMenu>
                </Dropdown>                
              </CardHeader>
              <CardBody>
                <Table hover bordered>
                  <thead className="text-primary">
                    <tr>
                      <th>Type</th>
                      <th>Id</th>
                      <th>Sujet</th>
                      <th>Statut</th>
                      <th>Assigné A</th>
                      <th>Priorité</th>
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

export default WorkPackageList;
