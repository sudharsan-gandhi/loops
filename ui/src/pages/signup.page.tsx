import { useState } from 'react';

import axios from 'axios';
import { UserForm } from 'components/user/_user.form';
import {
  signupUser,
  signupVariables,
  User,
} from 'queries';
import {
  Link as Router,
  useNavigate,
} from 'react-router-dom';

import { useMutation } from '@apollo/client';
import {
  Box,
  Flex,
  Heading,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

export const State = (state) => <pre>{JSON.stringify(state, null, 2)}</pre>;

const SignUp: React.FC = () => {
  const [createOneUser, { loading }] = useMutation<{ createOneUser: User }>(
    signupUser
  );
  const history = useNavigate();
  const toast = useToast();

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
      const {
        data: { createOneUser: u },
      } = await createOneUser(signupVariables(data));
      toast({
        title: `User ${u.name} created Successfully`,
        description: "redirecting to Signin page",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      history("/signin", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const [files, setFiles] = useState([]);

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
              <UserForm
                buttonText="Sign Up"
                files={files}
                setFiles={setFiles}
                handleSubmit={submit}
              />
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

export default SignUp;
