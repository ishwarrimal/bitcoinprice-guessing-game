import React, { useEffect, useState, useRef } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { fetchAndParseBTCPriceData } from '../lib/api';
import { LuRefreshCw } from "react-icons/lu";
import { fetchScoreFromLocalStorage, saveScoreToLocalStorage } from '../utils/localStorageHelper';
import GameResultToast from '../components/GameResultToast';
import Tooltip from '@mui/material/Tooltip';
import style from './gameInterface.module.css';

const USER_GUESS = {
  UP: "up",
  DOWN: "down"
}

const GUESS_INTERVAL_OPTIONS_IN_SEC = [10,30,60]

const GameInterface = () => {
  const [guessIntervalInSec, setGuessIntervalInSec] = useState(GUESS_INTERVAL_OPTIONS_IN_SEC[0])
  const [priceData, setPriceData] = useState({price: 0, lastUpdated: new Date()})
  const [userGuess, setUserGuess] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const timeLeft = useCountdown(startTime, guessIntervalInSec);

  //To hold old price for comparison and source of trth for users
  const oldPriceRef = useRef(null);
  
  useEffect(() => {
    fetchLatestBTCPrice();
    getUserLatestScore();
  }, [])
  
  useEffect(() => {
    //If price changes and the user has guessed
    if(userGuess){
      if(startTime === null){
        setStartTime(Date.now());
        oldPriceRef.current = priceData.price;
        setTimeout(fetchLatestBTCPrice, guessIntervalInSec*1000)
      }else{
        let message = ''
        let newScore = score
        const priceDiff = Number(priceData.price) - Number(oldPriceRef.current)
        if(priceDiff === 0){
          message = "There was no price change. No change in score"
        }
        else if(priceDiff > 0 && userGuess === USER_GUESS.UP || priceDiff < 0 && userGuess === USER_GUESS.DOWN){
          message = "Congratulation, you have guessed correctly."
          newScore++
        }else{
          message = "On No, you guessed it wrong"
          newScore = score - 1 > 0 ? score - 1 : 0
        }
        // message += ` Old Price : ${oldPriceRef.current} | New Price : ${price}`
        setResult(message)
        saveScoreToLocalStorage(newScore)
        setUserGuess(null)
        setStartTime(null)
        getUserLatestScore()
      }      
    }
  }, [priceData])

  function getUserLatestScore(){
    setScore(fetchScoreFromLocalStorage() || 0)
  }
  
  async function fetchLatestBTCPrice(){
    setLoading(true)
    try{
      const newPriceData = await fetchAndParseBTCPriceData();
      setPriceData(newPriceData)
    }catch(e){
      setError('Error Loading Price')
    }finally{
      setLoading(false)
    }
  }

  const handleGuess = (guess) => {
    if (!userGuess) {
      setUserGuess(guess);
      fetchLatestBTCPrice()
    }
  };

  return (
    <div className={style.gameContainer}>
      <div class={style.intervalSelection}  onChange={(e) => setGuessIntervalInSec(e.target.value)}>
            <label htmlFor='intervalSelection'>Select Interval</label>
            <select value={guessIntervalInSec} id="intervalSelection" disabled={!!userGuess}>
              {GUESS_INTERVAL_OPTIONS_IN_SEC.map((val) => <option key={val} value={val}>{val} seconds</option>)}
            </select>
          </div>
      <div className={style.priceDisplay}>
          <p>Current BTC Price</p>
          <Tooltip title={`${userGuess ? "You can't refresh at this moment" : "Click to refresh!"}`}> 
          <div className={style.currentPrice} onClick={() => !userGuess && fetchLatestBTCPrice()}>
            <span>{loading ? 'loading...' : `$${priceData.price}`}</span>
            {!loading && <LuRefreshCw />}
          </div>
          </Tooltip>
      </div>
      <div className={style.scoreSection}>
        <div className={style.scoreCounter}>Score: {score === null ? 'getting score...' : score}</div>
        {userGuess ? <p>You guessed the price will go {userGuess} in <span style={{fontWeight: 'bold'}}>{timeLeft}</span> seconds</p> : <p>Will Bitcoin price go Up or Down in next <span style={{fontWeight: 'bold'}}>{guessIntervalInSec} seconds</span></p>}
        <div className={style.guessButtons}>
          <button className={style.upButton} onClick={() => handleGuess(USER_GUESS.UP)} disabled={!!userGuess}>UP</button>
          <button className={style.downButton} onClick={() => handleGuess(USER_GUESS.DOWN)} disabled={!!userGuess}>DOWN</button>
        </div>
      </div>
      {
        result && <GameResultToast message={result} oldPrice={oldPriceRef.current} newPrice={priceData.price} onClose={() => setResult(null)} />
      }
    </div>
  );
};

export default GameInterface;