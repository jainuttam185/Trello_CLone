import React from 'react';
import Doing from './Components/Doing/Doing';
import AddAnotherList from './Components/AddAnotherList/AddAnotherList';
import Header from './Components/Header/Header';
import Headertwo from './Components/Headertwo/Headertwo';
import SideBar from './Components/SideBar/SideBar';
import './App.css';

function App() {
  return (
    <div>
    <h1 className='header'><Header /></h1>
    <container className="body-container">
      <SideBar />
    <div className='styling'>
      <div style={{width:"100%"}}><Headertwo /></div>
      <Doing />
      <Doing />
      <AddAnotherList />
    </div>
    </container>
    </div>
  );
}

export default App;
