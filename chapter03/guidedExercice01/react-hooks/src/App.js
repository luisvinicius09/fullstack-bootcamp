import React, { useState, useEffect } from 'react';
import { getNewTimestamp } from './helpers/dateTimeHelpers';

export default function App() {

  const [clickArray, setClickArray] = useState([]);
  
  useEffect(() => {
    document.title = clickArray.length
  })

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimestamp())

    setClickArray(newClickArray);
  };


  return (
    <div>
      <h1>
        React and <em>Hooks</em>
      </h1>

      <button onClick={handleClick}>Click here</button>

      <ul>
        {clickArray.map((item) => {
        return <li key={item}>{item}</li>
      })}
      </ul>
    </div>
  )
  }
