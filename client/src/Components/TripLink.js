import React from 'react'
import { Link } from 'react-router-dom'

const TripLink = ({trip}) => {
    
    return (
        <div className='trip-link'>
            <Link to={`/trips/${trip.id}`} className='form-title'>
                <h3>{trip.title}</h3>
            </Link>
        </div>
    )
}

export default TripLink;