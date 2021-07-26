import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
    const {user, status} = useAuth()
    
    return (
        <Route {...rest} render={props => (
            user && (status === 'resolved' || status === 'idle') ? <Component {...props} /> :
                <Redirect to='/login' />
        )} />
    )
}

export default PrivateRoute
