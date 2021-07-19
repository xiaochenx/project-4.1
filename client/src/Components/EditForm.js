import React, { useState, useEffect } from 'react'

const EditForm = ({editTrip, trip}) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        setTitle(trip.title)
        setContent(trip.content)
        setDate(trip.date)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        editTrip({
            title: title,
            content: content,
            date: date
        })
    }

    return (
        <div>
            <form className="sign-up" onSubmit={handleSubmit}>
                <h3 className='form-title'>This form allows you to edit the trip above.</h3>
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
                <input className="submit-button" type="submit"/>
            </form>
        </div>
    )
}

export default EditForm;