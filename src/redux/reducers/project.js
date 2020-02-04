import { ProjectActions } from "../actions/types";

const initialState = {  
  project: {},  
};

export function projectReducer(state = initialState, action) {  

  switch (action.type) {   

    case ProjectActions.SET_PROJECT_DETAILS:
        console.log('set_project_details', action.project)
      return Object.assign({}, state, { project: action.project });    

    default:
      return state;
  }
}
