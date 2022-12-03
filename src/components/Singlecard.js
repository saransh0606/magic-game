
import React from 'react'
import './Singlecard.css'


export default function Singlecard({card,handleChoice,flipped,disable}) {

    const handleClick=()=>{
        if(!disable){
            handleChoice(card)
        }
        
    }

  return (
    
          <div className='card' key={card.id}>
            <div className={flipped?"flipped":""}>
              <img className='front' src={card.src} alt='card front'/>
              <img onClick={handleClick} className='back' src='/img/cover.png' alt='card front'/>
            </div>
          </div>
        
  )
}
