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
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

// import firebase from 'firebase';
import { app } from "../firebase";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [recitationRecording, setRecitationRecording] = useState(null);
  const [courses, setCourses] = useState([]);
  // const onSubmit = (data) => console.log(data);
  const onSubmit = (data) => {
    handleUploadApplicant()
  }

  ///////////upload file//////

  const handleUploadApplicant = () => {
    // const resumeFile = applicantData.resume[0];

    const fileUrl = app
      .storage()
      .ref("applicants-resume")
      .child(recitationRecording.name)
      .put(recitationRecording);

    fileUrl.on(
      "state_changed",
      (snapshot) => {
        //progress
      },
      (error) => {
        // error
        console.log(error);
      },
      () => {
        // complete
        const url = app
          .storage()
          .ref("applicants-resume")
          .child(recitationRecording.name)
          .getDownloadURL()
          .then((url) => {
            console.log('url',url);
            // const applicantDataJSON = handleFormatDataForSend(url);
            // handleAddNewApplicant(applicantDataJSON);
          });
      }
    );
  };



  const handleDelete = (itemIndex) => {
    const deletedCourses = courses.filter((item, index) => index !== itemIndex);
    setCourses(deletedCourses);
  };
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
              <HStack mb="2" flexWrap="wrap">
                {courses.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      color="brand.secondary"
                      background="brand.primary"
                      p="2px 15px"
                      borderRadius="5px"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      m="2"
                    >
                      <Text mr="3">{item}</Text>
                      <Box>
                        <MdOutlineCancel
                          cursor="pointer"
                          onClick={() => handleDelete(index)}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </HStack>
              <Select
                onChange={(e) => {
                  if (!courses.includes(e.target.value))
                    setCourses([...courses, e.target.value]);
                }}
              >
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
                  <Radio value="other">Other</Radio>
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
