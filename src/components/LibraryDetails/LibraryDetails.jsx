import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as libraryService from '../../services/libraryService'


const LibraryDetails = (props) => {
    const [library, setLibrary] = useState(null)

    const { libraryId } = useParams()

    useEffect(() => {
        const fetchLibrary = async () => {
            const libraryData = await libraryService.show(libraryId)
            setLibrary(libraryData)
        }
        fetchLibrary()
    }, [libraryId])

    if (!library) return <main>Loading...</main>

    const filterbooks = props.books.filter(book =>
        library.books.includes(book._id)
    )

    const eachGenre = filterbooks.reduce((accumulator, book) => {
        if (!accumulator[book.genre]) {
            accumulator[book.genre] = []
        }
        accumulator[book.genre].push(book)
        return accumulator
    }, {})

    return (
        <>
            <main>
                <header>
                    <h1>{library.name}</h1>
                    <h2>Located in {library.location}</h2>
                    <p>owned by {library.owner.username}</p>
                </header>
                <section>
                    <h2>Books:</h2>
                    {!library.books.length && <p>There are no books in this library.</p>}
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
                </section>
            </main>
        </>
    )
}


export default LibraryDetails