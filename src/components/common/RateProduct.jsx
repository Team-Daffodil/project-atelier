import React from 'react';
import { IconContext } from 'react-icons';
import { TbFlower } from 'react-icons/tb';
const {useState, useRef} = React;

const RateProduct = () => {
// state list of divs
  const [currentRating, setCurrentRating] = useState(0);
  const [mouseHover, setMouseHover] = useState(false);
  const inputEl = useRef(null);
  const onHover = (event) => {
    let eleId = event.nativeEvent.relatedTarget.parentNode.attributes[0].value
    console.log('TEST HOVER: ', eleId)
    setCurrentRating(eleId);
    setMouseHover(!mouseHover);
  }
  const onClickHandler = (event) => {
    let eleId = event.nativeEvent.target.parentNode.attributes[0].value
    console.log('TEST CLICK: ', eleId)
    // eleId should give your desired rating value on click
    //PROBABLY DO YOUR POST AND STATE UPDATES HERE
  }
  let empty = <IconContext.Provider value={{color: 'black', size: '20px', className: 'flower-empty'}} >
    <TbFlower onMouseEnter={onHover} />
  </IconContext.Provider>


  let filled = <IconContext.Provider value={{color: 'ffff64', size: '20px', className: 'flower-filled'}} >
    <TbFlower onMouseEnter={onHover} onClick={onClickHandler}/>
  </IconContext.Provider>


  let count = 0;

  return (
    <div className='rating'>
      {[...Array(5).keys()].map((index) => {
        if (index) {count++}
        return (
          <div className='flower'>
            <div key={index+1} id={index+1}>{index+1 <= currentRating ? filled : empty}</div>
          </div>
        )
      })
      }
    </div>
  )
}

export default RateProduct;