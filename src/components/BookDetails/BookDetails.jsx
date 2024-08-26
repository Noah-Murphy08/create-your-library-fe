import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as bookService from '../../services/bookService'


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
                    <p>like and dislike buttons</p>
                </section>
                <section>
                    <h2>Reviews</h2>
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