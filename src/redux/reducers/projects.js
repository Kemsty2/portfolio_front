import { ProjectsActions } from "../actions/types";
import lodash from 'lodash'
const initialState = {
  listOfProjects: [],
  numProjects: 0,
  loading: false
};

export function projectsReducer(state = initialState, action) {
  const oldState = lodash.cloneDeep(state);
  const newProject = action.project;
  let available = 0;
  let listOfProjects;

  switch (action.type) {
    case ProjectsActions.ADD_PROJECT:
      newProject.index = action.project.id;
      available = lodash.findIndex(
        oldState.listOfProjects,
        action.project
      );

      if(available === -1){
        // Projet n'est pas dans le store
        oldState.listOfProjects.push(newProject);
      }
      return {
        ...oldState,
        loading: true
      };
    
    case ProjectsActions.REMOVE_ALL_PROJECTS:
      return Object.assign({}, state, {listOfProjects: []});
    
    case ProjectsActions.DEFINE_NUM_PROJECTS:
      oldState.numProjects = action.numProjects;
      return oldState;
    
    case ProjectsActions.UPDATE_PROJECT:
      listOfProjects = state.listOfProjects.map((project) => {
        if(project.id === action.project.id){
          return Object.assign({}, project, action.project)
        }
        return project
      });
      return Object.assign({}, state, {listOfProjects: [...listOfProjects]})
    default:
      return state;
  }
}
