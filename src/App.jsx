import React, { Suspense, useContext } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
// <COMPONENTS
import MyNavbar from "./components/MyNavbar.jsx";
import { Home } from "./screens";

// const OtherComponent = React.lazy(() => import('./components/'));
// COMPONENTS>

// intl
import { I18nProvider } from "./providers/intl";
import translate from "./providers/intl/translate";

// CONTEXT
import { AppContext } from "./providers/context";

// LAZY LOADING SCREENS
const HandleGoogleLogin = React.lazy(() =>
  import("./components/HandleGoogleLogin")
);
const Itineraries = React.lazy(() => import("./screens/ItinerariesByCity"));
const Login = React.lazy(() => import("./screens/Login"));
const Register = React.lazy(() => import("./screens/Register"));
const Cities = React.lazy(() => import("./screens/Cities"));
const ItineraryCreate = React.lazy(() => import("./screens/ItineraryCreate"));
const About = React.lazy(() => import("./screens/About"));

export default function App() {
  const { state } = useContext(AppContext);

  return (
    <I18nProvider locale={state.siteLang}>
      <div id="interface">
        <Router>
          <MyNavbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/cities" component={Cities} />
              <Route
                path="/itineraries/:country/:city/:cityId"
                component={Itineraries}
              />
              <Route
                path="/itineraryCreate/:country/:city/:cityId"
                component={ItineraryCreate}
              />
              <Route path="/login" component={Login} />
              <Route
                path="/handleGoogleLogin/:token"
                component={HandleGoogleLogin}
              />
              <Route path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </I18nProvider>
  );
}
