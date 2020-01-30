import {combineReducers} from "redux";
import {projectsReducer} from './projects';
import {layoutReducer} from './layout';

export const rootReducer = combineReducers({
    projects: projectsReducer,
    profile: layoutReducer
});