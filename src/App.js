import React from 'react';
import Doing from './Components/Doing/Doing';
import AddAnotherList from './Components/AddAnotherList/AddAnotherList';
import './App.css';

function App() {
  return (
    <div>
    <h1 className='header'>Todo</h1>
    <div className='styling'>
      <Doing />
      <Doing /> 
      <AddAnotherList />
    </div>
    </div>
  );
}

export default App;
