import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Logo from '../components/Logo';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { useAuth } from '../context/AuthProvider';
import { Redirect, useHistory } from 'react-router-dom';
import Todos from './Todos'

function Dashboard( ) {
  const {logout, user} = useAuth()
  // const initialState = React.useRef({isLoading: true, currentUser: null});
  // const [{isLoading, currentUser}, dispatch] = React.useReducer((s, a) => ({...s, ...a}), initialState.current)
  // const [filters, setFilters] = React.useState({})
  const history = useHistory()
  // const {logout, getCurrentUser} = useAuth()
  function handleLogout(){
    logout()
    history.push('/login')
  }
  // React.useEffect(() => {
  //   (async () => {
  //     const user = await getCurrentUser()
  //     dispatch({isLoading: false, currentUser: user})
  //   }
  //   )()
  // }, [getCurrentUser, dispatch])
  return user ? (
    <Container>
      <Row className='my-3 align-items-center'>
        <Col xs={12}>
          <Logo />
        </Col>
        <Col className='d-flex align-items-center justify-content-end'>
          <p className='my-auto mx-2'>Hello <strong>{user.username}</strong></p>
          <Button variant='outline-danger' onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Todos />
    </Container>
  ) : <Redirect to='/login' />;
}

export default Dashboard;
