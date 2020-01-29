import { ProjectsActions } from "./actions";

const initialState = {
  projects: [],
  loading: false
};

export function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case ProjectsActions.GET_PROJECTS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
