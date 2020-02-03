import { AdministratorsActions } from "../actions/types";

const init = {
  user: null,  
  authenticated: false,
  roles: [],
  keycloak: null,  
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
        user: action.value
      };
      break;

    case AdministratorsActions.UNSET_ADMIN_DETAILS:
      newState = {
        ...state,
        user: null
      };
      break;

    case AdministratorsActions.SET_ADMIN_SECURITY:      
      return Object.assign({}, state, {
        keycloak: action.value.keycloak,
        authenticated: true,
        roles: action.value.roles,        
      });            

    case AdministratorsActions.SET_ADMIN_PROFILE:
      
      newState = {
        ...state,
        user: action.value
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
