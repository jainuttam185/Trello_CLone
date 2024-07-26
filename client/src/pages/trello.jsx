import React, { useEffect } from 'react';
import { useState } from 'react';
import Doing from './../Components/Doing/Doing';
import AddAnotherList from './../Components/AddAnotherList/AddAnotherList';
import Header from './../Components/Header/Header';
import Headertwo from './../Components/Headertwo/Headertwo';
import SideBar from './../Components/SideBar/SideBar';
import './trello.css'
import { message } from 'antd';
import { useParams } from 'react-router-dom';


function Trello() {
    const { id } = useParams();
    const [show,setShow]=useState(true);
    const [arrray, setArrray] = useState([]);
    const [title, setTitle] = useState("");
    console.log(arrray);

    useEffect(()=>{
        async function fetchData()
        {
          const res=await fetch('https://trello-clone-9ydq.onrender.com/trello/refresh',{
            method:'PATCH',
            headers:{
              'Content-Type':'application/json',
            },
            credentials: "include"
         });
          if(res.status===200){
             message.success("success");
             //login(data.token,data.user);
          }else {
             message.error('Registration failed');
          }
          const res2=await fetch(`https://trello-clone-9ydq.onrender.com/workspace/wrk/${id}`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
            },
         });
         const data2 =await res2.json();
         console.log(data2);
         setArrray(data2.data.SinglewrkSpace.cards);
        }
      fetchData();
    
    },[]);
  
    let classname="body-container";
    if(show!==true){
      classname="hi";
    }
  
    return (
      <div>
      <h1 className='header'><Header /></h1>
  
      <div className={classname}>
        {show && <SideBar onSelect={contact => setShow(contact)}/>}
        <div className='styling'>
        <div style={{width:"100%"}}><Headertwo visible={show} onSelect={contacte => setShow(contacte)}/></div>
          {arrray.map(item => {
            return(
            <Doing title={item.name} eachCardId={item._id}/>
            );
          })}
        <AddAnotherList setArrray={setArrray} arrray={arrray}/>
      </div>
      </div>
      </div>
    );
  }
  
export default Trello;
  