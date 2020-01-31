import React, { Component } from "react";
import {
  Col,
  Label,
  Row,
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  Input,
  TabContent,
  TabPane,
  Collapse
} from "reactstrap";
import swal from "sweetalert";
import moment from "moment";

export default class CrudTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      currentPage: 0,
      max_rows: 10,
      openDate: "2019-01-01",
      closeDate: moment().format("YYYY-MM-DD"),
      item: null,
      channelId: "",
      actionId: "",
      statut: 0
    };
  }

  componentDidMount() {
    this.getRows(0, "current");
  }

  deleteRow(e, row) {
    e.preventDefault();

    swal({
      title: "Suppression",
      text: "Etes-vous sur de vouloir supprimer cet élement ?",
      icon: "warning",
      dangerMode: true,
      button: {
        text: "Oui"
      }
    }).then(willDelete => {
      if (willDelete) {
        this.props.delete(row.id);
      }
    });
  }

  buildPages() {
    const { totalItems } = this.props;
    const { max_rows } = this.state;
    let length =
      totalItems % max_rows == 0
        ? Math.floor(totalItems / max_rows)
        : Math.floor(totalItems / max_rows) + 1;
    return Array.from({ length: length }, (v, k) => k);
  }

  getRows(idx, typee) {
    const { search, max_rows, openDate, closeDate } = this.state;
    let page = idx;
    if (typee == "next") page = page + 1;
    if (typee == "previous") page = page - 1;
    this.props.onEvent({
      max_rows,
      search,
      skip_rows: page + 1,
      openDate,
      closeDate
    });
    if (page >= 0) this.setState({ currentPage: page });
  }

  onChange(e) {
    const name = e.target.name,
      value = e.target.value;

    this.setState({ [name]: value }, () => {
      if (name == "search" && !value) this.getRows(0, "current");
    });
  }

  onKeyPress(e) {
    if (e.key == "Enter") this.getRows(0, "current");
  }

  showModal(e, item = { id: "new" + Date.now() }) {
    e.preventDefault();

    this.setState({ item }, () => {
      this.props.toggleModal(item.id);
    });
  }

  showResetModal(e, row) {
    e.preventDefault();

    this.setState({ channelId: row.id, actionId: Date.now() }, () => {
      this.props.toggleResetModal();
    });
  }

  render() {
    const {
      columns,
      rows,
      totalItems,
      status,      
      filterOpen,      
    } = this.props;
    const {
      currentPage,
      max_rows,
      search,
      openDate,
      closeDate,
      statut
    } = this.state;
    const skipItems = max_rows * currentPage;
    const pages = this.buildPages();

    return (
      <div>
        {this.props.actions.indexOf("search") != -1 && (
          <Collapse isOpen={filterOpen}>
            <Row className="pt-3">
              <Col md={3}>
                <FormGroup>
                  <Label>Rechercher</Label>
                  <Input
                    value={search}
                    onChange={e => this.onChange(e)}
                    name="search"
                    onKeyPress={e => this.onKeyPress(e)}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="statut">Statut</Label>
                  <Input
                    type="select"
                    name="statut"
                    id="statut"
                    value={statut}
                    onChange={e => this.onChange(e)}
                  >
                    <option value="1">Sur La Bonne Voie</option>
                    <option value="2">Sur La Mauvaise Voie</option>
                    <option value="3">A Risque</option>
                    <option value="0">Non Défini</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>Début</Label>
                  <Input
                    value={openDate}
                    onChange={e => this.onChange(e)}
                    name="openDate"
                    type="date"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>Fin</Label>
                  <Input
                    value={closeDate}
                    onChange={e => this.onChange(e)}
                    name="closeDate"
                    type="date"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={3}>
                <Button
                  block
                  onClick={e => this.getRows(0, "")}
                  color="primary"
                >
                  {" "}
                  <i className="fa fa-sync-alt mr-2 d-inline"></i>
                  <span>Actualiser</span>
                </Button>
              </Col>
            </Row>
          </Collapse>
        )}

        <div>
          <Table
            style={{ tableLayout: rows.length ? "fixed" : "" }}
            className="mt-3"
            hover
            bordered
          >
            <thead>
              <tr className="text-primary">
                {columns.map((item, idx) => (
                  <th key={idx} scope="col">
                    {item.title}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            {status != "pending" && (
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((item, idxx) => (
                      <td style={{ fontSize: "1.03em" }} key={idxx}>
                        {row[item.nom] && row[item.nom].length > 50
                          ? row[item.nom].substring(0, 50) + "..."
                          : row[item.nom]}{" "}
                      </td>
                    ))}
                    <td>
                      {this.props.actions.indexOf("edit") != -1 && (
                        <a
                          href="#"
                          title="Modifier l'élément"                          
                          className="btn btn-primary"
                        >
                          {" "}
                          <i className="fa fa-pencil-alt"></i>{" "}
                        </a>
                      )}{" "}
                      {this.props.actions.indexOf("resetpin") != -1 && (
                        <a
                          href="#"
                          title="Reset Pin"                          
                          className="btn btn-primary"
                        >
                          {" "}
                          <i className="fa fa-refresh"></i>{" "}
                        </a>
                      )}{" "}
                      {this.props.actions.indexOf("delete") != -1 && (
                        <a
                          href="#"
                          title="Supprimer l'élément"
                          onClick={e => this.deleteRow(e, row)}
                          className="btn btn-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}

                {!rows.length && (
                  <tr className="">
                    <td valign="top" colSpan="9" className="text-center">
                      Aucune donnée disponible dans le tableau
                    </td>
                  </tr>
                )}
              </tbody>
            )}
            {status == "pending" && (
              <tbody>
                <tr className="">
                  <td valign="top" colSpan="9" className="text-center">
                    <i className="fa fa-spinner fa-spin"></i>{" "}
                  </td>
                </tr>
              </tbody>
            )}
          </Table>

          {pages.length > 1 ? (
            <Pagination className="pull-right">
              <PaginationItem
                style={{ marginRight: "20px" }}
                disabled={skipItems == 0 || status == "pending"}
              >
                <PaginationLink
                  onClick={() => this.getRows(currentPage, "previous")}
                  previous
                  tag="button"
                />
              </PaginationItem>

              <PaginationItem
                disabled={status == "pending"}
                active={skipItems == 0}
              >
                <PaginationLink
                  onClick={() => {
                    this.getRows(0, "current");
                  }}
                  tag="button"
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 2 && <span className="pagination span">...</span>}

              {currentPage - 1 > 0 && (
                <PaginationItem
                  disabled={status == "pending"}
                  active={skipItems == (currentPage - 1) * max_rows}
                >
                  <PaginationLink
                    onClick={() => {
                      this.getRows(currentPage, "previous");
                    }}
                    tag="button"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {[0, pages.length - 1].indexOf(currentPage) == -1 && (
                <PaginationItem
                  disabled={status == "pending"}
                  active={skipItems == currentPage * max_rows}
                >
                  <PaginationLink
                    onClick={() => {
                      this.getRows(currentPage, "current");
                    }}
                    tag="button"
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage + 1 < pages.length - 1 && (
                <PaginationItem
                  disabled={status == "pending"}
                  active={skipItems == (currentPage + 1) * max_rows}
                >
                  <PaginationLink
                    onClick={() => {
                      this.getRows(currentPage, "next");
                    }}
                    tag="button"
                  >
                    {currentPage + 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage + 2 < pages.length - 1 && (
                <span className="pagination span">...</span>
              )}

              <PaginationItem
                disabled={status == "pending"}
                active={skipItems == (pages.length - 1) * max_rows}
              >
                <PaginationLink
                  onClick={() => {
                    this.getRows(pages.length - 1, "current");
                  }}
                  tag="button"
                >
                  {pages.length}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem
                style={{ marginLeft: "20px" }}
                disabled={
                  totalItems == skipItems + rows.length || status == "pending"
                }
              >
                <PaginationLink
                  onClick={() => this.getRows(currentPage, "next")}
                  next
                  tag="button"
                />
              </PaginationItem>
            </Pagination>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
