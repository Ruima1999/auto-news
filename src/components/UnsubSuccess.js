import React from 'react'
import {Link} from 'react-router-dom'
const success = () => {
    return (
        <div class="container">
            <h3> Success!</h3>
            <p> You have successfully unsubscribed from our service!</p>
        
         <Link to ='/'> Go Back</Link>
         </div>
    )
}

export default success