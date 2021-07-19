import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import Logo from './components/Logo'
// import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
// import App from './components/App'
// import FullPageSpinner from './components/FullPageSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthForm from './components/AuthForm';
import PublicRoute from './components/PublicRoute';
Amplify.configure(awsExports);

function Login(){
  return (
    <>
      <Logo />
      <AuthForm type='login' />
    </>
  )
}
const App = (
<Router> 
  <AuthProvider>
  <Container fluid="sm">
        {/* <FullPageSpinner /> */}
        <Switch>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/login' component={Login} />
            <Route path='/register'>
              <Logo />
              <AuthForm type='register' />
            </Route>
        </Switch>
    </Container>
  </AuthProvider>
</Router>
);

ReactDOM.render(App, document.getElementById('root'));
