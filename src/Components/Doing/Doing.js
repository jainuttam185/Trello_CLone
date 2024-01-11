import React from 'react';
import { useState } from 'react';
import './Doing.css';

let nextId = 0;

const Doing = () => {
  const [name, setName] = useState('');
  const [arrray, setArrray] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (editId !== null) {
        setArrray(
          arrray.map((a) =>
            a.id === editId ? { ...a, name: name } : a
          )
        );
        setEditId(null); 
      } else {
        setArrray([...arrray, { id: nextId++, name: name }]);
      }
      setName('');
    }
  };

  const handleDelete = (id) => {
    setArrray(
      arrray.filter((a) => a.id !== id)
    );
  };

  const handleEdit = (id) => {
    const artistToEdit = arrray.find((a) => a.id === id);
    if (artistToEdit) {
      setEditId(id);
      setName(artistToEdit.name);
    }
  };


  return (
    <div className='stylefirst'>
      <div className='styleit'>
        <input className="buttonDoing" type="text" placeholder="Doing"></input>
        <button className='buttonSecound'><i class="fa-solid fa-ellipsis"></i></button>
      </div>
      <ul>
        {arrray.map(artist => (
          <li style={{display:"flex", justifyContent:"space-between", alignItems:"center"}} key={artist.id}>
            {artist.name}
            <div classname="EditDelete">
            <button onClick={() => handleEdit(artist.id)} className='buttonThird'><i class="fa-regular fa-pen-to-square"></i></button>
            <button style={{marginLeft:"10px"}} onClick={() => handleDelete(artist.id)} className='buttonThird'><i class="fa-solid fa-trash"></i></button>
            </div>
          </li>
        ))}
      </ul>
      <input placeholder="+ Add a New Card" className="buttonDoing" type="text" value={name} onChange={e => setName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Doing;