import { AdministratorsActions } from "./types";

export const setAdminDetails = admin => dispatch => {
  dispatch({ type: AdministratorsActions.SET_ADMIN_DETAILS, value: admin });
};

export const unsetAdminDetails = () => dispatch => {
  dispatch({ type: AdministratorsActions.UNSET_ADMIN_DETAILS });
};

export const setAdminSecurity = (keycloak, roles = []) => dispatch => {
  dispatch({
    type: AdministratorsActions.SET_ADMIN_SECURITY,
    value: {
      keycloak: keycloak,
      roles: roles
    }
  });
};

export const setAdminProfile = profile => dispatch => {
  dispatch({
    type: AdministratorsActions.SET_ADMIN_PROFILE,
    value: profile
  });
};

export const unsetAdminProfile = () => dispatch => {
  dispatch({
    type: AdministratorsActions.UNSET_ADMIN,    
  });
};
