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
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [recitationRecording, setRecitationRecording] = useState(null);
  const onSubmit = (data) => console.log(data);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      padding="30px 0"
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

            <FormControl my="3">
              <FormLabel>About You:</FormLabel>
              <Textarea
                placeholder="Enter your short intro.."
                height="100px"
                {...register("about")}
              />
            </FormControl>

            <FormControl my="3">
              <FormLabel>Your Age:</FormLabel>
              <Input
                type="number"
                placeholder="Enter your age"
                {...register("age")}
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Country:</FormLabel>
              <Input
                type="text"
                placeholder="Enter your country"
                {...register("country")}
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>City:</FormLabel>
              <Input
                type="text"
                placeholder="Enter your city"
                {...register("city")}
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Gender:</FormLabel>
              <RadioGroup {...register("gender")}>
                <Stack direction="row">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl my="3">
              <FormLabel>Recitation:</FormLabel>
              <input
                type="file"
                onChange={(e) => {
                  setRecitationRecording(e.target.files[0]);
                }}
              />
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
