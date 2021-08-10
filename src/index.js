import ReactDOM from "react-dom";
import * as React from "react";
import Container from "react-bootstrap/Container";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import Logo from "./components/Logo";
import Dashboard from "./screens/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForm from "./components/AuthForm";

Amplify.configure(awsExports);

function AuthFormScreen({ type }) {
  return (
    <>
      <Logo />
      <AuthForm type={type} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Container fluid="sm">
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/login">
              <AuthFormScreen type="login" />
            </Route>
            <Route path="/register">
              <AuthFormScreen type="register" />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Container>
      </AuthProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
