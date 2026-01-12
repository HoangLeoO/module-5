import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer.js";
import { thunk } from "redux-thunk";

export let store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
