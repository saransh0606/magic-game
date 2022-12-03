import { useState,useEffect } from 'react';
import './App.css'

import Singlecard from './components/Singlecard';


const cardImages = [
  { "src": "/img/helmet-1.png", "matched":false },
  { "src": "/img/potion-1.png", "matched":false },
  { "src": "/img/ring-1.png", "matched":false },
  { "src": "/img/scroll-1.png", "matched":false },
  { "src": "/img/shield-1.png", "matched":false },
  { "src": "/img/sword-1.png", "matched":false },
]

function App() {

  const [cards,setcards]=useState([])
  const [turns, setturns] = useState(0)
  const [choiceOne, setchoiceOne] = useState(null)
  const [choiceTwo, setchoiceTwo] = useState(null)
  const [disable, setdisable] = useState(false)

  const shuffleCards=()=>{
    const shuffedCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))
    
    setcards(shuffedCards)
    setchoiceOne(null)
    setchoiceTwo(null)
    setturns(0)
  }

  const handleChoice=(card)=>{
    choiceOne?setchoiceTwo(card):setchoiceOne(card)
  }

  const resetTurn=()=>{
    setchoiceOne(null)
    setchoiceTwo(null)
    setturns(prevTurn=>prevTurn+1)
    setdisable(false)
  }

  // const compareBoth=()=>{
  //   setdisable(true)
  //   if(choiceOne.src===choiceTwo.src){
  //     setcards(prevCards=>{
  //       return prevCards.map(card=>{
  //         if(card.src===choiceOne.src){
  //           return {...card,matched:true}
  //         }
  //         else{
  //           return card
  //         }
  //       })
  //     })
  //     resetTurn()
  //   }
  //   else{
      
  //     setTimeout(()=>resetTurn(),1000)  
  //   }
  // }
 

  // {(choiceOne && choiceTwo) && compareBoth()}

  useEffect(()=>{
    shuffleCards()
  },[])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisable(true)
      if (choiceOne.src === choiceTwo.src) {
        setcards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])
  

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards} >New Game</button>
      <div className='card-grid'>
        {cards.map(card=>(
          <Singlecard disable={disable} key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceOne || card===choiceTwo || card.matched}/>
        ))}
    </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App