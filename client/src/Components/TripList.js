import React, { useState, useEffect } from 'react';
import TripForm from './TripForm';
import TripLink from './TripLink';

const TripList = () => {
    const [trips, setTrips] = useState([])
    const [tripFormFlag, setTripFormFlag] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch("/trips")
          .then((r) => r.json())
          .then(data => {
            console.log("fetch all trips", data)
            if(data.error){
                setError(data.error)
            }else{
                setTrips(data)
            }
          })
    }, []);

    const addTrip = (trip) =>{
        fetch("/trips",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(trip)
        })
        .then(r => r.json())
        .then(data => {
            if (data.errors){
                alert("Please fill out the form completely. There should be at least one character in each text box.");
            }else{
                setTrips([...trips, data])
                setTripFormFlag(false)
            }
        })
    }

    const tripsList = trips.map( p => <TripLink key={p.id} trip={p} />)

    if (error ===''){
        return (
            <div>
                {trips.length > 0 ?
                    <div className="card">
                        <h3 className='form-title'>Here are all your trips. Just click to view!</h3>
                        {tripsList}
                        {tripFormFlag ? 
                            <TripForm addTrip ={addTrip}/>
                            :
                            <button className="submit-button" onClick={() => setTripFormFlag(true)}>Add New Trip</button>
                        }
                    </div>
                    :
                    <div>
                        <h3>No Trips Found</h3>
                        <h3>Click the button below to start</h3>
                        {tripFormFlag ? 
                            <TripForm addTrip ={addTrip}/>
                            :
                            <button className="submit-button" onClick={() => setTripFormFlag(true) }>Add New Trip</button>
                        }
                        <hr/>
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

export default TripList;