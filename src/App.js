import React from 'react';
import { useState } from 'react';
import Doing from './Components/Doing/Doing';
import AddAnotherList from './Components/AddAnotherList/AddAnotherList';
import Header from './Components/Header/Header';
import Headertwo from './Components/Headertwo/Headertwo';
import SideBar from './Components/SideBar/SideBar';
import './App.css';

function App() {
  const[show,setShow]=useState(true);
  const [arrray, setArrray] = useState([]);
  const [title, setTitle] = useState("");

  let classname="body-container";
  if(show!==true){
    classname="hi";
  }

  return (
    <div>
    <h1 className='header'><Header /></h1>
    <container className={classname}>
      {show && <SideBar onSelect={contact => setShow(contact)}/>}
    <div className='styling'>
      <div style={{width:"100%"}}><Headertwo visible={show} onSelect={contacte => setShow(contacte)}/></div>
        <Doing />
        {arrray.map(item => {
          return(
          <Doing title={item.name} />
          );
        })}
      <AddAnotherList setArrray={setArrray} arrray={arrray}/>
    </div>
    </container>
    </div>
  );
}

export default App;
