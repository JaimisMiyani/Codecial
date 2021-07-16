import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Messenger from "./Pages/Messenger/Messenger";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {console.log("app component render")}
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/messenger">
            {!user ? <Redirect to="/" /> : <Messenger />}
          </Route>
          <Route exact path="/profile/:username">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
