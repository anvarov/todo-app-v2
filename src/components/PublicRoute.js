import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

function PublicRoute({component:Component, ...rest}) {
    const user = useAuth()
    console.log(rest, 'rest props')
    return (
        <Route {...rest} render={props => (
            user ? <Redirect to='/dashboard' /> : <Component {...props} />
        )} />
    )
}

export default PublicRoute
