import * as React from 'react'
import useAsync from '../hooks/useAsync'
import { Auth } from 'aws-amplify';


const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const { data: user, error, status, reset, run } = useAsync()

  const getCurrentUser = React.useCallback(() => {
    return run(Auth.currentUserInfo())
  }, [run])

  // React.useEffect(() => {
  //   getCurrentUser()
  // }, [getCurrentUser])

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
    () => ({ register, login, logout, user, status, error, getCurrentUser }), [register, logout, login, getCurrentUser, status, user, error])

  return <AuthContext.Provider value={{ ...value, user }} {...props} />
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

export { AuthProvider, useAuth }

