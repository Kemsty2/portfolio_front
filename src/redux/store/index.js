import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { layoutReducer } from "../reducers/layout";
import { projectsReducer } from "../reducers/projects";
import { messagesReducer } from "../reducers/messages";
import { statutsReducer } from "../reducers/statuts";
import { projectReducer } from "../reducers/project";
import { membersReducer } from "../reducers/members";

export default function configureStore(history, initialState) {
  const middleware = [thunk, routerMiddleware(history)];

  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }  

  const defaultReducer = combineReducers({
    projectList: projectsReducer,
    memberList: membersReducer,
    project: projectReducer,
    profile: layoutReducer,
    message: messagesReducer,
    routing: routerReducer,
    statut: statutsReducer
  });

  return createStore(defaultReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
}
