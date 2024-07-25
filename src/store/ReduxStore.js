import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

function saveToLocalStorage(store) {
  try {
      const serializedStore = JSON.stringify(store);
      window.localStorage.setItem('store', serializedStore);
  } catch(e) {
      console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
      const serializedStore = window.localStorage.getItem('store');
      if(serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
  } catch(e) {
      console.log(e);
      return undefined;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));

// composeEnhancers(applyMiddleware(thunk)): Enhances the store with middleware and the Redux DevTools extension.
// applyMiddleware(thunk): Adds middleware to the store, in this case, thunk, which allows you to write action 
// creators that return a function instead of an action. This is useful for handling asynchronous actions like API calls.

store.subscribe(() => saveToLocalStorage(store.getState()));  
//runs every time an action is dispatched to the Redux store, causing the state to change. Here's what happens in simpler terms

export default store;