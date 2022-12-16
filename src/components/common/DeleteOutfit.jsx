import React, {useState} from 'react'
import { IconContext } from 'react-icons';
import { CiSquareRemove } from 'react-icons/ci';

const DeleteOutfit = ({deleteCard}) => {
  const deleteClick = (e) => {
    deleteCard()
  }

  return (
    <div className='button-add-outfit'>
      <IconContext.Provider value={{color: 'red', size: '40px'}}>
        <CiSquareRemove onClick={e => deleteClick(e)}/>
      </IconContext.Provider>
    </div>
  )
}

export default DeleteOutfit