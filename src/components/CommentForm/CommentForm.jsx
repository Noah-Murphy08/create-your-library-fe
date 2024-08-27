import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as bookService from '../../services/bookService'


const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' })

    const { bookId, commentId } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await bookService.show(bookId)
            setFormData(bookData.comments.find((comment) => comment._id === commentId))
        }
        if (bookId && commentId) fetchBook()
    }, [bookId, commentId])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (bookId && commentId) {
            bookService.updateComment(bookId, commentId, formData)
            navigate(`/books/${bookId}`)
        } else {
            props.handleAddComment(formData)
        }
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