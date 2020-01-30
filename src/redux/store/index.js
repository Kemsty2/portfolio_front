import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { rootReducer } from "../reducers";
import { routerReducer, routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { layoutReducer } from "../reducers/layout";

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
    profile: layoutReducer,
    routing: routerReducer
  });

  return createStore(defaultReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));
}
