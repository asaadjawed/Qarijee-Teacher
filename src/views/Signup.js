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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Backend_url } from "../BackEnd"

// import firebase from 'firebase';
import { ref, uploadBytes, storage, getDownloadURL } from "../firebase-config";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const [recitationRecording, setRecitationRecording] = useState(null);
  const [courses, setCourses] = useState([]);
  const [validation, setValidations] = useState({});

  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (data) => {
    // console.log(data);

    if (!recitationRecording) {
      validation.recitationRecording = true;
      return;
    }
    if (!courses.length) {
      validation.courses = true;
      return;
    }

    
    const url = await  handleUploadApplicant();

    const allData = {
      ...data,
      courses,
      recitation:url,
      age:Number(data.age),
      availableSlots: []
    };
    console.log(allData)


    const response = await axios({
      method:"POST",
      data:allData,
      url:`${Backend_url}/auth/signup/teacher`
    })


    // const {sendData} = await axios.post(`${Backend_url}/auth/signup/teacher`,allData)
    console.log('sendData',response);

  };

  const handleUploadApplicant = async () => {
    const storageRef = ref(storage, `/recitations/${recitationRecording.name}`);

    const url = await uploadBytes(storageRef, recitationRecording).then(async (snapshot) => {
      console.log(snapshot);

      const downloadUrl = await getDownloadURL(
        ref(storage, `/recitations/${recitationRecording.name}`)
      );
      return downloadUrl;
    });

    return url;
  };

  const handleDelete = (itemIndex) => {
    const deletedCourses = courses.filter((item, index) => index !== itemIndex);
    setCourses(deletedCourses);
  };
  return (
    <Box padding="30px 0">
      <Container maxWidth="lg">
        <Heading align="center">Create Your Account!</Heading>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl my="3">
              <FormLabel>Name:</FormLabel>
              <Input
                placeholder="Enter Username"
                {...register("name", { required: true })}
              />
              {errors.username?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Username Required.
                </FormLabel>
              )}
            </FormControl>
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

            <FormControl my="3">
              <FormLabel>Phone No:</FormLabel>
              <Input
                type="text"
                placeholder="Enter Phone Number"
                name="phone-no"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Please enter your phone no.
                </FormLabel>
              )}
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
                  delete validation.courses;
                }}
              >
                <option value="tajweed">Tajweed</option>
                <option>Course 2</option>
                <option>Course 3</option>
              </Select>
              {validation?.courses && (
                <FormLabel color="brand.error" my="2">
                  Select course that you want to teach.
                </FormLabel>
              )}
            </FormControl>

            <FormControl my="3">
              <FormLabel>About You:</FormLabel>
              <Textarea
                placeholder="Enter your short intro.."
                height="100px"
                {...register("intro", { required: true })}
              />
              {errors.about?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Please tell use about you something.
                </FormLabel>
              )}
            </FormControl>
            <FormControl my="3">
              <FormLabel>Your Age:</FormLabel>
              <Input
                type="number"
                placeholder="Enter your age"
                {...register("age", { required: true })}
              />
              {errors.age?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Please enter your age.
                </FormLabel>
              )}
            </FormControl>
            <FormControl my="3">
              <FormLabel>Country:</FormLabel>
              <Input
                type="text"
                placeholder="Enter your country"
                {...register("country")}
              />
              {errors.country?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Please enter your country.
                </FormLabel>
              )}
            </FormControl>
            <FormControl my="3">
              <FormLabel>City:</FormLabel>
              <Input
                type="text"
                placeholder="Enter your city"
                {...register("city", { required: true })}
              />
              {errors.city?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Please enter your city.
                </FormLabel>
              )}
            </FormControl>
            <FormControl my="3">
              <FormLabel>Gender:</FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio
                    value="male"
                    {...register("gender", { required: true })}
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    {...register("gender", { required: true })}
                  >
                    Female
                  </Radio>
                  <Radio
                    value="other"
                    {...register("gender", { required: true })}
                  >
                    Other
                  </Radio>
                </Stack>
              </RadioGroup>
              {errors.gender?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Please specify your gender.
                </FormLabel>
              )}
            </FormControl>
            <FormControl my="3">
              <FormLabel>Recitation:</FormLabel>
              <input
                type="file"
                onChange={(e) => {
                  delete validation.recitationRecording;
                  setRecitationRecording(e.target.files[0]);
                }}
              />
              {validation?.recitationRecording && (
                <FormLabel color="brand.error" my="2">
                  Please upload your recitation recording
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
