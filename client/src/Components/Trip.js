import React, { useState, useEffect } from 'react'
import EditForm from './EditForm';

const Trip = (props) =>{
    const [trip, setTrip] = useState([])
    const [error, setError] = useState("")
    const [editFormFlag, setEditFormFlag,] = useState(false)

    useEffect(() => {
        fetch(`/trips/${props.match.params.id}`)
        .then((r) => r.json())
        .then(data => {
            console.log("fetch all trips", data)
            if(data.error){
                setError(data.error)
            }else{
                setTrip(data)
            }
        })
    }, [])

    const deleteTrip = () =>{
        fetch(`/trips/${trip.id}`,{
          method: "DELETE",
          headers:{
            "Content-Type": "application/json"
          },
        })
        .then(() => {
            setTrip([]) 
        })
    }

    const editTrip = (expense) =>{
        fetch(`/trips/${trip.id}`,{
          method: "PATCH",
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body:JSON.stringify(expense)
        })
        .then(resp => resp.json())
        .then((data) => {
            setTrip(data) 
        })
        setEditFormFlag(false)
    }

    if (error ===''){
        return (
            <div>
                {trip.id > 0 ?
                    <div>
                        <h2 className='home'>{trip.title}</h2>
                        <p className='content'>{trip.content}</p>
                        <p>Added on - {trip.date}</p>
                        {editFormFlag ? <EditForm editTrip={editTrip} trip={trip} /> : <button className="submit-button" onClick={() => setEditFormFlag(true)}>Edit Trip</button>} 
                        <button className="submit-button" onClick={deleteTrip}> Delete Trip</button>
                    </div>
                    :
                    <div>
                        <h2>Trip Deleted ! - Click the view all button above to see all your remaining trips.</h2>
                    </div>
                }
                
            </div>
        )
    }else{
        return(
            <div>
                <h3>Not authorized - Please Sign up or Login</h3>
            </div>
            
        )
    }
}

export default Trip