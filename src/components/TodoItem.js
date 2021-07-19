import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
// import Tag from './Tag'
import debounceFn from 'debounce-fn';
import { DataStore } from '@aws-amplify/datastore';
import { useFormik } from 'formik'
import { TodoModel } from '../models';

function TodoItem({filters}) {
    let status = React.useRef('idle')
    // const formik = useFormik({
    //     initialValues: {
    //         title: todo.title
    //     }
    // })
    console.log(filters)
    // const [title, setTitle] = React.useState('')
    const [todos, setTodos] = React.useState([])
    const [showEditForm, setShowEditForm] = React.useState(false)
    

    const deleteTodo = async (id) => {
        status.current = 'pending'
        const todoToDelete = await DataStore.query(TodoModel, id)
        status.current = 'resolved'
        DataStore.delete(todoToDelete)
    }

    const editTodo = async (todo, e) => {
        status.current = 'pending'
        await DataStore.save(TodoModel.copyOf(todo, item => {
            // console.log(e)
            // Update the values on {item} variable to update DataStore entry
            if (e.target.name === 'title' || e.target.name === 'description') {
                item[e.target.name] = e.target.value
            } else if (e.target.name === 'status') {
                item.status = todo.status === 100 ? 0 : 100
            }
            else {
                item[e.target.name] = e.target.value
            }
            status.current = 'resolved'
        }));



    }
    React.useEffect(() => {
        const fetchTodos = async () => {
            // status.current = 'pending'
            const fetchedTodos = await DataStore.query(TodoModel);
            setTodos(fetchedTodos)
            // status.current = 'resolved'
        }
        fetchTodos()
        
    })

    return todos.length !== 0 ? todos.map(todo => (
        <li key={todo.id}>
            <Row className='justify-content-space-between'>
                <Col>
                    <p>{todo.title}</p>
                </Col>
                <Col className='d-flex justify-content-start align-items-end flex-column'>
                    {
                        showEditForm ?
                            (
                                <Form.Group>
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control type='date' name='dueDate' value={todo.dueDate} onChange={(e) => editTodo(todo, e)} />
                                </Form.Group>
                            ) : <p>Due date: {todo.dueDate}</p>
                    }
                    <p>Status: {todo.status === 100 ? 'Completed' : 'Active'}</p>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control as='textarea'
                            name='description'
                            value={todo.description}
                            readOnly={!showEditForm}
                            onChange={(e) => editTodo(todo, e)} />
                    </Form.Group>
                </Form>
            </Row>
            {/* <Row>
                <ul>
                    <Tag />
                </ul>
            </Row> */}
            <Row>
                <Col>
                    {/* <Form> */}
                    {/* <Row>
                            <Form.Label>
                                <Alert variant={true ? 'primary' : 'danger'}>
                                    Status: {'0%'} complete
                                </Alert>
                            </Form.Label>
                        </Row> */}
                    {/* <Row>
                            <Col className='d-flex'>
                                <span><p>0%</p></span>
                                <Form.Range className='mx-1' />
                                <span><p>100%</p></span>
                            </Col>
                        </Row> */}
                    {/* </Form> */}
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                <Button variant='info' onClick={(e) => editTodo(todo, {target: {name: 'status'}})}>{todo.status === 100 ? 'Mark as active': 'Mark as complete'}</Button>

                    {
                        showEditForm ? (<Button className='m-2' variant='primary' onClick={(e) => setShowEditForm(false)}>Save</Button>) :
                            <Button className='m-2' variant='secondary' onClick={() => setShowEditForm(true)}>Edit</Button>
                    }
                    <Button variant='danger' onClick={() => deleteTodo(todo.id)}>Delete</Button>
                </Col>
            </Row>
        </li>
    )) : <p>No todos</p>
}

export default TodoItem
