import { Route, Routes } from "react-router-dom";
import Login from "./login/login";
import SignUp from "./login/signUp";
import PrivateRoutes from "./PrivateRoutes";
import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import HomeComponent from "./Home/HomeComponent";

const ViewsComponent = () => {

  const {user} = useContext(AccountContext)

  return user.loggedIn === null ? (
    <Text>Page is coming ... </Text>
    ) :(
  <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/register" element={<SignUp/>}></Route>
    <Route element={<PrivateRoutes/>}>
      <Route path="/home" element={<HomeComponent/>}></Route>
    </Route>
    <Route path="*" element={<Login/>}></Route>
  </Routes>
  )
}

export default ViewsComponent;