import { ProjectActions } from "./types";

export function setProjectDetails(project){
  return {
    type: ProjectActions.SET_PROJECT_DETAILS,    
    project: {...project}
  }
}

