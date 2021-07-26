import React from 'react';
// import { Auth } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import useAsync from '../hooks/useAsync';
import { useAuth } from '../context/AuthProvider'
import { useFormik } from 'formik'
import { useHistory, Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup'
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import {useQuery} from 'react-query'
// import {Auth} from 'aws-amplify'

function AuthForm({ type }) {
  const [show, setShow] = React.useState(false)
  const { register, login, error, status, user } = useAuth()
  const history = useHistory()
  // React.useEffect(() => {
  //   console.log(user, 'useeeffect')
  //   if (user){
  //     <Redirect to='/dashboard' />
  //   }
  // }, [user])
  function handleDemoLogin(e) {
    e.preventDefault()
    login({ username: 'demoUser', password: 123456 })
      .then(user => history.push('/dashboard'))
  }
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
          .then(user => history.push('/dashboard'))
          .catch(error => {
            console.info(error)
            setShow(true)
          })
      } else {
        register(values)
          .then(user => history.push('/dashboard'))
          .catch(
            error => {
              console.log(error)
              setShow(true)
            }
          )
      }
    }
  })

  return user ? <Redirect to='/dashboard' /> : (
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
      <Row>
        <Col className=''>

          <Button onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            variant="primary" type="submit">
            {type === 'login' ? 'Login' : 'Register'}
          </Button>
          {type === 'login' ?
            <>
              <Button onClick={e => handleDemoLogin(e)}
                disabled={formik.isSubmitting}
                className='mx-2'
                variant="secondary" type="submit">
                Demo Login
              </Button>
              <Link to='/register'>
                <Button>Create Account</Button>
              </Link>
            </>
            : <Link to='/login'>
              <Button className='mx-2'>Back to login</Button>
            </Link>}
        </Col>
      </Row>
    </Form>
  );
}

export default AuthForm;
