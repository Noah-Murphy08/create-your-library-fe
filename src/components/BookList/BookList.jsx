import { Link } from "react-router-dom"


const BookList = (props) => {
    const eachGenre = props.books.reduce((accumulator, book) => {
        if (!accumulator[book.genre]) {
            accumulator[book.genre] = []
        }
        accumulator[book.genre].push(book)
        return accumulator
    }, {})

    return (
        <>
            <main>
                {Object.keys(eachGenre).map((genre) => (
                    <div key={genre}>
                        <h2>{genre}</h2>
                        <ul>
                            {eachGenre[genre].map((book) => (
                                <Link key={book._id} to={`/books/${book._id}`}>
                                    <li key={book._id}>{book.title} written by {book.author}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </main>
        </>
    )
}


export default BookList