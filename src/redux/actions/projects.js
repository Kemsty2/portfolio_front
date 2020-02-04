import { ProjectsActions } from "./types";

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
