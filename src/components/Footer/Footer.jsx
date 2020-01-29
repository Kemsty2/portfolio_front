import React from "react";
import { Container, Row } from "reactstrap";

class Footer extends React.PureComponent {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>            
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; {new Date().getFullYear()}, Made 
                <i className="fa fa-heart heart" /> by Orange Cameroun
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
