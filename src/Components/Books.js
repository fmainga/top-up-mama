import Book from "./Book"

const Books = ({
  books,
  onFetchCharacters,
  fetchComments,
  addComment,
  showComments,
  toggleShowComments,
  showCharacters,
  toggleCharacters,
  characters,
  charactersCount,
  bookId,
  comments,
  commentId
}) => {
  return (
    <>
      {books.map((book) => (<Book key={book.id} book={book} onFetchCharacters={onFetchCharacters}
        fetchComments={fetchComments} addComment={addComment} showComments={showComments}
        toggleShowComments={toggleShowComments}
        showCharacters = {showCharacters}
        toggleCharacters = {toggleCharacters}
        characters = {characters}
        charactersCount= {charactersCount}
        bookId = {bookId}
        comments = {comments}
        commentId = {commentId}
      />))}
    </>
  )
}

export default Books