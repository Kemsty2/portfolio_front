import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormGroup,
  FormFeedback,
  Form,
  Input,
  Label
} from "reactstrap";
import SuggestComponent from "../../components/Suggestions/SuggestComponent";
import { validateField, isFormValid } from "../../validation/validator";
import CrudTable from "../../components/CrudTable";
import lodash from "lodash";

function isEmpty(obj) {
  let result = false;
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    result = true;
  }
  return result;
}

class MembersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { nom: "cuid", title: "Cuid" },
        { nom: "nom", title: "Nom Membre" },
        { nom: "type", title: "Type Membre" },
        { nom: "createdAt", title: "Crée Le" },
        { nom: "updatedAt", title: "Dernière Mise à Jour" }
      ],
      filterOpen: false,
      modal: false,
      chefProjet: {
        value: "",
        error: true
      },
      fields: {
        nom: {
          value: "",
          error: null
        },
        type: {
          value: "",
          error: null
        }
      },
      member: {},
      isLoading: false
    };
  }

  componentDidMount() {
    const { idProject } = this.props.match.params;
    this.getColums(idProject);
  }

  toggle = (e, member = {}) => {
    
    let fields = this.state.fields;
    let chefProjet = {
      value: '',
      error: null
    };
    e.persist();
    if (!isEmpty(member)) {
      chefProjet.value = member.cuid;
      lodash.keys(fields).forEach(key => {
        fields = Object.assign({}, fields, {
          [key]: { value: member[key], error: null }
        });
      });
    }

    
    this.setState({
      modal: !this.state.modal,
      member: member,
      fields: fields,
      chefProjet: chefProjet
    });
  };

  onChangeChefProjet = value => {
    const ciud = value.suggestedSelected.LogonName;
    const nameMembre = value.suggestedSelected.Name;

    this.setState(prevState => {
      return {
        ...prevState,
        chefProjet: {
          value: ciud,
          error: value.error
        },
        fields: {
          ...prevState.fields,
          nom: {
            ...prevState.fields["nom"],
            value: nameMembre,
            error: validateField("nom", nameMembre, [], "membreNew")
          }
        }
      };
    });
  };

  onChange = event => {
    const { value, name, type } = event.target;

    this.setState(prevState => {
      return {
        ...prevState,
        fields: {
          ...prevState.fields,
          [name]: {
            ...prevState.fields[name],
            value: value,
            error: validateField(name, value, [], "membreNew")
          }
        }
      };
    });
  };

  getColums = idProjet => {
    const columns = [
      { nom: "cuid", title: "Cuid", linkTo: `/projects/${idProjet}` },
      { nom: "nom", title: "Nom Membre", linkTo: `/projects/${idProjet}` },
      { nom: "type", title: "Type Membre" },
      { nom: "createdAt", title: "Crée Le", date: true },
      { nom: "updatedAt", title: "Dernière Mise à Jour", date: true }
    ];

    this.setState({
      columns: columns
    });
  };

  setFilterOpen = filterOpen => {
    this.setState({
      filterOpen
    });
  };

  toggleCollapse = e => {
    e.preventDefault();

    this.setFilterOpen(!this.state.filterOpen);
  };

  submitForm = async event => {
    event.preventDefault();

    const { fields, chefProjet, member } = this.state;
    const { idProject } = this.props.match.params;

    if (isFormValid(fields, "membreNew") !== true || chefProjet.error) {
      const keys = Object.keys(fields);
      for (let name of keys) {
        this.setState(prevState => {
          let value = prevState.fields[name].value;
          return {
            ...prevState,
            fields: {
              ...prevState.fields,
              [name]: {
                ...prevState.fields[name],
                value: value,
                error: validateField(name, value, [], "membreNew")
              }
            }
          };
        });
      }
      return;
    }

    let fieldObjet = lodash.mapValues(fields, "value");
        
    this.setState({
      isLoading: true
    });
    if(isEmpty(member)){
      let payload = {
        ...fieldObjet,
        cuid: chefProjet.value,
        projetId: idProject
      };
      await this.props.create(payload, this.props.token);      
    }else{
      let payload = {
        ...member,
        ...fieldObjet,        
      };
      console.log("payload", payload);
      await this.props.update(payload, this.props.token);
    }    
    this.setState({
      isLoading: false,
      modal: !this.state.modal
    });
    return;
  };  

  render() {
    const { modal, fields, isLoading, columns, member } = this.state;
    const cuid = !isEmpty(member) ? member.cuid : "";
    const modalTitle = !isEmpty(member) ? "Modifier Membre" : "Créer Membre";
    const btnAction = !isEmpty(member) ? "Modifer" : "Créer";
    
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between bg-black">
                <CardTitle tag="h4">Membres</CardTitle>
                <div>
                  <button
                    className="btn btn-primary mr-1"
                    onClick={e => {
                      this.toggle(e, {});
                    }}
                  >
                    <i className="nc-icon nc-simple-add"></i>
                    <span>Créer Membre</span>
                  </button>
                  <Button onClick={e => this.toggleCollapse(e)}>
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
                  toggleModal={this.toggle}
                  delete={this.props.delete}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className="modal-dialog modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Nom Membre</Label>
                    <Input
                      name="nom"
                      type="text"
                      value={fields["nom"]["value"]}
                      invalid={fields["nom"]["error"] != null}
                      onChange={this.onChange}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <SuggestComponent
                    onChangeChefProjet={this.onChangeChefProjet}
                    value={cuid}
                    label="Nom Membre"
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label for="type">Type de Membre</Label>
                    <Input
                      name="type"
                      type="select"
                      id="type"
                      value={fields["type"]["value"]}
                      invalid={fields["type"]["error"] !== null}
                      onChange={this.onChange}
                    >
                      <option value="" disabled>
                        Selectionnez le type de membre...
                      </option>
                      <option value="PROJET">Projet</option>
                      <option value="CLIENT">Client</option>
                      <option value="FOURNISSEUR">Fournisseur</option>
                    </Input>
                    <FormFeedback>
                      {fields["type"]["error"] !== null
                        ? fields["type"]["error"]
                        : ""}
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submitForm}>
              {btnAction}
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MembersList;
