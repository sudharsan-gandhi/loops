import { useState } from 'react';

import axios from 'axios';
import {
  MakeOptional,
  updateOneUser,
  updateOneUserVariables,
  User,
} from 'queries';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useUser } from 'state/user';

import { useMutation } from '@apollo/client';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { UserForm } from './_user.form';

const EditUser: React.FC = () => {
  const [updateUser, { loading }] = useMutation(updateOneUser);
  const history = useNavigate();
  let { state: location } = useLocation();
  let from = (location as any)?.from?.pathname || "/";
  let setUser = useUser((state) => state.setUser);
  const toast = useToast();
  const [files, setFiles] = useState([]);
  const currentUser: MakeOptional<User, keyof User> = useUser(
    (state) => state.currentUser
  );
  const mutationFields = [
    "id",
    "name",
    "email",
    "password",
    "image",
    "about",
    "role",
  ];
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
      console.log(data);

      let newData = Object.entries(data)
        .filter(([_, v]) => {
          console.log(v);
          return true;
        })
        .filter(([_, v]) => v && (v as string) !== "")
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

      newData = mutationFields.reduce((acc, field) => {
        if (!!newData[field] && newData[field].trim() !== "") {
          acc[field] = newData[field];
        }
        return acc;
      }, {});

      const {
        data: { updateOneUser: u },
      }: any = await updateUser(updateOneUserVariables(newData));
      toast({
        title: `User ${u.name} updated Successfully`,
        description: "redirecting to dashboard",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setUser(u);
      history(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
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
            Edit Profile{" "}
          </Heading>
          {currentUser?.authorizer?.toUpperCase() !== "LOCAL" && (
            <Badge colorScheme="red" p="1">
              {currentUser.authorizer} User
            </Badge>
          )}
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
                buttonText="update user"
                handleSubmit={submit}
                setFiles={setFiles}
                files={files}
                user={currentUser}
                update={true}
              />
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default EditUser;
