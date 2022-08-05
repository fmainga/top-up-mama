import React from 'react'
import Character from './Character'
const Characters = ({characters, charactersCount, bookId}) => {
  return (
    <div className='characters'>
    { characters.map((char)=>(<Character key={char.character_id} 
    charactersCount = {charactersCount}
    bookId={bookId}
    character = {char}/>))} 
    </div>
  )
}

export default Characters