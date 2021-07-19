import React from 'react';
// import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DataStore } from '@aws-amplify/datastore';
import { TodoModel } from '../models';

function TodoInput() {

  const formik = useFormik({
    initialValues: {
      title: '',
      dueDate: new Date().toISOString().slice(0, 10),
      description: '',
      status: 0
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      dueDate: Yup.date().required('Date is required'),
      status: Yup.number().required('Status is required')
    }),
    onSubmit: 
      async () => {
        await DataStore.save(
          new TodoModel({
            "title": formik.values.title,
            "description": formik.values.description,
            "dueDate": formik.values.dueDate,
            "status": 0
          })
        );
      }
  })
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="title">
          <Form.Label>Todo Title</Form.Label>
          <Form.Control
            name='title'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type="text" placeholder="Todo title" />
          {formik.touched.title && formik.errors.title ? (
            <Alert className='my-2' variant='danger'>{formik.errors.title}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Due date</Form.Label>
          <Form.Control
            name='dueDate'
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="date" placeholder="Due date" min={new Date().toISOString().slice(0, 10)} />
          {formik.touched.dueDate && formik.errors.dueDate ? (
            <Alert className='my-2' variant='danger'>{formik.errors.dueDate}</Alert>
          ) : null}
        </Form.Group>
      </Row>
      <Form.Group controlId="todoDescription" className="mb-4">
        <Form.Label>Todo Description</Form.Label>
        <Form.Control
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          as="textarea" rows="5" placeholder="Todo description" />
        {formik.touched.description && formik.errors.description ? (
          <Alert className='my-2' variant='danger'>{formik.errors.description}</Alert>
        ) : null}
      </Form.Group>
      {/* <Row className='mb-4'>
        <InputGroup>
          <FormControl
            aria-label="Add tag"
          />
          <Button variant="outline-secondary" id="addTagButton">
            Add Tag
          </Button>
        </InputGroup>
      </Row> */}
      <Row className='justify-content-end'>
        <Col md='auto'>
          <Button 
          onClick={formik.handleSubmit}
          >
            Add Todo
          </Button>
        </Col>
        <Col md='auto'>
          <Button variant='danger' onClick={formik.handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TodoInput;
