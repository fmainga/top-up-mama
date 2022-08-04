import React from 'react'
import Character from './Character'
const Characters = ({characters, charactersCount, bookId}) => {
  return (
    <>
    { characters.map((char)=>(<Character key={char.character_id} 
    charactersCount = {charactersCount}
    bookId={bookId}
    character = {char}/>))} 
    </>
  )
}

export default Characters