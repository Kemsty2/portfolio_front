import { ProjectsActions } from "../actions/types";
import lodash from 'lodash'
const initialState = {
  listOfProjects: [],  
  project: {},
  numProjects: 0  
};

export function projectsReducer(state = initialState, action) {
  const oldState = lodash.cloneDeep(state);
  const newProject = action.project;
  let available = 0;
  let listOfProjects;

  switch (action.type) {
    case ProjectsActions.ADD_PROJECT:
      console.log('state', state);
      console.log("action", action);
      newProject.index = action.project.id;
      available = lodash.findIndex(
        oldState.listOfProjects,
        action.project
      );

      if(available === -1){
        // Projet n'est pas dans le store
        return {
          ...state,
          project: newProject,
          listOfProjects: [newProject, ...state.listOfProjects]
        }
      }else{
        return {
          ...state        
        };   
      }         
    
    case ProjectsActions.UPDATE_PROJECT:
      listOfProjects = state.listOfProjects.map((project) => {
        if(project.id === action.project.id){
          return Object.assign({}, project, action.project)
        }
        return project
      });
      return Object.assign({}, state, {listOfProjects: [...listOfProjects]})

    case ProjectsActions.LISTER_PROJECTS:
      return Object.assign({}, state, {
        listOfProjects: action.listOfProjects,
        numProjects: action.numProjects
      });

    default:
      return state;
  }
}
