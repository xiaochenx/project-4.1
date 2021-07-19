import React, { useState } from 'react'

const TripForm = ({addTrip}) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        addTrip({
            title: title,
            content: content,
            date: date
        })
    }

    return (
        <div>
            <form className="trip-form" onSubmit={handleSubmit}>
                <h3 className='form-title'>Complete the form below to add a new trip!</h3>
                <label>Title</label>
                <br/>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <br/>
                <br/>
                <label>Content</label>
                <br/>
                <textarea type="text" id="content" rows="4" cols="50" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <br/>
                <br/>
                <label>Date</label>
                <br/>
                <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <br/>
                <br/>
                <input className="submit-button" type="submit"/>
            </form>
        </div>
    )
}

export default TripForm;