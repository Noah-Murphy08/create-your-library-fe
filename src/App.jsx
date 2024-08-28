import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import BookForm from './components/BookForm/BookForm';
import CommentForm from './components/CommentForm/CommentForm';
import LibraryList from './components/LibraryList/LibraryList';
import LibraryDetails from './components/LibraryDetails/LibraryDetails';
import * as authService from '../src/services/authService';
import * as bookService from '../src/services/bookService';
import * as libraryService from '../src/services/libraryService'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [books, setBooks] = useState([])
  const [libraries, setLibraries] = useState([])

  const navigate = useNavigate()

  const handleAddBook = async (bookFormData) => {
    const newBook = await bookService.create(bookFormData)
    setBooks([newBook, ...books])
    navigate('/books')
  }

  useEffect(() => {
    const fetchAllLibraries = async () => {
      const libraryData = await libraryService.index()
      setLibraries(libraryData)
    }
    if (user) fetchAllLibraries()
  }, [user])

  useEffect(() => {
    const fetchAllBooks = async () => {
      const booksData = await bookService.index()
      setBooks(booksData)
    }
    if (user) fetchAllBooks()
  }, [user])

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/books" element= {<BookList books={books} />} />
              <Route path="/books/:bookId" element={<BookDetails />} />
              <Route path="/books/new" element={<BookForm handleAddBook={handleAddBook} />} />
              <Route path='/books/:bookId/comments/:commentId/edit' element={<CommentForm />} />
              <Route path='/libraries' element={<LibraryList libraries={libraries} />} />
              <Route path='/libraries/:libraryId' element={<LibraryDetails books={books} />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
