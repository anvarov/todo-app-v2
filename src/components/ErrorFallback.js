import React from 'react'
import errorVideo from '../media/error.mp4'

function ErrorFallback({error}) {
    return (
        <div>
            <video autoPlay loop muted>
                <source type='video/mp4' src={errorVideo}></source>
            </video>
            <p>Error Message <pre>sasas</pre></p>
        </div>
    )
}

export default ErrorFallback
