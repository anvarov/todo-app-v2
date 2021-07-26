import * as React from 'react'
import useAsync from '../hooks/useAsync'
import { Auth } from 'aws-amplify';


const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const { data: user, error, status, reset, run } = useAsync()

  // const getCurrentUser = React.useCallback(() => {
  //   return run(Auth.currentUserInfo())
  // }, [run])

  React.useEffect(() => {
    run(Auth.currentUserInfo())
  }, [run])

  const login = React.useCallback(
    ({ username, password }) => {
      return run(Auth.signIn({
        username, password
      }))
    }, [run]
  )
  const register = React.useCallback(
    ({ username, password }) => {
      return run(Auth.signUp({
        username,
        password,
        attributes: {
          preferred_username: username,
        }
      }))
    }, [run]
  )

  const logout = React.useCallback(
    () => {
      Auth.signOut()
      reset()
    }, [reset])


  const value = React.useMemo(
    () => ({ register, login, logout, user, status, error }), [register, logout, login, status, user, error]
    )

  return <AuthContext.Provider value={value} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }

