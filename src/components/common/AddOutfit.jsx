import React, {useState} from 'react'
import { IconContext } from 'react-icons';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

const AddOutfit = ({addToOutfitHandler, product, styles, rating, productId}) => {
  const [color, setColor] = useState('black')
  const addClick = (e) => {
    addToOutfitHandler(e, product, styles, rating, productId)
    setColor('#ff98ee')
  }

  return (
    <div className='button-add-outfit'>
      <IconContext.Provider value={{color: color, size: '40px'}}>
        <MdFavoriteBorder onClick={(e) => {
          addClick(e)
        }}/>
      </IconContext.Provider>
    </div>
  )
}

export default AddOutfit


/*


<IconContext.Provider value={{color: 'fd81af', size: '40px'}}>
  <MdFavorite/>
</IconContext.Provider>
*/