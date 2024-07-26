import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx"

const useSignup = () => {
    const {login}=useAuth();    
    
    const registerUser=async(values)=>{
    try{
        const res=await fetch('https://trello-clone-9ydq.onrender.com/trello/signup',{
           method:'POST',
           credentials: 'include',
           headers:{
             'Content-Type':'application/json',
           },
           body:JSON.stringify(values),
        });
        const data =await res.json();
         if(res.status===201){
            message.success("success");
            login(data.token,data.user);
         }else {
            message.error('Registration failed');
         }
    }catch(error){
      message.error(error);
    }    
};
  return {registerUser};
}

export default useSignup;