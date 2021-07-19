import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = (props) => {
    
    // props.user.length > 0 
    if (props.loggedIn){
        return (
            <div>
                <h1>Hello {props.user.username}</h1>
                <button className="logout-button" onClick={props.logoutUser}>Logout</button>
                <br/>
                <Link to="/trips">
                    <button className="submit-button">View all trips</button>
                </Link>
                <hr/>
            </div>
        )
    } else{
        return (
            <div>
                <br/>
                <Link to="/signup">
                    <button className="submit-button">Signup</button>
                </Link>
                <br/>
                <Link to="/login">
                    <button className="submit-button">Login</button>
                </Link>
            </div>
        )
    }
}

export default Navbar;