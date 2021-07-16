import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Tag from './Tag'

function TodoItem({todo = {}}) {
    return (
        <li key='todokey'>
            <Row className='justify-content-space-between'>
                <Col>
                    <p>{'{todo title}'}</p>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <p>Due date: {'{todo due}'}</p>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control as='textarea' value='soe' readOnly />
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <ul>
                    <Tag />
                </ul>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Row>
                            <Form.Label>
                                <Alert variant={true ? 'primary' : 'danger'}>
                                    Status: {'0%'} complete
                                </Alert>    
                            </Form.Label>
                        </Row>
                        <Row>
                            <Col className='d-flex'>
                                <span><p>0%</p></span>
                                <Form.Range className='mx-1'/>
                                <span><p>100%</p></span>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                    <Button variant='danger'>Delete</Button>
                </Col>
            </Row>
        </li>
    )
}

export default TodoItem
