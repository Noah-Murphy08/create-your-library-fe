import { Link } from "react-router-dom"



const LibraryList = (props) => {

    return (
        <>
            <main>
                {props.libraries.map((library) => (
                    <Link key={library._id} to={`/libraries/${library._id}`}>
                        <h2>
                            {library.name}
                        </h2>
                    </Link>
                ))}
            </main>
        </>
    )
}


export default LibraryList