import {
  useContext,
  useState,
} from 'react';

import { Cookies } from 'index';
import {
  createPack,
  Pack,
  packInputVariables,
} from 'queries';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
  Select,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

export const packetType = ["FREE", "PAID"];

export const CreatePack: React.FC = () => {
  let history = useNavigate();
  const [createOnePack, { loading, error }] =
    useMutation<{ createOnePack: Pack }>(createPack);
  const [isFree, setFree] = useState(false);
  console.log(isFree);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const setFreeField = (e) => {
    if (e.target.value === "FREE") {
      setFree(false);
    } else {
      setFree(true);
    }
  };

  const { cookies } = useContext(Cookies);

  const submit = async (data) => {
    try {
      data.authorId = cookies.get("userId") as number;
      const {
        data: { createOnePack: pack },
      } = await createOnePack(packInputVariables(data));
      console.log(pack);
      history(`/pack/${pack.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"start"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"container.md"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create your Audio Pack
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            You can audios ones packs are created.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          minBlockSize={"auto"}
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
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Pack Name</FormLabel>
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
                        value: 30,
                        message: "maximum characters allowed is 30",
                      },
                      minLength: {
                        value: 3,
                        message: "minimum length must be 3",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.type} isRequired>
                  <FormLabel>Pack Type</FormLabel>
                  <Select
                    id="type"
                    name="type"
                    defaultValue={""}
                    {...register("type", {
                      required: {
                        value: true,
                        message: "This Field is required",
                      },
                    })}
                    onLoad={setFreeField}
                    onChange={setFreeField}
                  >
                    <option key="defaultType" value="">
                      Select Pack Type
                    </option>
                    {packetType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.type && errors.type.message}
                  </FormErrorMessage>
                </FormControl>
                {isFree && (
                  <FormControl key="price" isInvalid={errors.price}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      {...register("price", {
                        required: {
                          value: true,
                          message: "This Field is required",
                        },
                        max: {
                          value: 200,
                          message: "Price cannot be greater than 200",
                        },
                        valueAsNumber: true,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.price && errors.price.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
                <FormControl
                  id="description"
                  isInvalid={errors.description}
                  isRequired
                >
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    id="description"
                    name="description"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "This Field is required",
                      },
                      maxLength: {
                        value: 200,
                        message: "maximum characters allowed is 200",
                      },
                      minLength: {
                        value: 5,
                        message: "minimum length must be 5",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
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
                    Create Pack
                  </Button>
                </Stack>
              </form>
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};
