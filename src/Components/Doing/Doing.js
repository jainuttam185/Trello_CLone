import React from 'react';
import { useState } from 'react';
import './Doing.css';

let nextId = 0;



const Doing = () => {
  const [name, setName] = useState('');
  const [arrray, setArrray] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Only add a new artist when Enter key is pressed
      setArrray([...arrray, { id: nextId++, name: name }]);
      // Clear the input field after adding an artist
      setName('');
    }
  };

  const handleDelete = (id) => {
    // Filter out the artist with the specified id
    const updatedArrray = arrray.filter((arrray) => arrray.id !== id);
    setArrray(updatedArrray);
  };

  return (
    <div className='stylefirst'>
      <div className='styleit'>
        <input className="buttonDoing" type="text" placeholder="Doing"></input>
        <button className='buttonSecound'>+</button>
      </div>
      <ul>
        {arrray.map(artist => (<li key={artist.id}>{artist.name}
        <button onClick={()=> handleDelete(arrray.id)}>
        Delete
        </button>
        </li>
        ))}
      </ul>
      <input className="inputElement" type="text" value={name} onChange={e => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        
        >
      </input>
      <button className='buttonAddnewcard'>+  Add a Card</button>
    </div>
  );
}

export default Doing;