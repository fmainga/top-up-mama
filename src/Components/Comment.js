import React from 'react'
import { useState } from 'react'

const Comment = ({ comment, addComment, bookId}) => {
    const [text, setText] = useState([])
    const onSubmit = (e)=>{
        e.preventDefault()
        if(!text){
            alert('Please add a Comment')
            return 
        }
        addComment({text, bookId})
        setText('')

    }
    return (
        <div className='character'>
            <p> Authors IP address: <b>{comment.author_ip}</b></p>
            <p>Comment: <b>{comment.comment}</b></p>
            <p> Posted On: <b>{comment.posted_on}</b></p>
        </div>
    )
}

export default Comment