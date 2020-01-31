import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { layoutReducer } from "../reducers/layout";
import { projectsReducer } from "../reducers/projects";
import { messagesReducer } from "../reducers/messages";

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
    project: projectsReducer,
    profile: layoutReducer,
    message: messagesReducer,
    routing: routerReducer
  });

  return createStore(defaultReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
}
