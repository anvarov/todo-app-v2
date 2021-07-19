import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify'

function PrivateRoute({ component: Component, ...rest }) {
     let user = React.useRef()
     React.useEffect(() => {
         (async () => {
             user.current = await Auth.currentAuthenticatedUser()
         })()
     })

    // const {user} = useAuth()
    console.log(user)
    return (
        <Route {...rest} render={props => (
            user.current ? <Component {...props} /> :
                <Redirect to='/login' />
        )} />
    )
}

export default PrivateRoute
