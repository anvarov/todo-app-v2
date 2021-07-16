import React from 'react'
import Col from 'react-bootstrap/Col'
import {FcTodoList} from 'react-icons/fc'
function Logo() {
    return (
        <Col className='d-flex justify-content-center align-items-center'>
                <p className='d-inline-block' style={{transform: 'scale(2)', marginRight: 10}}>
                <FcTodoList />
                </p>
            
            <h1 className='d-inline'>Todo App</h1>
        </Col>
    )
}

export default Logo
