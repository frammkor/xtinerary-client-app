import React, { Suspense } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'jquery/dist/jquery.min.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
// <COMPONENTS
import MyNavbar from "./components/MyNavbar.jsx";
import Home from "./components/Home";
// lazy loaded
const HandleGoogleLogin = React.lazy(() =>
  import("./components/HandleGoogleLogin")
);
const Itineraries = React.lazy(() => import("./components/Itineraries"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const CityList = React.lazy(() => import("./components/CityList"));
const ItineraryCreate = React.lazy(() =>
  import("./components/ItineraryCreate")
);
const About = React.lazy(() => import("./components/About"));

// const OtherComponent = React.lazy(() => import('./components/'));
// COMPONENTS>

export default function App() {
  return (
    <div id="interface">
      <Router>
        <MyNavbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/cities" component={CityList} />
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
  );
}
