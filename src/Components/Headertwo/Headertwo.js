import React from 'react';
import './Headertwo.css';

const Headertwo = () => {
    return (
        <div>
            <div className='topmost' style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
            <div className="navbar" style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
                <a href="#home"><i class="fa-solid fa-hand-holding-heart"></i></a>
                <a href="#about"><i class="fa-regular fa-star"></i></a>
                <a href="#about"><i class="fa-solid fa-user-plus"></i></a>
                <button className='Createbutton'><i class="fa-solid fa-chess-board"></i> Create</button>
                <a href="#services"><div class="dropdown">
                    <button class="dropdown-button" style={{backgroundColor:"rgba(0,0,0,0.8)"}}><i class="fa-solid fa-caret-down"></i></button>
                    <div class="dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div></a>
            </div>
            <div className='navbar'>
                <a href="#home"><i class="fa-solid fa-rocket"></i></a>
                <a href="#home"><i class="fa-solid fa-bolt"></i></a>
                <button className='Createbutton'><i class="fa-solid fa-filter"></i> Filters</button>
                </div>
            </div>
        </div>

    );
}

export default Headertwo;