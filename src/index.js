import ReactDOM from 'react-dom';
import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
// import { QueryClientProvider, QueryClient } from 'react-query'
import Logo from './components/Logo'
// import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
// import App from './components/App'
// import FullPageSpinner from './components/FullPageSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthForm from './components/AuthForm';
// import PublicRoute from './components/PublicRoute';
Amplify.configure(awsExports);

// const queryClient = new QueryClient()

function AuthFormScreen({ type }) {
  return (
    <>
      <Logo />
      <AuthForm type={type} />
    </>
  )
}


function App() {
  // const initialState = React.useRef({isLoading: true, user: null});
  // const [{isLoading, user}, dispatch] = React.useReducer((s, a) => ({...s, ...a}), initialState.current)
  // const [filters, setFilters] = React.useState({})
  // const history = useHistory()
  // const {getCurrentUser} = useAuth()
  // const [user, setUser] = React.useState()
  // React.useEffect(() => {
  //   Auth.currentUserInfo().then(user => setUser(user))

  // }, [])
  // console.log(user)
 
  return (<Router>
    {/* <QueryClientProvider client={queryClient}> */}
      <AuthProvider>
        <Container fluid="sm">
          {/* <FullPageSpinner /> */}
          <Switch>
            <Route exact path='/dashboard' >
              <Dashboard />
            </Route>
            <Route exact path='/login'>
              <AuthFormScreen type='login' />
            </Route>
            <Route path='/register'>
              <AuthFormScreen type='register' />
            </Route>
          </Switch>
        </Container>
      </AuthProvider>
    {/* </QueryClientProvider> */}
  </Router>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
