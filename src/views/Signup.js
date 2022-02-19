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

const Signup = () => {
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
          <form>
            <FormControl my="3">
              <FormLabel>Name:</FormLabel>
              <Input placeholder="Enter Username" name="username" />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Email:</FormLabel>
              <Input placeholder="Enter Email" name="email" />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                placeholder="Enter Password"
                name="password"
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Confirm Password:</FormLabel>
              <Input
                type="password"
                placeholder="Enter Password"
                name="password"
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Phone No:</FormLabel>
              <Input
                type="text"
                placeholder="Enter Phone Number"
                name="phone-no"
              />
            </FormControl>
            <FormControl my="3">
              <FormLabel>Choose Courses:</FormLabel>
              <Select>
                <option>Course 1</option>
                <option>Course 2</option>
                <option>Course 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <Button w="100%">Submit</Button>
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
