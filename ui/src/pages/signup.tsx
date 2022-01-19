import { useState } from 'react';

import axios from 'axios';
import {
  signupUser,
  signupVariables,
} from 'queries';
import { useForm } from 'react-hook-form';
import {
  MdOutlinePassword,
  MdRemoveRedEye,
} from 'react-icons/md';
import {
  Link as Router,
  useNavigate,
} from 'react-router-dom';

import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  Dropzone,
  FileItem,
} from '@dropzone-ui/react';

export const State = (state) => <pre>{JSON.stringify(state, null, 2)}</pre>;

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createOneUser, { data, loading, error }] = useMutation(signupUser);
  const history = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const submit = async (data) => {
    try {
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0].file);
        const response = await axios({
          method: "post",
          url: "/upload/avatar",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data.path);
        data.image = response.data.path;
      }
      const u: any = await createOneUser(signupVariables(data));
      toast({
        title: `User ${u.name} created Successfully`,
        description: "redirecting to Signin page",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top"
      });
      history("/signin", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const [files, setFiles] = useState([]);
  const updateFiles = (files) => {
    setFiles(files);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"container.md"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Welcome to Kabaflow
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            new user
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {loading ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(submit)}>
                <FormControl id="name" isInvalid={errors.name} isRequired>
                  <FormLabel>Display Name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "This Field is required",
                      },
                      maxLength: {
                        value: 75,
                        message: "maximum characters allowed is 75",
                      },
                      minLength: {
                        value: 5,
                        message: "minimum length must be 5",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="email" isInvalid={errors.email} isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This Field is required",
                      },
                      maxLength: {
                        value: 75,
                        message: "Maximum characters allowed is 75",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum length must be 8",
                      },
                      pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Not a valid email address",
                      },
                    })}
                    type="email"
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="password"
                  isInvalid={errors.password}
                  isRequired
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "This Field is required",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                          message:
                            "Password must contain one upper case letter and lower case letter with atleast one special character and a number",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? (
                          <MdRemoveRedEye />
                        ) : (
                          <MdOutlinePassword />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="about" isInvalid={errors.about}>
                  <FormLabel>About</FormLabel>
                  <Textarea
                    {...register("about", {
                      maxLength: {
                        value: 75,
                        message: "Maximum characters allowed is 75",
                      },
                      minLength: {
                        value: 8,
                        message: "Minimum length must be 8",
                      },
                    })}
                  ></Textarea>
                  <FormErrorMessage>
                    {errors.about && errors.about.message}
                  </FormErrorMessage>
                </FormControl>
                <Box py={10}>
                  <Dropzone
                    onChange={updateFiles}
                    value={files}
                    maxFiles={1}
                    behaviour={"replace"}
                    accept={"image/*"}
                    label={"Drop Files here or click to browse"}
                    minHeight={"195px"}
                    maxHeight={"500px"}
                    disableScroll
                  >
                    {files.map((file) => (
                      <FileItem
                        {...file}
                        key={file.id}
                        onDelete={onDelete}
                        alwaysActive
                        preview
                        info
                        resultOnTooltip
                      />
                    ))}
                  </Dropzone>
                </Box>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link as={Router} to="/signin" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
      )
    </Flex>
  );
};

const dropzone = {
  border: "1px dashed black",
};

export default SignUp;
