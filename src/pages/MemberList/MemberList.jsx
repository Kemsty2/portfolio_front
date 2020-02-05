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
  Button
} from "reactstrap";
import MemberTr from "./MemberTr";
import { Link } from "react-router-dom";

class MembersList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { modal } = this.state;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between bg-black">
                <CardTitle tag="h4">Membres</CardTitle>
                <button
                  className="btn btn-primary d-flex justify-content-between"
                  onClick={this.toggle}
                >
                  <i className="nc-icon nc-simple-add"></i>
                  <span>Créer Membre</span>
                </button>
              </CardHeader>
              <CardBody>
                <Table hover bordered>
                  <thead className="text-primary text-capitilize">
                    <tr>
                      <th>Cuid</th>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Créer Le</th>
                      <th>Créer Par</th>
                    </tr>
                  </thead>
                  <tbody>
                    <MemberTr />
                    <MemberTr />
                    <MemberTr />
                    <MemberTr />
                    <MemberTr />
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className="modal-dialog modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label for="recipient-name" className="col-form-label">
                  Recipient:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recipient-name"
                />
              </div>
              <div className="form-group">
                <label for="message-text" className="col-form-label">
                  Message:
                </label>
                <textarea className="form-control" id="message-text"></textarea>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Do Something</Button>{" "}
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
