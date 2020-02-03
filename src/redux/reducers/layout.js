import { AdministratorsActions } from "../actions/types";
import axios from "axios";

/* let baseURL = "http://172.26.76.96:32290/", publicUrl="";
const credentials = btoa('WDTN4590:Naruto1997'); */

/* let client = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": 'application/json',
    "Authorization": `Basic ${credentials}`
  }
}); */

const init = {
  admin: null,  
  authenticated: false,
  roles: [],
  keycloak: null,
  /* client: client */
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
      //const token = action.value.keycloak.token;
      /* const client = axios.create({
        baseURL: baseURL,
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
        }
      }); */
      /* console.log('token', token)  */     

      return Object.assign({}, state, {
        keycloak: action.value.keycloak,
        authenticated: true,
        roles: action.value.roles,
        /* client: client */
      });            

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
