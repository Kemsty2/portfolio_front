export const ProjectsActions = {
  GET_PROJECTS: "@projects"
};

export function getProjects() {
  return {
    type: ProjectsActions.GET_PROJECTS
  };
}
