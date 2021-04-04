import React from 'react'
import {Link } from 'react-router-dom'

export const About = () => {
    return (
        <div>
            <h4> Version 1.0.0 </h4>
            <p> Hi our team consist of two third-year students 
                from University of Virginia. This website enables
                you to subscribe to our automatic news feed service
                which allows you to receive a news update sent to 
                your email every day!
                You can always unsubscribe our service by clicking 
                the unsubscribe button on our page. 

            </p>
<Link to= '/'> Go Back</Link>
        </div>
    )
}
export default About