import { Link, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import * as bookService from '../../services/bookService'
import CommentForm from "../CommentForm/CommentForm"
import { AuthedUserContext } from "../../App"


const BookDetails = (props) => {
    const [book, setBook] = useState(null)

    const user  = useContext(AuthedUserContext)
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

    const handleDeleteComment = async (commentId) => {
        const deletedComment = await bookService.deleteComment(bookId, commentId)
        setBook({ ...book,
            comments: book.comments.filter((comment) => comment._id !== commentId)
        })
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
                                {comment.owner._id === user._id && (
                                    <>
                                        <Link to={`/books/${bookId}/comments/${comment._id}/edit`}>Edit Comment</Link>
                                        <button onClick={() => handleDeleteComment(comment._id)}>
                                            Delete Comment
                                        </button>
                                    </>
                                )}
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