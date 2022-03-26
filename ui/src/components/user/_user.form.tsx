import { useState } from 'react';

import {
  MakeOptional,
  User,
} from 'queries';
import { useForm } from 'react-hook-form';
import {
  MdOutlinePassword,
  MdRemoveRedEye,
} from 'react-icons/md';
import { userValidations } from 'validations/user.validation';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {
  Dropzone,
  FileItem,
} from '@dropzone-ui/react';

export const UserForm: React.FC<{
  handleSubmit: any;
  buttonText: string;
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  files: any[];
  user?: MakeOptional<User, keyof User>;
  update?: boolean;
}> = ({
  handleSubmit: submit,
  buttonText,
  setFiles,
  files,
  user,
  update = false,
}) => {
  const defaultValue = {
    name: "",
    about: "",
    email: "",
    password: "",
    image: "",
  };
  const [showPassword, setShowPassword] = useState(false);

  let requiredValidation: any = {
    value: true,
    message: "This Field is required",
  };
  if (update) {
    requiredValidation = {};
  }
  const updateFiles = (files) => {
    setFiles(files);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  console.log(user);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: { ...defaultValue, ...(user as any) },
  });
  console.log("user", user);
  return (
    <form onSubmit={handleSubmit(submit)}>
      <FormControl id="name" isInvalid={errors.name} isRequired={!update}>
        <FormLabel>Display Name</FormLabel>
        <Input
          type="text"
          id="name"
          name="name"
          {...register("name", {
            ...requiredValidation,
            ...userValidations.name.minLength,
            ...userValidations.name.maxLength,
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      {user?.authorizer && user.authorizer.toUpperCase() !== "LOCAL" && (
        <>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Text fontWeight="bold">{user.email}</Text>
          </FormControl>
        </>
      )}
      {(!user?.authorizer || user?.authorizer.toUpperCase() === "LOCAL") && (
        <>
          <FormControl id="email" isInvalid={errors.email} isRequired={!update}>
            <FormLabel>Email address</FormLabel>
            <Input
              {...register("email", {
                ...requiredValidation,
                ...userValidations.email.minLength,
                ...userValidations.email.maxLength,
                ...userValidations.email.pattern,
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
            isRequired={!update}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                {...register("password", {
                  ...requiredValidation,
                  ...userValidations.password.pattern,
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
                  {showPassword ? <MdRemoveRedEye /> : <MdOutlinePassword />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
      <FormControl id="about" isInvalid={errors.about}>
        <FormLabel>About</FormLabel>
        <Textarea
          {...register("about", {
            ...userValidations.about.maxLength,
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
          disabled={JSON.stringify(dirtyFields) === "{}" || !isValid}
        >
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
};
