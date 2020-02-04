import { ProjectsActions } from "../actions/types";
import lodash from "lodash";
const initialState = {
  listOfProjects: [],    
  numProjects: 0
};

export function projectsReducer(state = initialState, action) {
  const oldState = lodash.cloneDeep(state);
  const newProject = action.project;  
  let available = 0;
  let listOfProjects;

  switch (action.type) {
    case ProjectsActions.ADD_PROJECT:
      newProject.id = action.project.id;
      available = lodash.findIndex(oldState.listOfProjects, action.project);

      if (available === -1) {
        // Projet n'est pas dans le store
        return {
          ...state,          
          listOfProjects: [newProject, ...state.listOfProjects]
        };
      } else {
        return {
          ...state
        };
      }

    case ProjectsActions.UPDATE_PROJECT:
      listOfProjects = state.listOfProjects.map(project => {
        if (project.id === action.project.id) {
          return Object.assign({}, project, action.project);
        }
        return project;
      });
      return Object.assign({}, state, { listOfProjects: [...listOfProjects] });

    case ProjectsActions.DEFINE_NUM_PROJECTS:
      return Object.assign({}, state, { numProjects: action.numProjects });

    case ProjectsActions.REMOVE_ALL_PROJECTS:
      return Object.assign({}, state, { listOfProjects: [] });

    case ProjectsActions.LISTER_PROJECTS:
      return Object.assign({}, state, {
        listOfProjects: action.listOfProjects
      });

    default:
      return state;
  }
}
