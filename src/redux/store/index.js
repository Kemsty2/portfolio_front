import {createStore, compose} from "redux";
import {rootReducer} from '../reducer'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;

export const store = createStore(
    rootReducer,
    compose(reduxDevTools),
);
