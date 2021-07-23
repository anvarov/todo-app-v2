import React from 'react';
import Row from 'react-bootstrap/Row';
import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';
// import { useAuth } from '../context/AuthProvider';

export default function Login() {
  // const {login, error, status, user} = useAuth()
  return (
    <Row className='p-5'>
      <Logo />
      <AuthForm type="login" />
    </Row>
  );
}
