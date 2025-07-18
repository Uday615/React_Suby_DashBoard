import React from 'react'
import  {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <>
    <div className='error-section'>
    <Link to="/" style={{ color: 'black', fontSize: '20px'}}>
    <p>
        Go Back
    </p>
    </Link>
    
        <h1>404</h1>
        <div>Page Not Found</div>
    </div>
    </>
  )
}

export default NotFound