import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { ScoreBoard } from './features/score-board/ScoreBoard';

function App() {
  return (
    <div className="board">
      <ScoreBoard/>
    </div>
  );
}

export default App;
