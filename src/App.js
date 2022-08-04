
import './App.css';
import { useEffect, useState } from 'react'
import Header from './Components/Header';
import Books from './Components/Books';

function App() {
  const [showComments, setShowComments] = useState(false)
  const [showCharacters, setShowCharacters] = useState(false)
  const [books, setBooks] = useState([])
  const [comments, setComments] = useState([])
  const [characters, setCharacters] = useState([])
  const [bookId, setBookid] = useState([])
  const [charactersCount, setCharactersCount] = useState([])
  const [commentId, setCommentId] = useState([])
  useEffect(() => {
    const getBooks = async () => {
      const savedBooks = await fetchBooks()
      setBooks(savedBooks)
    }
    getBooks()
  }, [])
  // Fetch Books
  const fetchBooks = async () => {
    const data = await fetch('https://top-up-mama-app.herokuapp.com/api/books')
    const bk = await data.json()
    return bk
  }

  const fetchCharacters = async (id) => {
    toggleCharacters()
    const res = await fetch(`https://top-up-mama-app.herokuapp.com/api/book-characters/${id}`)
    const data = await res.json()
    console.log('Fetching Characters for:', id)
    console.log('Characters Info: ', data)
    setCharacters(data.characters)
    setBookid(data.bookId)
    setCharactersCount(data.charactersCount)
  }
  const fetchComments = async (id) => {
    toggleComments()
    const res = await fetch(`https://top-up-mama-app.herokuapp.com/api/comments/${id}`)
    const data = await res.json()
    console.log('Fetching Comments for:', id)
    console.log('Comments Info: ', data)
    setCommentId(data.id)
    setComments(data.comments)

  }
  const addComment = async (task) => {
    console.log(task)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: task.text })
    }
    const result = await fetch(`https://top-up-mama-app.herokuapp.com/api/comment/${task.bookId}`, requestOptions)
    const resultData = await result.json()
    console.log('Result Data', resultData)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }
  const toggleCharacters = () => {
    setShowCharacters(!showCharacters)
  }
  return (
    <div className="container">
      <Header title="Books" />
      <Books books={books} onFetchCharacters={fetchCharacters} fetchComments={fetchComments} addComment={addComment}
        showComments={showComments} toggleShowComments={toggleComments}
        showCharacters={showCharacters}
        toggleCharacters={toggleCharacters}
        characters={characters}
        bookId={bookId}
        charactersCount={charactersCount}
        comments={comments}
        commentId={commentId}
      />
    </div>
  );
}

export default App;
