import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Row from 'react-bootstrap/Row'
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem'
import SearchInput from '../components/SearchInput';
import useAsync from '../hooks/useAsync';

const TodoContext = React.createContext()
TodoContext.displayName = 'TodoContext'
function Todos() {
    const { filters, error, status, setState: dispatch, setError, todos } = useAsync({filters: {}, todos: []})
    const value = React.useMemo(() => (
        { filters, dispatch, setError, status, error, todos }
    ), [filters, dispatch, setError, status, error, todos]
    )
    
    return (
        <div>
            <TodoContext.Provider value={value}>
                <Row className='mb-3'>
                    <Accordion className='my-3'>
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
                    <h3 style={{marginBottom: '10px'}}>Todos</h3>
                    <ol className='ml-4'>
                        <TodoItem />
                    </ol>
                </Row>
            </TodoContext.Provider>
        </div>
    )
}
function useTodos(){
    const context = React.useContext(TodoContext)
    if (!context){
        throw new Error('this hook should be called inside Todos provider')
    }
    return context
}
export { useTodos }
export default Todos

