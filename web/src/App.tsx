import React, {useState} from 'react';
import './App.css';

import Header from './Header';


function App() {
  const  [counter,setCounter] = useState(1);
  function btnClick(){
    setCounter(counter + 1);
    console.log(counter);
  }
  return (
    <div>
      <Header title={`Contador: ${counter}`} />
      <h1>{counter}</h1>
      <button onClick={btnClick}>Increment</button>
    </div>
  );
}

export default App;
