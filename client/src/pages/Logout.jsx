/**
 * @author Vaishwi Patel (B00914336)
 * This function imports the `useNavigate` hook from the `react-router` library and the `useEffect` hook from the `react` library.
 * It can be used to navigate to a different page in the application when certain conditions are met.
 */
import { useNavigate } from "react-router"
import { useEffect } from "react";
const Logout = () => {
    const navigate = useNavigate();

    window.localStorage.clear()
    
    localStorage.setItem("loginStatus",false) 
    /**
     * useEffect hook that is triggered when the user leaves the checkout page. 
     * It navigates the user to the login page and reloads the window.
     */
    useEffect(() => {
        
          // cleanup when component unmounts
          console.log("leaving checkout");
          navigate("/login")
          window.location.reload()
          // history.go()
        
      }, []);
    
    
   
    
}
export default Logout;