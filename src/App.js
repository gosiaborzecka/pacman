import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Board from  './components/Board';

function App() {
  const[score, setScore] = useState(0);
  return (
    <div className="App">
      <Header score={score} />
      <Board setScore={setScore} />
    </div>
  );
}

export default App;
