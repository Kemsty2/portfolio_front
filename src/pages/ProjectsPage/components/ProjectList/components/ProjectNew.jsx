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
  Button,
  FormFeedback
} from "reactstrap";
import { connect } from "react-redux";
import { addProject, updateProject } from "../../../../../redux/actions";
import {
  validateField,
  isFormValid
} from "../../../../../validation/validator";
import lodash from 'lodash';

class ProjectNew extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        objet: {
          value: "",
          error: null
        },
        description: {
          value: "",
          error: null
        },
        perimetre: {
          value: "",
          error: null
        },
        objectif: {
          value: "",
          error: null
        },
        statut: {
          value: "",
          error: null
        },
        client: {
          value: "",
          error: null
        },
        beneficeClient: {
          value: "",
          error: null
        }
      }
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.status !== prevProps.status){
      if(this.props.status === "success"){
        this.props.history.push('/projects');
      }
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { fields } = this.state;

    /* if (isFormValid(fields, "projectNew") !== true) {
      alert('invalid');
      const keys = Object.keys(fields);
      for (let name of keys) {        
        this.setState(prevState => {
          let value = prevState.fields[name].value;
          return {
            fields: {
              ...prevState.fields,
              [name]: {
                ...prevState.fields[name],
                value: value,
                error: validateField(name, value, [], "projectNew")
              }
            }
          };
        });
      }
      return;
    } */
    let newProject = lodash.mapValues(fields, 'value');
    this.props.create(newProject);    
  };

  onChange = event => {
    const { value, name, type } = event.target;

    this.setState(prevState => {
      return {
        fields: {
          ...prevState.fields,
          [name]: {
            ...prevState.fields[name],
            value: value,
            error: validateField(name, value, [], "projectNew")
          }
        }
      };
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Nouveau Projet</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.onSubmit}>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Nom du Projet</label>
                        <Input
                          name="objet"
                          placeholder="Nom Projet"
                          type="text"
                          onChange={this.onChange}
                          value={fields["objet"]["value"]}
                          invalid={fields["objet"]["error"] !== null}
                        />
                        <FormFeedback>
                          {fields["objet"]["error"] !== null
                            ? fields["objet"]["error"]
                            : ""}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description du Projet</label>
                        <Input
                          name="description"
                          type="textarea"
                          placeholder="Enoncé du problème"
                          value={fields["description"]["value"]}
                          invalid={fields["description"]["error"] !== null}
                          onChange={this.onChange}
                        />
                        <FormFeedback>
                          {fields["description"]["error"] !== null
                            ? fields["description"]["error"]
                            : ""}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Objectifs du Projet</label>
                        <Input
                          name="objectif"
                          type="textarea"
                          placeholder="Vision, chiffres, clés, unités, mesures, spécifications"
                          value={fields["objectif"]["value"]}
                          invalid={fields["objectif"]["error"] !== null}
                          onChange={this.onChange}
                        />
                        <FormFeedback>
                          {fields["objectif"]["error"] !== null
                            ? fields["objectif"]["error"]
                            : ""}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Périmètre du projet</label>
                        <Input
                          name="perimetre"
                          type="textarea"
                          placeholder="Inclusion, exclusion, point de départ et d'arrivée"
                          value={fields["perimetre"]["value"]}
                          invalid={fields["perimetre"]["error"] !== null}
                          onChange={this.onChange}
                        />
                        <FormFeedback>
                          {fields["perimetre"]["error"] !== null
                            ? fields["perimetre"]["error"]
                            : ""}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="clientSelect">Client</Label>
                        <Input
                          name="client"
                          type="select"
                          name="client"
                          id="clientSelect"
                          value={fields["client"]["value"]}
                          invalid={fields["client"]["error"] !== null}
                          onChange={this.onChange}
                        >
                          <option value="0"></option>
                          <option value="1">DRS</option>
                          <option value="2">DOM</option>
                          <option value="3">Total</option>
                        </Input>
                        <FormFeedback>
                          {fields["client"]["error"] !== null
                            ? fields["client"]["error"]
                            : ""}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="statutSelect">Statut</Label>
                        <Input
                          name="statut"
                          type="select"
                          name="statut"
                          id="statutSelect"
                          value={fields["statut"]["value"]}
                          invalid={fields["statut"]["error"] !== null}
                          onChange={this.onChange}
                        >
                          <option></option>
                          <option>Sur la bonne voie</option>
                          <option>A Risque</option>
                          <option>Sur la mauvaise voie</option>
                        </Input>
                        <FormFeedback>
                          {fields["statut"]["error"] !== null
                            ? fields["statut"]["error"]
                            : ""}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Bénéfice Client</label>
                        <Input
                          name="beneficeClient"
                          type="textarea"
                          placeholder="Gains attendus par le client"
                          value={fields["beneficeClient"]["value"]}
                          invalid={fields["beneficeClient"]["error"] !== null}
                          onChange={this.onChange}
                        />
                        <FormFeedback>
                          {fields["beneficeClient"]["error"] !== null
                            ? fields["beneficeClient"]["error"]
                            : ""}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-plus mr-1"></i>
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

const mapStateToProps = state => {
  //  State Messages
  const sm = state.message,
    su = state.profile, sp = state.project;    

  return {
    message: sm.message,
    status: sm.status,
    user: su.admin,
    project: sp.project
  };
};

const mapDispatchToProps = dispatch => ({
  create: d => dispatch(addProject(d)),
  update: d => dispatch(updateProject(d))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNew);
