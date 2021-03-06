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
import { validateField, isFormValid } from "../../validation/validator";
import lodash from "lodash";
import DefaultLoading from "../../components/DefaultLoading";

class MemberNewStatic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: {label: '', value: ''},
      isLoading: false,
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
        objectifs: {
          value: "",
          error: null
        },        
        clientId: {
          value: "00000000-0000-0000-0000-000000000000",
          label: "",
          error: null
        },
        beneficeClient: {
          value: "",
          error: null
        },
        type: {
          value: "",
          error: null
        },
        chefProjetCuid: {
          value: "",
          error: null
        },
        pourcentageCompletion: {
          value: 0,
          error: null
        }
      }
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    //await this.props.getStatuts(this.props.token);
    this.setState({
      isLoading: false
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status === "success") {
        this.props.history.push("/projects");
      }
    }
  }

  handleChange(selectedOption) {
    this.setState({
      selectedOption: selectedOption
    });
        
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
    let fieldObjet = lodash.mapValues(fields, "value");
    let payload = { ...fieldObjet };
    
    this.props.create(payload, this.props.token);
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
    const { fields, isLoading } = this.state;

    /* const statutsOptions = this.props.listOfStatuts.map((statut, id) => {
      return (
      <option key={id} value={statut.id}>{statut.name}</option>
      )
    }) */
    return isLoading ? (
      <DefaultLoading />
    ) : (
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Nouveau Membre</CardTitle>
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
                          name="objectifs"
                          type="textarea"
                          placeholder="Vision, chiffres, clés, unités, mesures, spécifications"
                          value={fields["objectifs"]["value"]}
                          invalid={fields["objectifs"]["error"] !== null}
                          onChange={this.onChange}
                        />
                        <FormFeedback>
                          {fields["objectifs"]["error"] !== null
                            ? fields["objectifs"]["error"]
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
                      <Button
                        className="btn btn-success"
                        type="submit"
                        disabled={this.props.status === "pending"}
                      >
                        {this.props.status !== "pending" ? (
                          <i className="fa fa-plus mr-1"></i>
                        ) : (
                          <i className="fa fa-spinner fa-spin"></i>
                        )}
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

export default MemberNewStatic;
