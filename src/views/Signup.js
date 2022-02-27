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
import { Spinner } from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Backend_url } from "../BackEnd";
import AlertErr from "../components/AlertErr";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import firebase from 'firebase';
import { ref, uploadBytes, storage, getDownloadURL } from "../firebase-config";
import axios from "axios";
import { login } from "../store/authSlice";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "availableSlots",
    }
  );

  const [recitationRecording, setRecitationRecording] = useState(null);
  const [courses, setCourses] = useState([]);
  const [validation, setValidations] = useState({});

  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // const onSubmit = (data) => console.log(data);
  const onSubmit = async (data) => {
    try {
      if (!recitationRecording) {
        validation.recitationRecording = true;
        return;
      }
      if (!courses.length) {
        validation.courses = true;
        return;
      }

      if (data.availableSlots.length === 0) {
        console.log("testttt");
        swal({
          icon: "error",
          title: "Error",
          text: "Please add your available slots",
        });
        return;
      }

      setLoading(true);
      const url = await handleUploadApplicant();

      console.log(data.availableSlots);

      const slots = data.availableSlots.map((item) => {
        return {
          day: item.day,
          hours: item.time.split(","),
        };
      });
      console.log(slots);

      const allData = {
        ...data,
        courses,
        recitation: url,
        age: Number(data.age),
        availableSlots: slots,
      };
      console.log(allData);

      const response = await axios({
        method: "POST",
        data: allData,
        url: `${Backend_url}/auth/signup/teacher`,
      });

      if (response.data.statusCode === 400) {
        swal.fire({
          message: "Account Already Exist",
        });
        return;
      }
      const loginResponse = await axios({
        method: "POST",
        data: {
          email: response.data.email,
          password: allData.password,
        },
        url: `${Backend_url}/auth/login/teacher`,
      });
      dispatch(login(loginResponse));

      if (response) {
        setLoading("success");
      }
    } catch (error) {
      if (error.response?.data?.message === "Account already exists.") {
        swal({
          icon: "error",
          title: "Oops...",
          text: "Account already exist!",
        });
      }
    }
  };

  const handleUploadApplicant = async () => {
    const storageRef = ref(storage, `/recitations/${recitationRecording.name}`);

    const url = await uploadBytes(storageRef, recitationRecording).then(
      async (snapshot) => {
        console.log(snapshot);

        const downloadUrl = await getDownloadURL(
          ref(storage, `/recitations/${recitationRecording.name}`)
        );
        return downloadUrl;
      }
    );

    return url;
  };

  const handleDelete = (itemIndex) => {
    const deletedCourses = courses.filter((item, index) => index !== itemIndex);
    setCourses(deletedCourses);
  };

  const getAllCourses = async () => {
    const allCourses = await axios({
      url: `${Backend_url}/course/all`,
      method: "GET",
      headers: {
        Authorization:
          "Bearer 2aasssdaa1dd#ss$uufll6tt5a4n%@5g4m#a$i^l6.ecyo4m5453$#%#5t2as@#$we5f4lk@#65f65w2!214#$%",
      },
    });
    setAllCourses(allCourses.data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

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
              {errors.name?.type === "required" && (
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
                  if (e?.target.value === "Select a course") {
                    return;
                  }
                  console.log("e.target.value", e.target.value);
                  if (!courses.includes(e.target.value))
                    setCourses([...courses, e.target.value]);
                  delete validation.courses;
                }}
              >
                <option key={0}>{"Select a course"}</option>
                {allCourses.map((item, key) => {
                  return <option key={key + 1}>{item.name}</option>;
                })}
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
            <FormControl my="3">
              <FormLabel>Time Slots:</FormLabel>

              {fields.map((field, index) => (
                <>
                  <FormControl my="3">
                    <FormLabel>Day:</FormLabel>
                    <Select {...register(`availableSlots.${index}.day`)}>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Time:</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your time slots"
                      {...register(`availableSlots.${index}.time`, {
                        min: 0,
                        max: 23,
                        required: true,
                      })}
                    />
                    <Text my="2" fontSize="xs">
                      Enter time slots seprated by comma, 0,3,6, 20 means
                      0=12AM, 3=3AM, 6=6AM, 20=8PM
                    </Text>
                  </FormControl>
                  {errors.availableSlots && (
                    <>
                      {errors?.availableSlots[index]?.time?.type === "min" && (
                        <FormLabel color="brand.error" my="2">
                          You have entered wrong time slots, please check.
                        </FormLabel>
                      )}
                      {errors?.availableSlots[index]?.time?.type === "max" && (
                        <FormLabel color="brand.error" my="2">
                          You have entered wrong time slots, please check.
                        </FormLabel>
                      )}
                      {errors?.availableSlots[index]?.time?.type ===
                        "required" && (
                        <FormLabel color="brand.error" my="2">
                          Time Slots is required
                        </FormLabel>
                      )}
                    </>
                  )}
                </>
              ))}
              <Text
                onClick={() => append()}
                color="brand.primary"
                cursor="pointer"
                my="3"
              >
                Click to add Time Slotes
              </Text>
            </FormControl>
            <FormControl my="3">
              <FormLabel>Room Link:</FormLabel>
              <Input
                placeholder="Enter Room Link"
                {...register("roomLink", { required: true })}
              />
              {errors.roomLink?.type === "required" && (
                <FormLabel color="brand.error" my="2">
                  Room Link Required.
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
                {loading === true ? (
                  <Spinner />
                ) : loading === "success" ? (
                  swal({
                    title: "Success",
                    text: "You are Register",
                    icon: "success",
                  }).then(() => {
                    navigate("/login");
                  })
                ) : (
                  ""
                )}
              </Button>
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
