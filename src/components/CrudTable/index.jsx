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
  Collapse
} from "reactstrap";
import swal from "sweetalert";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class CrudTable extends Component {
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

  async componentDidMount() {
    await this.getRows(0, "current");
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
    }).then(async willDelete => {
      if (willDelete) {
        await this.props.delete(row.id, this.props.token);
        await this.getRows(0, "current")
      }
    });
  }

  buildPages() {
    const { totalItems } = this.props;
    const { max_rows } = this.state;
    let length =
      totalItems % max_rows === 0
        ? Math.floor(totalItems / max_rows)
        : Math.floor(totalItems / max_rows) + 1;
    return Array.from({ length: length }, (v, k) => k);
  }

  async getRows(idx, typee) {
    const { search, max_rows, openDate, closeDate } = this.state;
    let page = idx;
    if (typee === "next") page = page + 1;
    if (typee === "previous") page = page - 1;
    await this.props.onEvent(
      {
        max_rows,
        search,
        skip_rows: page,
        openDate,
        closeDate
      },
      this.props.token
    );
    if (page >= 0) this.setState({ currentPage: page });
  }

  onChange(e) {
    const name = e.target.name,
      value = e.target.value;

    this.setState({ [name]: value }, async () => {
      if (name === "search" && !value) {
        await this.getRows(0, "current");
      }
    });
  }

  async onKeyPress(e) {
    if (e.key === "Enter") await this.getRows(0, "current");
  }

  actualiser = async () => {
    await this.getRows(0, "");
  };

  onPrevious = async () => {
    await this.getRows(this.state.currentPage, "previous");
  };

  onNext = async () => {
    await this.getRows(this.state.currentPage, "next");
  };

  showModal(e, item = { id: "new" + Date.now() }) {
    e.preventDefault();
    console.log("item edit", item)
    this.setState({ item }, () => {
      this.props.toggleModal(e, item);
    });
  }

  showResetModal(e, row) {
    e.preventDefault();

    this.setState({ channelId: row.id, actionId: Date.now() }, () => {
      this.props.toggleResetModal();
    });
  }

  render() {
    const { columns, rows, totalItems, status, filterOpen } = this.props;
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
        {this.props.actions.indexOf("search") !== -1 && (
          <Collapse isOpen={filterOpen}>
            <Row className="pt-3">
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
                <Button block onClick={this.actualiser} color="primary">
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
            {status !== "pending" && (
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((item, idxx) => (
                      <td style={{ fontSize: "1.03em" }} key={idxx}>
                        {item.linkTo ? (
                          <Link to={`${item.linkTo}/${row.id}`}>
                            {row[item.nom] && row[item.nom].length > 50
                              ? row[item.nom].substring(0, 50) + "..."
                              : row[item.nom]}
                          </Link>
                        ) : row[item.nom] && row[item.nom].length > 50 ? (
                          row[item.nom].substring(0, 50) + "..."
                        ) : item.date ? (
                          new Date(row[item.nom]).toLocaleString()
                        ) : (
                          row[item.nom]
                        )}
                      </td>
                    ))}
                    <td>
                      {this.props.actions.indexOf("edit") !== -1 && (
                        <Button
                          title="Modifier l'élément"
                          className="btn-primary"
                          onClick={(e) => {this.showModal(e, row)}}
                        >
                          {" "}
                          <i className="fa fa-pencil-alt"></i>{" "}
                        </Button>
                      )}{" "}
                      {this.props.actions.indexOf("resetpin") !== -1 && (
                        <Button title="Reset Pin" className="btn-primary">
                          {" "}
                          <i className="fa fa-refresh"></i>{" "}
                        </Button>
                      )}{" "}
                      {this.props.actions.indexOf("delete") !== -1 && (
                        <Button
                          title="Supprimer l'élément"
                          onClick={e => this.deleteRow(e, row)}
                          className="btn btn-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
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
            {status === "pending" && (
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
                disabled={skipItems === 0 || status === "pending"}
              >
                <PaginationLink
                  onClick={this.onPrevious}
                  previous
                  tag="button"
                />
              </PaginationItem>

              <PaginationItem
                disabled={status === "pending"}
                active={skipItems === 0}
              >
                <PaginationLink
                  onClick={async () => {
                    await this.getRows(0, "current");
                  }}
                  tag="button"
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 2 && <span className="pagination span">...</span>}

              {currentPage - 1 > 0 && (
                <PaginationItem
                  disabled={status === "pending"}
                  active={skipItems === (currentPage - 1) * max_rows}
                >
                  <PaginationLink onClick={this.onPrevious} tag="button">
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {[0, pages.length - 1].indexOf(currentPage) === -1 && (
                <PaginationItem
                  disabled={status === "pending"}
                  active={skipItems === currentPage * max_rows}
                >
                  <PaginationLink
                    onClick={async () => {
                      await this.getRows(currentPage, "current");
                    }}
                    tag="button"
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage + 1 < pages.length - 1 && (
                <PaginationItem
                  disabled={status === "pending"}
                  active={skipItems === (currentPage + 1) * max_rows}
                >
                  <PaginationLink onClick={this.onNext} tag="button">
                    {currentPage + 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage + 2 < pages.length - 1 && (
                <span className="pagination span">...</span>
              )}

              <PaginationItem
                disabled={status === "pending"}
                active={skipItems === (pages.length - 1) * max_rows}
              >
                <PaginationLink
                  onClick={async () => {
                    await this.getRows(pages.length - 1, "current");
                  }}
                  tag="button"
                >
                  {pages.length}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem
                style={{ marginLeft: "20px" }}
                disabled={
                  totalItems === skipItems + rows.length || status === "pending"
                }
              >
                <PaginationLink onClick={this.onNext} next tag="button" />
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

export default CrudTable;
