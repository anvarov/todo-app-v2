import ReactDOM from 'react-dom'
import Container from 'react-bootstrap/Container'
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
// import Login from './screens/Login'
import Dashboard from './screens/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
Amplify.configure(awsExports);


const App = (
    <Container fluid='sm'>
        <Dashboard />
    </Container>
)

ReactDOM.render(App, document.getElementById('root'))