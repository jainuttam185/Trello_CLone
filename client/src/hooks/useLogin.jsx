import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx"

const useLogin = () => {
    const {login}=useAuth();    
    
    const loginUser=async(values)=>{
    try{
        const res=await fetch('http://localhost:8000/trello/login',{
           method:'POST',
           headers:{
             'Content-Type':'application/json',
           },
           body:JSON.stringify(values),
           credentials: "include"
        }); 
        const data =await res.json(); 
         if(res.status===200){
            message.success("success");
            login(data.token,data.user);
         }else {
            message.error('Registration failed'); 
         }
    }catch(error){
      message.error(error);
    }    
};
  return {loginUser};
}

export default useLogin;