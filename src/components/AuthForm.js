import React from 'react';
// import { Auth } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import useAsync from '../hooks/useAsync';
import { useAuth } from '../context/AuthProvider'
import { useFormik } from 'formik'
import { useHistory } from 'react-router';
import * as Yup from 'yup'
import Alert from 'react-bootstrap/Alert';

function AuthForm({ type }) {
  const [show, setShow] = React.useState(false)
  const { register, login, error, status, reset, user } = useAuth()
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      type
    },
    validationSchema: Yup.object({
      type: Yup.string().oneOf(['login', 'register']),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
        .when('type', {
          is: 'register',
          then: Yup.string().min(5, 'Must be at least 6 characters'),
        }),
      confirmPassword: Yup.string()
        .when('type', {
          is: 'register',
          then: Yup.string().required('Confirm password is required')
            .test('password-match', 'Passwords must match', function (value) {
              return this.parent.password === value
            })
        })
    }),
    onSubmit: values => {
      if (formik.values.type === 'login') {
        login(values)
      } else {
        register(values)
      }
      console.log(error)
      console.log(user  )
      if (user) {
        console.log('succes')
        history.push('/dashboard')
      } else {
        setShow(true)
      }
    } 
  })
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [username, setUsername] = useState('');
  // const { setData, setError, error, status, data, run, reset } = useAsync();

  // function handleRegister(e) {
  //   e.preventDefault();
  //   register({username, password});
  // 	window.history.pushState('', '', '/dashboard')
  //   };

  // function handleLogin(e){
  //   e.preventDefault()
  //   login({username, password})
  // }
  return (
    <Form>
      {show && status === 'rejected' ? (
        <Alert variant='danger' dismissible
          onClose={() => {
            setShow(false)
            formik.resetForm()
          }}>
          {error?.message}
        </Alert>
      ) : null}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name='username'
          type="text"
          placeholder="Username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username ? (
          <Alert className='my-2' variant='danger'>{formik.errors.username}</Alert>
        ) : null}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password ? (
          <Alert className='my-2' variant='danger'>{formik.errors.password}</Alert>
        ) : null}
      </Form.Group>
      {type === 'login' ? (
        null
      ) : (
        <>
          <Form.Group
            className='mb-3'
            controlId='formEmail'
          >
            <Form.Label>Email</Form.Label>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId='confirmPassword'
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name='confirmPassword'
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Alert className='my-2' variant='danger'>{formik.errors.confirmPassword}</Alert>
            ) : null}
          </Form.Group>
        </>
      )}
      <Button onClick={formik.handleSubmit}
        disabled={formik.isSubmitting}
        variant="primary" type="submit">
        {type === 'login' ? 'Login' : 'Register'}
      </Button>
    </Form>
  );
}

export default AuthForm;
