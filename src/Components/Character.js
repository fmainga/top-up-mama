import React from 'react'

const Character = ({ character, charactersCount, bookId }) => {
    return (
        <div className="character">
            <hr></hr>
            <p>Name: <b>{character.character_name}</b></p>
            <p> Gender: <b>{character.character_gender}</b></p>
            <p>Age: <b>{character.age}</b></p>
        </div>
    )
}

export default Character