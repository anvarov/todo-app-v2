import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchInput from '../components/SearchInput';
import Logo from '../components/Logo';
import Accordion from 'react-bootstrap/Accordion'
// import Form from 'react-bootstrap/Form'
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem'
// import Button from 'react-bootstrap/Button'

function Dashboard() {
  return (
    <Container>
      <Row className='my-3'>
        <Logo />
      </Row>
      <Row className='mb-3'>
        <Accordion className='my-3' defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add Todo</Accordion.Header>
            <Accordion.Body>
              <TodoInput />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row className='mb-4'>
        <SearchInput />
      </Row>
      <Row>
          <h3>Todos</h3>
          <ol className='ml-4'>
						<TodoItem />
					</ol>
      </Row>
    </Container>
  );
}

export default Dashboard;
