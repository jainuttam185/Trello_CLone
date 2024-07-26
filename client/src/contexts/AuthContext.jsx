import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const AuthContext=createContext();

export const AuthProvider = ({children}) => {
  //const navigate = useNavigate();
    const [token,setToken]=useState(null);
    const [userData,setUserData]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const storedData=JSON.parse(localStorage.getItem('user_data'));
    function getCookie(name) {
      function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
      var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
      return match ? match[1] : null;
  }
    console.log(getCookie("jwt"));
    console.log(cookies);
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
     const {data,status} =await res.json();
         if(res.status===200){
            setIsAuthenticated(true);
         }
        }
        fetchData();
    },[]);
    const login=(newToken,newData)=>{
        localStorage.getItem('user_data',JSON.stringify({userToken:newToken,user:newData}),);
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
        console.log(newToken,newData);
    };
    const logout=async ()=>{
        try{
          setToken(null);
        setUserData(null);
        setIsAuthenticated(null);
          const res=await axios({
            method:'GET',
            url:'https://trello-clone-9ydq.onrender.com/trello/logout',
            withCredentials: true,
            headers:{
              'Content-Type':'application/json',
            }
          });
          
          
        }catch(err){
          message("error");
        }
        
    };
  return (
    <AuthContext.Provider value={{token,isAuthenticated,login,logout,userData}}>
    {children}
    </AuthContext.Provider>
  )
};

export const useAuth =()=>useContext(AuthContext);

