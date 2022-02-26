import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Heading,
  Select,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// import firebase from 'firebase';
import { ref, uploadBytes, storage, getDownloadURL } from "../firebase-config";
import axios from "axios";
import { Backend_url } from "../BackEnd";
import ErrALert from "../components/AlertErr";
import swal from "sweetalert";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  let navigate = useNavigate();

  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await axios.post(
        `${Backend_url}/auth/login/teacher`,
        data
      );

      console.log(response, "response");
      swal({
        title: "Success",
        text: "You are login",
        icon: "success",
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response.data.message === "User does not exist.")
        setError({
          isError: true,
          message: "User does not exist.",
        });
    }
  };

  return (
    <Container
      maxWidth="lg"
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="center"
    >
      <Heading align="center">Login Your Account!</Heading>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error.isError && <ErrALert text={error.message} />}
          <FormControl my="3">
            <FormLabel>Email:</FormLabel>
            <Input
              placeholder="Enter Email"
              focus={{
                border: "1px solid red",
              }}
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email?.type === "required" && (
              <FormLabel color="brand.error" my="2">
                Email Required.
              </FormLabel>
            )}
            {errors.email?.type === "pattern" && (
              <FormLabel color="brand.error" my="2">
                Email is Invalid.
              </FormLabel>
            )}
          </FormControl>
          <FormControl my="3">
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password?.type === "required" && (
              <FormLabel color="brand.error" my="2">
                Password Required.
              </FormLabel>
            )}
            {errors.password?.type === "minLength" && (
              <FormLabel color="brand.error" my="2">
                Password should have atlease 8 characters long.
              </FormLabel>
            )}
          </FormControl>

          <FormControl>
            <Button
              type="submit"
              w="100%"
              bg="brand.primary"
              color="brand.secondary"
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
