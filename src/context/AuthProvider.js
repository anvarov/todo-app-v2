import * as React from 'react'
import useAsync from '../hooks/useAsync'
import { Auth } from 'aws-amplify';


const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  // useAsync(Auth.currentUserInfo())
  const { data: user, error, status, setData, setError, reset } = useAsync()
  // const {data: currentUser, error, status} = useAsync(Auth.currentUserInfo)
  // const useLogin = ({ username, password }) =>
  //   useAsync((username, password) => Auth.signIn({ username, password }), false)
  // const useRegister = ({ username, password }) =>
  //   useAsync((username, password) => Auth.signUp({
  //     username,
  //     password,
  //     attributes: {
  //       preferred_username: username,
  //     }
  //   }), false)
  // const getCurrentUser = React.useCallback(() => {
  //   Auth.currentAuthenticatedUser()
  // }, [Auth.currentAuthenticatedUser])



  // function getCurrentUser(){
  //   run(Auth.currentSession())
  // }
  // React.useEffect(() => {
  //   run(Auth.currentSession())
  // }, [run])

  const login = React.useCallback(
    ({ username, password }) => {
      reset()
      Auth.signIn({
        username, password
      }).then(
        user => {
          setData(user)
          return user
        }).catch(error => {
          setError(error)
          return Promise.reject(error)
        })
    }, [setData, setError, reset]
  )
  const register = React.useCallback(
    ({ username, password }) => {
      reset()
      Auth.signUp({
        username,
        password,
        attributes: {
          preferred_username: username,
        }
      }).then(
          user => {
          setData(user)
          return user
        }
      )
        // console.log(user, 'from auth provid')

        .catch(error => {
          setError(error)
          return Promise.reject(error)
        })
    }, [setData, setError, reset]
  )
  // const register = React.useCallback(
  //   ({username, password}) => Auth.signUp({
  //     username, 
  //     password,
  //     attributes: {
  //       preferred_username: username
  //     }
  //   }), []
  // )
  // const logout = React.useCallback(() => {
  //   Auth.signOut()    // queryCache.clear()
  //   setData(null)
  //   setError(null)
  // }, [setData, setError])

  // const value = React.useMemo(
  //   () => ({ login, logout, reset, register, status, error, setError, setData }),
  //   [login, logout, register, reset, status, error, setError, setData],
  // )
  const value = React.useMemo(
    () => ({ register, login, user, status, error }), [register, login, status, user, error])

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

