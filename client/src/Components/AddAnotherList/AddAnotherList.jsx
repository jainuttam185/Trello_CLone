import React, { useState } from 'react'; 
import './AddAnotherList.css';
import { useParams } from 'react-router-dom';

let nextId = 0;
const AddAnotherList = ({setArrray,arrray}) => {
    const { id } = useParams();
    console.log(id);
    const [title, setTitle] = useState("");
    

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            const res=await fetch('https://trello-clone-9ydq.onrender.com/workspace/card/',{
                method:'POST',
                headers:{
                  'Content-Type':'application/json',
                },
                body:JSON.stringify({ cardName: title,wrkSpaceId:id}),
             });
             const {data,status,card} =await res.json();
            setArrray([...arrray,  card ]);
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