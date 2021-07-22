import React from 'react'
export function useAsync(asyncFunction, immediate = true){
    if (!asyncFunction || !asyncFunction.then){
        throw new Error('execute needs a promise for argument')
    }
    const [status, setStatus] = React.useState('idle')
    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)

    const execute = React.useCallback(() => {
        setStatus('pending')
        setError(null)
        setData(null)
        return asyncFunction()
            .then(response => {
                setData(response)
                setStatus('success')
            })
            .catch(error => {
                setError(error)
                setStatus('rejected')
            })
    }, [asyncFunction])

    React.useEffect(() => {
        if (immediate){
            execute()
        }
        
    }, [execute, immediate])

    return {status, data, error, execute}
}