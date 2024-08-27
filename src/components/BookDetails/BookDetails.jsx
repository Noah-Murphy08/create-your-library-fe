import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as bookService from '../../services/bookService'
import CommentForm from "../CommentForm/CommentForm"


const BookDetails = (props) => {
    const [book, setBook] = useState(null)

    const { bookId } = useParams()

    useEffect(() => {
        const fetchBook = async () => {
            const bookData = await bookService.show(bookId)
            setBook(bookData)
        }
        fetchBook()
    }, [bookId])

    const handleAddComment = async (commentFormData) => {
        const newComment = await bookService.createComment(bookId, commentFormData)
        setBook({ ...book, comments: [...book.comments, newComment] })
    }

    if (!book) return <main>Looking for Ohara Survivors...</main>
    return (
        <>
            <main>
                <header>
                    <h1>{book.title}</h1>
                    <h2>{book.genre}</h2>
                    <p>Written by: {book.author}</p>
                </header>
                <section>
                    <button type='submit'>
                        Like
                    </button>
                    <button type='submit'>
                        Dislike
                    </button>
                </section>
                <section>
                    <h2>Reviews</h2>
                    <CommentForm handleAddComment={handleAddComment} />
                    {!book.comments.length && <p>There are no comments.</p>}

                    {book.comments.map((comment) => (
                        <article key={comment._id}>
                            <header>
                                <p>
                                    {comment.owner.username}'s post
                                </p>
                            </header>
                            <p>{comment.text}</p>
                        </article>
                    ))}
                </section>
            </main>
        </>
    )
}


export default BookDetails