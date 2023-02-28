import { useNavigate } from "react-router"
import { useEffect } from "react";
const Logout = () => {
    const navigate = useNavigate();

    window.localStorage.clear()
    
    // localStorage.setItem("loginStatus",false)
    // localStorage.setItem("pages",JSON.stringify([]))
    // localStorage.setItem("user",JSON.stringify({userType:""}))
    // localStorage.removeItem("user")
    // console.log(localStorage.getItem("loginStatus"))
    localStorage.setItem("loginStatus",false) 
    useEffect(() => {
        return () => {
          // cleanup when component unmounts
          console.log("leaving checkout");
          navigate("/login")
          window.location.reload()
          // history.go()
        };
      }, []);
    
    
   
    
}
export default Logout;