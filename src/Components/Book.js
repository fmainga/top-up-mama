import Characters from "./Characters"
import Comments from "./Comments"

const Book = ({book, onFetchCharacters, fetchComments, addComment, showComments,
showCharacters,characters, bookId, charactersCount,
comments,
commentId


}) => {
  return (
	<div className="book">
    <h3>Title: {book.book_name} </h3>
    <p>Authors: {book.authors}</p>
    <p>Comments: {book.comments.length}</p>
    <button className="btn" style={{backgroundColor:'green'}} onClick={()=>onFetchCharacters(book.book_id)}>Characters</button><button className="btn" style={{backgroundColor:'green'}} onClick={()=>fetchComments(book.book_id)}>Comments</button>
    {showComments && <Comments addComment= {addComment} bookId = {book.book_id} comments = {comments} commentId={commentId}/>}
    {showCharacters && <Characters characters={characters} bookId = {bookId} charactersCount={charactersCount}/>}
  </div>
  )
}

export default Book