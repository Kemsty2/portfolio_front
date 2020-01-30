import { AdministratorsActions } from "../actions/types";

const init = {
  admin: null,  
  authenticated: false,
  roles: [],
  keycloak: null
};

const initialState = {
  ...init
};

export function layoutReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case AdministratorsActions.SET_ADMIN_DETAILS:
      newState = {
        ...state,
        admin: action.value
      };
      break;

    case AdministratorsActions.UNSET_ADMIN_DETAILS:
      newState = {
        ...state,
        admin: null
      };
      break;

    case AdministratorsActions.SET_ADMIN_SECURITY:
      newState = {
        ...state,
        keycloak: action.value.keycloak,
        authenticated: true,
        roles: action.value.roles
      };
      break;

    case AdministratorsActions.SET_ADMIN_PROFILE:
      
      newState = {
        ...state,
        admin: action.value
      };
      break;

    case AdministratorsActions.UNSET_ADMIN:
      newState = {
        ...state,
        ...init
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState || state;
}
