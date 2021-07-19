
import * as React from 'react'
// import {queryCache} from 'react-query'
// import * as auth from 'auth-provider'
// import {client} from 'utils/api-client'
import useAsync from '../hooks/useAsync'
import { Auth } from 'aws-amplify';
// import {setQueryDataForBook} from 'utils/books'
// import {FullPageSpinner, FullPageErrorFallback} from 'components/lib'

// async function bootstrapAppData() {
//   let user = null

//   const token = await auth.getToken()
//   if (token) {
//     const data = await client('bootstrap', {token})
//     queryCache.setQueryData('list-items', data.listItems, {
//       staleTime: 5000,
//     })
//     for (const listItem of data.listItems) {
//       setQueryDataForBook(listItem.book)
//     }
//     user = data.user
//   }
//   return user
// }

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    reset,
    run,
    setData,
    setError,  
  } = useAsync()
  // const getCurrentUser = React.useCallback(() => {
  //   Auth.currentAuthenticatedUser()
  // }, [Auth.currentAuthenticatedUser])
  React.useEffect(() => {
        run(Auth.currentUserInfo())
    }, [run])
    
  // function getCurrentUser(){
  //   run(Auth.currentSession())
  // }
  const login = React.useCallback(
    ({username, password}) => Auth.signIn({
        username,
        password,
    }).then(user => setData(user), error => setError(error)),
    [setData, setError],
  )

  const register = React.useCallback(
    ({username, password}) => Auth.signUp({
        username,
        password,
        attributes: {
          preferred_username: username, 
        }
    }).then(user => setData(user), error => setError(error)),
    [setData, setError],
  )
  const logout = React.useCallback(() => {
    Auth.signOut()    // queryCache.clear()
    setData(null)
    setError(null)
  }, [setData, setError])

  const value = React.useMemo(
    () => ({login, logout, reset, register, status, error, setError, setData}),
    [login, logout, register, reset, status, error, setError, setData],
  )

  return <AuthContext.Provider value={{...value, user}} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

// function useClient() {
//   const {user} = useAuth()
//   const token = user?.token
//   return React.useCallback(
//     (endpoint, config) => client(endpoint, {...config, token}),
//     [token],
//   )
// }

export {AuthProvider, useAuth}

