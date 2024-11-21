import { withAuthenticator } from '@aws-amplify/ui-react';
import GameInterface from './pages/GameInterface';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1 className="title">Bitcoin Price Guessing Game</h1>
      <GameInterface />
    </div>
  );
}

export default withAuthenticator(App);
