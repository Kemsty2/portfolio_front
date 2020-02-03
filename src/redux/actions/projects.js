import { ProjectsActions } from "./types";

/* export function addProject(data) {
  return (dispatch, getState) => {
    const client = getState().profile.client;
    console.log('data', data);
    dispatch({ type: MessagesActions.PENDING_ADD, message: "Action en cours" });
    return client
      .post("/api/Projet", data)
      .then(response => {
        dispatch({
          type: ProjectsActions.ADD_PROJECT,
          project: response.data
        });

        return dispatch({
          type: MessagesActions.SUCCESS_ADD,
          message: "Projet enregistré avec succès"
        });
      })
      .catch(err => {
        return dispatch({
          type: MessagesActions.FAILED_ADD,
          message:
            (err.response && err.response.data) ||
            "La création du projet a échouée"
        });
      });      
  };
} */


export function listerProjects(listOfProjects){
  return {
    type: ProjectsActions.LISTER_PROJECTS,    
    listOfProjects: [...listOfProjects]
  }
}

export function updateProject(project) {
  return {
    type: ProjectsActions.UPDATE_PROJECT,
    project: { ...project }
  };
}

export function addProject(project){
  return {
    type: ProjectsActions.ADD_PROJECT,
    project: {...project}
  }
}

export function defineNumProjects(numProjects){
  return {
    type: ProjectsActions.DEFINE_NUM_PROJECTS,
    numProjects: numProjects
  }
}

export function removeAllProjects(){
  return {
    type: ProjectsActions.REMOVE_ALL_PROJECTS
  }
}