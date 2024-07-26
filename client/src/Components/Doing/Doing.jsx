import React, { useEffect } from 'react';
import { useState } from 'react';
import './Doing.css';

let nextId = 0;

const Doing = ({title,eachCardId}) => {
  const [name, setName] = useState('');
  const [arrray, setArrray] = useState([]);
  const [editId, setEditId] = useState(null);
  console.log(eachCardId);

  useEffect(()=>{
    async function fetchData()
    {
      const res2=await fetch(`https://trello-clone-9ydq.onrender.com/workspace/card/${eachCardId}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        },
     });
     const data2 =await res2.json();
     console.log(data2);
     setArrray(data2.data.SingleCard.list);
    }
  fetchData();

},[]);

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (editId !== null) {
        setArrray(
          arrray.map((a) =>
            a.id === editId ? { ...a, name: name } : a
          )
        );
        setEditId(null); 
      } else {
        const res=await fetch('https://trello-clone-9ydq.onrender.com/workspace/list/',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({ task: name,cardId:eachCardId}),
       });
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
        <input className="buttonDoing" type="text" placeholder="Doing" value={title}></input>
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