// // import './App.css';
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
// import Home from './Components/Home';
// import Navbar from './Components/Navbar';
// import Signup from './Components/Signup';
// // import Login from './Components/Login';
// // import TripList from './Components/TripList';
// // import Trip from './Components/Trip';



// function App() {


//   const [loggedIn, setLoggedIn] = useState(false)
//   const [user, setUser] = useState({})
//   // const history = useHistory()
//   // const [loginError, setLoginError] = useState("")





//   // useEffect(() => {
//   //   // auto-login
//   //   fetch('/me')
//   //   .then(response => {
//   //     if(response.ok) {
//   //       response.json()
//   //       .then( user => {
//   //         setLoggedIn(true)
//   //         setUser(user)
//   //       })
//   //     }else{
//   //       setLoginError(response.statusText)
//   //     }
//   //   })
//   // }, [])


//   // const LoginUser= (u) => {
//   //   if(u.error == "Invalid username or password"){
//   //     setLoggedIn(false)
//   //     alert(loginError);
//   //   }else if (u.error == "Internal Server Error"){
//   //     setLoggedIn(false)
//   //     alert("Please make sure the signup form is complete.");
//   //   }else{
//   //     setLoggedIn(true)
//   //     setUser(u)
//   //     history.push('/')
//   //   }
//   // }


//   // const logoutUser = () => {
//   //   fetch('/logout', {
//   //     method: 'DELETE'
//   //   })
//   //   .then(() => {
//   //     console.log('logged out')
//   //     setLoggedIn(false)
//   //     setUser({})
//   //   }) 
//   //   history.push('/')
//   // }

//   return (
//     <div className="App">
      
//       {/* <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} loginError={loginError}/> */}
//       <Router>
//       <Navbar user={user} loggedIn={loggedIn} />
//       <Switch>
//         <Route exact path="/" component={Home}/>
//         {/* <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={LoginUser}/>}/>
//         {/* <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={LoginUser} />}/>
//         <Route exact path="/trips" render={routerProps => <TripList {...routerProps} user={user} loggedIn={loggedIn}/>}/>
//         <Route exact path="/trips/:id"  component={Trip}/> */} */}
//       </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;




import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory ,withRouter} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import TripList from './Components/TripList';
import Trip from './Components/Trip';

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  //const history = useHistory()
  const [loginError, setLoginError] = useState("")
console.log(props)
const history=props.history
  useEffect(() => {
    // auto-login
    fetch('/me')
    .then(response => {
      if(response.ok) {
        response.json()
        .then( user => {
          setLoggedIn(true)
          setUser(user)
        })
      }else{
        setLoginError(response.statusText)
      }
    })
  }, [])

  const LoginUser= (u) => {
    if(u.error == "Invalid username or password"){
      setLoggedIn(false)
      alert(loginError);
    }else if (u.error == "Internal Server Error"){
      setLoggedIn(false)
      alert("Please make sure the signup form is correct. It should include a username, and matching passwords.");
    }else{
      setLoggedIn(true)
      setUser(u)
     history.push('/')
    }
  }

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(() => {
      console.log('logged out')
      setLoggedIn(false)
      setUser({})
    }) 
    history.push('/')
  }

  return (
    <div className="App">
      
   

     
      <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} loginError={loginError}/> 
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={LoginUser}/>}/>
        
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={LoginUser} />}/>
        
        <Route exact path="/trips" render={routerProps => <TripList {...routerProps} user={user} loggedIn={loggedIn}/>}/>
        <Route exact path="/trips/:id"  component={Trip}/>
      </Switch>
  
      
    </div>
  );
}

export default withRouter(App);
