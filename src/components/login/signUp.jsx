import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";


const SignUp = () => {
  const {setUser} = useContext(AccountContext)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {username: "", password: ""},
    validationSchema: Yup.object({
      username: Yup.string().required("Username required").min(6, "Username length too short ").max(10, "Username length too long"),
      password: Yup.string().required("Password required").min(6, "Password length too short ").max(10, "Password length too long")
    }),
    onSubmit: (values, actions) => {
      const vals = {...values}
      actions.resetForm();
      fetch("http://localhost:4000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(vals),
      }).catch(err => {
        return
      }).then(res => {
        if (!res || !res.ok || res.statusCode >= 400) {
          return
        }
        return res.json();
      })
        .then(data => {
          if(!data) return;
          setUser({...data})
          if (data.status){
            setError(data.status)
          }else if(data.loggedIn) {
            navigate("/home")
            }
        })
    }
  });
  return (
    <VStack as="form" w={{base: "90%", md: "500px"}} m="auto" justify="center" h="100vh" spacing="1rem" onSubmit={formik.handleSubmit}>
      <Heading>Sign up page</Heading>
      <Text as="p" color="red.500">{error}</Text>
      <FormControl isInvalid={formik.errors.username && formik.touched.username}>
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} placeholder="enter your username" autoComplete="off" size="lg"/>
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.errors.password && formik.touched.password}>
        <FormLabel fontSize="lg" >Password</FormLabel>
        <Input name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="enter your password" autoComplete="off" size="lg"/>
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>



      <ButtonGroup pt="1rem">
        <Button colorScheme="teal" type="submit">Create Account</Button>
        <Button onClick={() => navigate("/")} leftIcon={<ArrowLeftIcon/>}>Back</Button>
      </ButtonGroup>
    </VStack>
  )
}
export default SignUp
