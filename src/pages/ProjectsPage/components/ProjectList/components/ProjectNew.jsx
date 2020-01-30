import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";

class ProjectNew extends React.PureComponent {
  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Nouveau Projet</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Nom Projet</label>
                        <Input
                          defaultValue=""
                          placeholder="Nom Projet"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          type="textarea"
                          placeholder="Petite Description du Projet"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="statutSelect">Statut</Label>
                        <Input type="select" name="select" id="statutSelect">
                          <option></option>
                          <option>Sur la bonne voie</option>
                          <option>A Risque</option>
                          <option>Sur la mauvaise voie</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description du Statut</label>
                        <Input
                          type="textarea"
                          placeholder="Petite Description du statut du projet"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn btn-success"                        
                        type="submit"                      
                      >
                        <i className="nc-icon nc-simple-add"></i>
                        Créer
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectNew;
