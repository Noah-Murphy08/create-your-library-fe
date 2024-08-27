import { useState, useEffect } from 'react'
import * as bookService from '../../services/bookService'


const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleAddComment(formData)
        setFormData({ text: '' })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your review:</label>
            <textarea
                required
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChange}
            />

            <button type='submit'>Submit</button>
        </form>
    )
}


export default CommentForm