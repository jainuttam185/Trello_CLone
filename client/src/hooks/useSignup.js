import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx"

const useSignup = () => {
    const {login}=useAuth();    
    
    const registerUser=async(values)=>{
    try{
        const res=await fetch('http://localhost:8000/trello/signup',{
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