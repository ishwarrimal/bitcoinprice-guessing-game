export const saveScoreToLocalStorage = (score, key = 'userScore') => {
    localStorage.setItem(key, JSON.stringify(score));
  };
  
export const fetchScoreFromLocalStorage = (key='userScore') => {
  const score = localStorage.getItem(key);
  return score ? JSON.parse(score) : null;
};