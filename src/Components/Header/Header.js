import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className='topmost'>
            <div className="navbar">
                <a href="#home"><i class="fa-solid fa-box"></i></a>
                <a href="#about"><i class="fa-brands fa-trello">Trello</i></a>
                <a href="#services"><div class="dropdown">
                    <button class="dropdown-button">Workspaces <i class="fa-solid fa-caret-down"></i></button>
                    <div class="dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div></a>
                <a href="#services"><div class="dropdown">
                    <button class="dropdown-button">Recent <i class="fa-solid fa-caret-down"></i></button>
                    <div class="dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div></a>
                <a href="#services"><div class="dropdown">
                    <button class="dropdown-button">Starred <i class="fa-solid fa-caret-down"></i></button>
                    <div class="dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div></a>
                <a href="#services"><div class="dropdown">
                    <button class="dropdown-button">Templates <i class="fa-solid fa-caret-down"></i></button>
                    <div class="dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div></a>
                <button className='Createbutton'>Create</button>
            </div>
            <div className='navbar'>
                <input type='search' className='Createsearch' placeholder='Search'></input>
                <a href="#home"><i className="fa-solid fa-bell icons"></i></a>
                <a href="#home"><i class="fa-solid fa-question icons"></i></a>
                </div>
            </div>
        </div>

    );
}

export default Header;