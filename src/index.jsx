/* eslint-disable no-underscore-dangle */
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

// AUTH
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// BOOTSTRAP AND STALING
import "./index.scss";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'

// CONTEXT
import { AppContextProvider } from "./providers/context";

// REDUX
import { createStore, compose, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers/rootReducer";
const middleware = [thunk];
const store = createStore(
  combineReducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
// const store = createStore(combineReducers, compose(applyMiddleware(...middleware)));

// AUTH
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
// Auth>

const Index = () => <App />;

ReactDOM.render(
  <AppContextProvider>
    <ReduxProvider store={store}>
      <Index />
    </ReduxProvider>
  </AppContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
