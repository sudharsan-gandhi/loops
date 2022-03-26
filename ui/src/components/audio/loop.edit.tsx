import {
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { AppContext } from 'index';
import {
  updateOneAudio,
  updateOneLoopVariables,
  updateOnePack,
  updateOnePackVariables,
} from 'queries';
import {
  Loop,
  MakeOptional,
  Pack,
} from 'queries/model';
import { useForm } from 'react-hook-form';
import { MdGraphicEq } from 'react-icons/md';
import { loopValidations } from 'validations/loop.validation';
import { packValidations } from 'validations/pack.validation';

import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  Dropzone,
  FileItem,
} from '@dropzone-ui/react';

import {
  audioTypes,
  genres,
  musicalNotes,
} from './audio.model';
import { packetType } from './pack.create';

const EditLoop: React.FC<{
  packId: string;
  loop: MakeOptional<Loop, keyof Loop>;
  isLoop: boolean;
  refetch?: any;
}> = ({ packId, loop: defaultValue = {}, isLoop = false, refetch }) => {
  const [updatePack] = useMutation<{ UpdateOnePack: Pack }>(updateOnePack);
  const [updateLoop] = useMutation<{ UpdateOneLoop: Loop }>(updateOneAudio);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { ...(defaultValue as any) },
  });
  const [isOneShot, setOneShot] = useState(false);
  const [tempoValue, setTempo] = useState(0);
  useEffect(() => {
    setTempo(defaultValue.tempo || 0);
  }, []);
  const [files, setFiles] = useState([]);
  const [isFree, setFree] = useState(false);
  const toast = useToast();
  const { cookies } = useContext(AppContext);

  const setFreeField = (e) => {
    if (e.target.value === "FREE") {
      setFree(false);
    } else {
      setFree(true);
    }
  };

  const updateFiles = (files) => {
    setFiles(files);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const submit = async (data) => {
    data.tempo = tempoValue;
    data.bpm = data.bpm ? parseInt(data.bpm) : undefined;
    try {
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0].file);

        const response = await axios({
          method: "post",
          url: "/upload/audio",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        console.log(response.data.path);
        data.path = response.data.path;
      }
    } catch (e) {
      toast({
        title: `Error updating new audio file`,
        description: e.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log(e);
      return false;
    }
    const authorId = cookies.get("userId");
    try {
      if (!isLoop) {
        // submit the audio to a package
        data.packId = packId;
        setLoading(true);
        const loop: MakeOptional<Loop, keyof Loop> = await updateLoop(
          updateOneLoopVariables(data)
        );
        setLoading(false);
        toast({
          title: `Success updated audio details`,
          description: `${loop.name} added to pack`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        if (refetch) {
          refetch();
        }
        //redirect to pack page
        return;
      } else {
        const packInput: MakeOptional<Pack, keyof Pack> = {
          id: packId,
          name: data.name,
          price: data.price,
          type: data.type,
          description: data.description,
          authorId: authorId,
        };
        setLoading(true);
        const {
          data: { UpdateOnePack: pack },
        } = await updatePack(updateOnePackVariables(packInput));

        delete data.type;
        delete data.description;
        delete data.price;
        data.packId = pack.id;
        const {
          data: { UpdateOneLoop: loop },
        } = await updateLoop(updateOneLoopVariables(data));
        toast({
          title: `Successfully updated loop`,
          description: `${loop.name} updated`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
    } catch (e) {
      toast({
        title: `Error updating data`,
        description: e.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
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
          {!packId ? (
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Edit your audio details
            </Heading>
          ) : null}
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
                <FormControl id="name" isInvalid={errors.name}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    {...register("name", {
                      ...loopValidations.name.maxLength,
                      ...loopValidations.name.minLength,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                {!packId && (
                  <>
                    <FormControl isInvalid={errors.type}>
                      <FormLabel>Paid/Free</FormLabel>
                      <Select
                        id="type"
                        name="type"
                        defaultValue={""}
                        {...register("type", {})}
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
                    <FormControl
                      id="description"
                      isInvalid={errors.description}
                    >
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        id="description"
                        name="description"
                        {...register("description", {
                          ...packValidations.description.maxLength,
                        })}
                      />
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
                      </FormErrorMessage>
                    </FormControl>
                  </>
                )}
                {isFree && (
                  <FormControl key="price" isInvalid={errors.price}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      {...register("price", {
                        ...packValidations.price.min,
                        ...packValidations.price.max,
                        valueAsNumber: true,
                      })}
                    />
                    <FormErrorMessage>
                      {errors.price && errors.price.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
                <FormControl id="bpm" isInvalid={errors.bpm}>
                  <FormLabel>Beats Per Minute</FormLabel>
                  <Input
                    type="number"
                    id="bpm"
                    name="bpm"
                    {...register("bpm", {})}
                  />
                  <FormErrorMessage>
                    {errors.bpm && errors.bpm.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.audioType}>
                  <FormLabel>Audio Type</FormLabel>
                  <Select
                    id="audioType"
                    name="audioType"
                    defaultValue={""}
                    {...register("audioType", {})}
                    onChange={(e) => {
                      console.log(e.target.value);
                      if (e.target.value === "oneshot") {
                        setOneShot(true);
                      } else {
                        setOneShot(false);
                      }
                    }}
                  >
                    <option key="defaultType" value="">
                      Select Audio Type
                    </option>
                    {audioTypes.map((audioType) => (
                      <option key={audioType} value={audioType}>
                        {audioType}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.audioType && errors.audioType.message}
                  </FormErrorMessage>
                </FormControl>
                {isOneShot && (
                  <FormControl isInvalid={errors.key}>
                    <FormLabel>key</FormLabel>
                    <Select
                      id="key"
                      name="key"
                      defaultValue={""}
                      {...register("key", {})}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    >
                      <option key="defaultType" value="">
                        Select key
                      </option>
                      {musicalNotes.map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {errors.key && errors.key.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
                <FormControl isInvalid={errors.genre}>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    id="genre"
                    name="genre"
                    defaultValue={""}
                    {...register("genre", {})}
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  >
                    <option key="defaultType" value="">
                      Select genre
                    </option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.genre && errors.genre.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.tempo}>
                  <FormLabel>Tempo</FormLabel>
                  <FormHelperText>{tempoValue}</FormHelperText>
                  <Slider
                    min={0}
                    max={loopValidations.tempo.maxConstant}
                    defaultValue={defaultValue?.tempo}
                    onChange={(val) => setTempo(val)}
                  >
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <SliderThumb boxSize={6} index={0}>
                      <Box color="tomato" as={MdGraphicEq} />
                    </SliderThumb>
                  </Slider>
                  <FormErrorMessage>
                    {errors.tempo && errors.tempo.message}
                  </FormErrorMessage>
                </FormControl>
                <Box py={10}>
                  <Dropzone
                    onChange={updateFiles}
                    value={files}
                    maxFiles={1}
                    behaviour={"replace"}
                    accept={"audio/*"}
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
                    Update Audio {!isLoop && "in Pack"}
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

export { EditLoop };
