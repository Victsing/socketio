import { useEffect } from "react";
import { useNavigate } from "react-router";
const { createContext, useState } = require("react");
export const AccountContext = createContext()

const UserContext = ({children}) => {
  const [user, setUser] = useState({loggedIn: null})
  const navigate = useNavigate()
  useEffect(() => {
    fetch("http://localhost:4000/auth/login", {
      credentials: "include"
    }).catch(err => {
      setUser({loggedIn: false})
    }).then(response => {
      if (!response || !response.ok || response.status >= 400){
        setUser({loggedIn: false})
        return
      }
      return response.json()
    }).then(data => {
      if (!data) {
        setUser({loggedIn: false})
        return
      }
      setUser({...data})
      navigate("/home")
    })
  }, [])
  return <AccountContext.Provider value={{user, setUser}}>{children}</AccountContext.Provider>
}

export default UserContext