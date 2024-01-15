import React, { useState } from 'react';
import './SideBar.css';

const SideBar = ({onSelect}) => {
    return (
        <div>
            <div class="vnavbar">
                <div class="firstelement">
                    <button className='capital'>T</button>
                    <a href="#">Trello Workspace</a>
                    <button className='open' onClick={()=>{onSelect(false)}}><i class="fa-solid fa-arrow-left"></i></button>
                </div>
                <div className='secoundelement'>
                    <a href="#"><i class="fa-brands fa-trello"></i><p className='boards'>Boards</p></a>
                    <a href="#"><i class="fa-solid fa-user-plus"></i><p className='boards'>Members</p></a>
                    <a href="#"><i class="fa-solid fa-gear"></i><p className='boards'>Workspace Settings</p></a>
                </div>
                <p className='line'>Workspace views</p>
                <div className='secoundelement'>
                    <a href="#"><i class="fa-solid fa-table"></i><p className='boards'><i>Table</i></p></a>
                    <a href="#"><i class="fa-solid fa-calendar-days"></i><p className='boards'><i>Calender</i></p></a>
                </div>
            </div>
        </div>
    );
}

export default SideBar;