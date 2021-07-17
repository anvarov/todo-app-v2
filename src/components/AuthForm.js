import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAsync from '../hooks/useAsync';
import {useAuth} from '../context/AuthProvider'

function AuthForm({ onClick, onSubmitButton }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const { setData, setError, error, status, data, run, reset } = useAsync();
	const {register, login, logout} = useAuth()

  function handleSignUp(e) {
    e.preventDefault();
    run(onClick(username, password));
		window.history.pushState('', '', '/dashboard')
    };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId={true === 'login' ? 'formRememberMe' : 'confirmPassword'}
      >
        {true === 'login' ? (
          <></>
        ) : (
          // <Form.Check type="checkbox" label="Remember me" />
          <>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </>
        )}
      </Form.Group>
      <Button onClick={(e) => handleSignUp(e)} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AuthForm;
