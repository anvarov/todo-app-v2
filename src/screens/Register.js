import React from 'react';
import Row from 'react-bootstrap/Row';
import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';

export default function Register() {
  return (
    <Row className='py-5'>
      <Logo />
      <AuthForm type="register" />
    </Row>
  );
}
