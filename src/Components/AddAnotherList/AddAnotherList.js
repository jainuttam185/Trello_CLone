import React, { useState } from 'react'; 
import './AddAnotherList.css';

let nextId = 0;
const AddAnotherList = ({setArrray,arrray}) => {

    const [title, setTitle] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setArrray([...arrray, { id: nextId++, name: title }]);
            setTitle("");
          }
          
      };


    return (
       <div className='stylish'>
        <input className="buttonDoing" type="text" placeholder="+ Add Another List" value={title} onChange={e=>setTitle(e.target.value)}
        onKeyDown={handleKeyDown}></input>
       </div>
    );
}

export default AddAnotherList;