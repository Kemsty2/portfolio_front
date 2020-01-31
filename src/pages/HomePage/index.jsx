import * as React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { isEmpty, isArray, isString } from "lodash";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";

import { routes, routesSidebar } from "../../global/routes";
import { RouteWithSubRoutes } from "../../utils/utilsComponents";
import Keycloak from "keycloak-js";
import keycloakConfig from "../../utils/keycloak";
import { setAdminSecurity, setAdminProfile, unsetAdminProfile } from "../../redux/actions/";
import { standard } from "../../variables";
import DefaultLoading from "../../components/DefaultLoading";

let ps;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "warning"
    };
    this.mainPanel = React.createRef();
  }

  signOut = e => {
    e.preventDefault();
    const { profile, history, unsetAdminProfile } = this.props;

    if (profile.keycloak) {
      profile.keycloak.logout();
    }
    unsetAdminProfile();
    history.push("/");
  };

  componentDidMount() {
    const { setAdminSecurity, setAdminProfile, history, profile } = this.props;
    console.log("profile", profile);
    if (profile) {
      if (navigator.platform.indexOf("Win") > -1) {
        if(ps){
          ps = new PerfectScrollbar(this.mainPanel.current);
          document.body.classList.toggle("perfect-scrollbar-on");
        }        
      }
    }

    const keycloak = Keycloak(keycloakConfig);
    keycloak
      .init({ onLoad: "login-required", promiseType: "native" })
      .then(authenticated => {
        if (authenticated) {
          let roles = keycloak.resourceAccess.portfolio_dev.roles;
          roles = isArray(roles) ? roles : isString(roles) ? [roles] : [];

          if (isEmpty(roles) || !roles.includes(standard)) {
            keycloak.logout();
            history.push("/");
            return;
          }

          setAdminSecurity(keycloak, roles);
          keycloak
            .loadUserInfo()
            .then(admin => {              
              setAdminProfile({
                name: admin.preferred_username,
                email: admin.email,
                id: admin.sub,
                roles
              });
            })
            .catch(error => {});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    const { profile } = this.props;
    return (
      <div className="wrapper">
        {profile.authenticated ? (
          <>
            <Sidebar
              {...this.props}
              routes={routesSidebar}
              bgColor={this.state.backgroundColor}
              activeColor={this.state.activeColor}
            />
            <div className="main-panel" ref={this.mainPanel}>
              <Header {...this.props} onLogout={e => this.signOut(e)} />
              <Switch>
                {routes.map((prop, key) => (
                  <RouteWithSubRoutes {...prop} key={key} />
                ))}
              </Switch>
              <Footer fluid />
            </div>
          </>
        ) : (
          <DefaultLoading />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapActionsToProps = {
  setAdminSecurity,
  setAdminProfile,
  unsetAdminProfile
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
