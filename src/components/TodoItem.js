import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import useAsync from '../hooks/useAsync'
// import Tag from './Tag'
import debounceFn from 'debounce-fn';
import { DataStore } from '@aws-amplify/datastore';
import { useFormik } from 'formik'
import { TodoModel } from '../models';
import {deleteTodo, editTodo, setTodos, TodoContext} from '../screens/Todos'

function TodoItem() {
    const {run, status, error, data} = useAsync()
    const {dispatch, filters, todos} = React.useContext(TodoContext)
    // const formik = useFormik({
    //     initialValues: {
    //         title: todo.title
    //     }
    // })
    console.log(filters, 'filters')
    // const [title, setTitle] = React.useState('')
    // const [todos, setTodos] = React.useState([])
    const [showEditForm, setShowEditForm] = React.useState(false)
    

    const deleteTodoAsync = async (id) => {
        const todoToDelete = await DataStore.query(TodoModel, id)
        DataStore.delete(todoToDelete)
        console.log(todoToDelete, 'todoTodelete')
        deleteTodo(dispatch, todoToDelete)
    }

    const editTodoAsync = async (todo, e) => {
        const editedTodo = await DataStore.save(TodoModel.copyOf(todo, item => {
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
        }));
        editTodo(dispatch, editedTodo)

    }
    React.useEffect(() => {
        const fetchTodos = async () => {
                const fetchedTodos = await DataStore.query(TodoModel);
                console.log(fetchedTodos, 'fetchedTodos')
                setTodos(dispatch, fetchedTodos)
                // return [{
                //     filters: [], todos: fetchedTodos
                // }]
                // status.current = 'resolved'
            }
            fetchTodos()
        
    }, [dispatch])

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
                                    <Form.Control type='date' name='dueDate' value={todo.dueDate} onChange={(e) => editTodoAsync(todo, e)} />
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
                            onChange={(e) => editTodoAsync(todo, e)} />
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
                <Button variant='info' onClick={(e) => editTodoAsync(todo, {target: {name: 'status'}})}>{todo.status === 100 ? 'Mark as active': 'Mark as complete'}</Button>

                    {
                        showEditForm ? (<Button className='m-2' variant='primary' onClick={(e) => setShowEditForm(false)}>Save</Button>) :
                            <Button className='m-2' variant='secondary' onClick={() => setShowEditForm(true)}>Edit</Button>
                    }
                    <Button variant='danger' onClick={() => deleteTodoAsync(todo.id)}>Delete</Button>
                </Col>
            </Row>
        </li>
    )) : <p>No todos</p>
}

export default TodoItem
