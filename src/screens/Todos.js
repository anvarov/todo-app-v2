import React from 'react'
// import { DataStore } from '@aws-amplify/datastore';
import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem'
import SearchInput from '../components/SearchInput';
// import { TodoModel } from '../models';
import useAsync from '../hooks/useAsync';


// const actions = {
//     ADD_TODO: 'add_todo',
//     EDIT_TODO: 'edit_todo',
//     DELETE_TODO: 'delete_todo',
//     RESET_FILTER: 'reset_filters',
//     SET_FILTER: 'set_filter',
//     SET_TODOS: 'set_todos'
// }
const TodoContext = React.createContext()
TodoContext.displayName = 'TodoContext'
function Todos() {
    // const [{ filters }, setFilters] = React.useReducer((s, a) => ({ ...s, ...a }), { filters: {} })
    const { filters, error, status, setState: dispatch, setError, todos } = useAsync({filters: {}, todos: []})
    // function reducer(state, action) {
    //     let copyState;
    //     switch (action.type) {
    //         case actions.ADD_TODO:
    //             copyState = { ...state }
    //             copyState.todos = [...copyState.todos, action.payload]
    //             return { ...copyState };
    //         case actions.EDIT_TODO:
    //             copyState = { ...state }
    //             copyState.todos = copyState.todos.map(todo => {
    //                 if (todo.id === action.payload.id) {
    //                     return action.payload
    //                 }
    //                 return todo
    //             })
    //             return { ...copyState }
    //         case actions.DELETE_TODO:
    //             copyState = { ...state }
    //             copyState.todos = copyState.todos.filter(todo => {
    //                 // console.log(todo.id, 'todo id to dlete')
    //                 // console.log(action.payload.id, 'model payload id')
    //                 if (todo.id !== action.payload.id) {
    //                     return true
    //                 }
    //                 return false
    //             })
    //             return { ...copyState }
    //         case actions.SET_TODOS:
    //             copyState = { ...state }
    //             copyState.todos = action.payload
    //             return { ...copyState }
    //         default:
    //             throw new Error('this line should not be reached, check your action types')
    //     }
    // }
    // const initialState = React.useRef({ filters: [], todos: [] })
    // const [{ filters, todos }, dispatch] = React.useReducer(reducer, initialState.current)
    // const addTodo = (dispatch, todo) => dispatch({type: actions.ADD_TODO, payload: todo})
    console.log(filters, 'filter')
    console.log(status, 'status')
    const value = React.useMemo(() => (
        { filters, dispatch, setError, status, error, todos }
    ), [filters, dispatch, setError, status, error, todos]
    )
    
    return (
        <div>
            <TodoContext.Provider value={value}>
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
            </TodoContext.Provider>
        </div>
    )
}
// const addTodo = (dispatch, todo) => dispatch({ type: actions.ADD_TODO, payload: todo })
// const editTodo = (dispatch, updates) => dispatch({ type: actions.EDIT_TODO, payload: updates })
// const deleteTodo = (dispatch, todo) => dispatch({ type: actions.DELETE_TODO, payload: todo })
// const setTodos = (dispatch, todos) => dispatch({ type: actions.SET_TODOS, payload: todos })
function useTodos(){
    const context = React.useContext(TodoContext)
    if (!context){
        throw new Error('this hook should be called inside Todos provider')
    }
    return context
}
export { useTodos }
export default Todos

