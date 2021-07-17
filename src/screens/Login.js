import React from 'react';
import Row from 'react-bootstrap/Row';
import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';

export default function Login() {
  return (
    <Row className='p-5'>
      <Logo />
      <AuthForm variant="login" />
    </Row>
  );
}
