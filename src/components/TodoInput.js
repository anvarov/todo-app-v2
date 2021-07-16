import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function TodoInput() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="todoTitle">
          <Form.Label>Todo Title</Form.Label>
          <Form.Control type="text" placeholder="Todo title" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Due date</Form.Label>
          <Form.Control type="date" placeholder="Due date" />
        </Form.Group>
      </Row>
      <Form.Group controlId="todoDescription" className="mb-4">
        <Form.Label>Todo Description</Form.Label>
        <Form.Control as="textarea" rows="5" placeholder="Todo description" />
      </Form.Group>
      <Row className='mb-4'>
        <InputGroup>
          <FormControl
            aria-label="Add tag"
          />
          <Button variant="outline-secondary" id="addTagButton">
            Add Tag
          </Button>
        </InputGroup>
      </Row>
      <Row className='justify-content-end'>
        <Col md='auto'>
          <Button>
            Add Todo
          </Button>
        </Col>
        <Col md='auto'>
          <Button variant='danger'>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TodoInput;
