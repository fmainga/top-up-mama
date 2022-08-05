import React from 'react'
import { useState } from 'react'
import Comment from './Comment'

const Comments = ({addComment, bookId, comments, commentId}) => {
    const [text, setText] = useState([])

    const onSubmit = (e)=>{
        e.preventDefault()
        if(!text){
            alert('Please add comment')
            return
        }
        addComment({text, bookId})
        setText('')
    }
  return (
    <div className='book'>
    {comments.map((comment)=>(<Comment key={comment.comment_id} comment = {comment} commentId={commentId}/>))}
    <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Add Comment</label>
                    <input type='text' placeholder='Add comment' required value={text} onChange={(e) => {
                        setText(e.target.value)
                    }}></input>
                </div>
                <input type='submit' value='Add Comment' className='btn btn-block' />

            </form>
    </div>
  )
}

export default Comments