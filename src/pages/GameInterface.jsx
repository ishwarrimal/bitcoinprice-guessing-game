import React, { useEffect, useState, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import style from './gameInterface.module.css';
import GameResultToast from '../components/GameResultToast';
import { fetchScoreFromLocalStorage, saveScoreToLocalStorage } from '../utils/localStorageHelper';
import AlertDialog from '../components/ErrorDialogue';
import { useCountdown } from '../hooks/useCountdown';
import useFetchPrice from '../hooks/useFetchPrice';

const USER_GUESS = {
  UP: "up",
  DOWN: "down"
}

const GUESS_INTERVAL_OPTIONS_IN_SEC = [10,30,60]

const GameInterface = () => {
  const [guessIntervalInSec, setGuessIntervalInSec] = useState(GUESS_INTERVAL_OPTIONS_IN_SEC[0])
  const [userGuess, setUserGuess] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(null);
  const { price, loading, error } = useFetchPrice();
  
  const timeLeft = useCountdown(startTime, guessIntervalInSec);

  //To hold old price for comparison and source of trth for users
  const oldPriceRef = useRef(null);
  
  useEffect(() => {
     getUserLatestScore()
  }, [])

  useEffect(() => {
    //If price changes and the user has guessed
    if(userGuess && timeLeft <= 0){
        let message = ''
        let newScore = score
        const priceDiff = price - Number(oldPriceRef.current)
        if(priceDiff > 0 && userGuess === USER_GUESS.UP || priceDiff < 0 && userGuess === USER_GUESS.DOWN){
          message = "Congratulation, you have guessed correctly. `"
          newScore++
        }else{
          message = "On No, you guessed it wrong"
          newScore = score - 1 > 0 ? score - 1 : 0
        }
        message += ` Your Guess was ${userGuess.toUpperCase()},
                    the old price was ${oldPriceRef.current}, 
                    the new price is ${price}, 
                    the price difference is ${price - oldPriceRef.current}`
        setResult(message)
        saveScoreToLocalStorage(newScore)
        setUserGuess(null)
        setStartTime(null)
        getUserLatestScore()   
    }
  }, [price])

  function getUserLatestScore(){
    setScore(fetchScoreFromLocalStorage() || 0)
  }

  function getGameLoadingTitle(){
    if(timeLeft > 0){
      return <p>You guessed the price will go {userGuess} in <span style={{fontWeight: 'bold'}}>{timeLeft}</span> seconds</p> 
    }
    return <p>Waiting for price to update</p>
  }

  const handleGuess = (guess) => {
    if (!userGuess) {
      setUserGuess(guess);
      setStartTime(Date.now());
      oldPriceRef.current = price;
    }
  };

  return (
    <div className={style.gameContainer}>
      <div className={style.intervalSelection}  >
            <label htmlFor='intervalSelection'>Select Interval</label>
            <select value={guessIntervalInSec} onChange={(e) => setGuessIntervalInSec(e.target.value)} id="intervalSelection" disabled={!!userGuess}>
              {GUESS_INTERVAL_OPTIONS_IN_SEC.map((val) => <option key={val} value={val}>{val} seconds</option>)}
            </select>
          </div>
      <div className={style.priceDisplay}>
          <p>Current BTC Price</p>
          <Tooltip title={`${userGuess ? "You can't refresh at this moment" : "Click to refresh!"}`}> 
          <div className={style.currentPrice}>
            <span>{loading ? 'loading...' : `$${price}`}</span>
          </div>
          </Tooltip>
      </div>
      <div className={style.scoreSection}>
        <div className={style.scoreCounter}>Score: {score === null ? 'getting score...' : score}</div>
        {userGuess ? 
          getGameLoadingTitle() :
          <p>Will Bitcoin price go Up or Down in next <span style={{fontWeight: 'bold'}}>{guessIntervalInSec} seconds</span></p>}
        <div className={style.guessButtons}>
          <button className={style.upButton} onClick={() => handleGuess(USER_GUESS.UP)} disabled={!!userGuess || !!loading}>UP</button>
          <button className={style.downButton} onClick={() => handleGuess(USER_GUESS.DOWN)} disabled={!!userGuess || !!loading}>DOWN</button>
        </div>
      </div>
      {
        result && <GameResultToast message={result} oldPrice={oldPriceRef.current} newPrice={price} onClose={() => setResult(null)} />
      }
      {
        error && <AlertDialog onClose={() => error = null} />
      }
    </div>
  );
};

export default GameInterface;