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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
    >
      <Container maxWidth="lg">
        <Heading align="center">Create Your Account!</Heading>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl my="3">
              <FormLabel>Name:</FormLabel>
              <Input placeholder="Enter Username" {...register("username")} />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Email:</FormLabel>
              <Input placeholder="Enter Email" {...register("email")} />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                placeholder="Enter Password"
                {...register("password")}
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Confirm Password:</FormLabel>
              <Input
                type="password"
                placeholder="Enter Password"
                {...register("confirmPassword")}
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Phone No:</FormLabel>
              <Input
                type="text"
                placeholder="Enter Phone Number"
                name="phone-no"
                {...register("phoneNumber")}
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Choose Courses:</FormLabel>
              <Select {...register("courses")}>
                <option>Course 1</option>
                <option>Course 2</option>
                <option>Course 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <Button type="submit" w="100%">
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
