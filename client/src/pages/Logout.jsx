import { useNavigate } from "react-router"
import { useEffect } from "react";
const Logout = () => {
    const navigate = useNavigate();

    window.localStorage.clear()
    
    localStorage.setItem("loginStatus",false) 
    useEffect(() => {
        
          // cleanup when component unmounts
          console.log("leaving checkout");
          navigate("/login")
          window.location.reload()
          // history.go()
        
      }, []);
    
    
   
    
}
export default Logout;