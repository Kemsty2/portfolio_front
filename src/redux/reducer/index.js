import {combineReducers} from "redux";
import {projectsReducer} from '../../services/projects/reducer';

export const rootReducer = combineReducers({
    projects: projectsReducer
});