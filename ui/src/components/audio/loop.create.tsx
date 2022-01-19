import { useState } from 'react';

import { createPack } from 'queries/audio/audio.mutation';
import {
  MakeOptional,
  Pack,
} from 'queries/model';
import { useForm } from 'react-hook-form';
import { MdGraphicEq } from 'react-icons/md';

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
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Dropzone,
  FileItem,
} from '@dropzone-ui/react';

export const audioTypes = ["oneshot", "loop"];
export const musicalNotes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const genres = [
  "Punk",
  "Rock",
  "folk",
  "Lo-fi",
  "Blues",
  "Reggae",
  "R&B",
  "Dubstep",
  "Electro",
];

const CreateLoop: React.FC<{ packId?: string }> = ({ ...props }) => {
  const packId = props?.packId || "";
  const [createOneLoop, { data, loading, error }] = useMutation(createPack);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const [isOneShot, setOneShot] = useState(false);
  const [tempoValue, setTempo] = useState(0);
  const [files, setFiles] = useState([]);
  const updateFiles = (files) => {
    setFiles(files);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const submit = async (data) => {
    // todo: should implement logic here to upload audio and get the file path
    if (packId) {
      // submit the audio as single package
      data.packId = packId;
      // todo: audio to pack logic

      return;
    } else {
      const pack: MakeOptional<Pack, keyof Pack> = {
        name: data.name,
        price: data.price,
        type: data.type,
        audio: data,
      };
      delete data.price;
      // todo: submit pack logic
      return;
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
          {!packId ? 
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Upload your single audio loop
            </Heading>
          : null}
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
              <form>
                <FormControl id="name" isInvalid={errors.name} isRequired>
                  <FormLabel>Title</FormLabel>
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

                <FormControl id="bpm" isInvalid={errors.bpm} isRequired>
                  <FormLabel>Beats Per Minute</FormLabel>
                  <Input
                    type="text"
                    id="bpm"
                    name="bpm"
                    {...register("bpm", {
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
                    {errors.bpm && errors.bpm.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.audioType} isRequired>
                  <FormLabel>Audio Type</FormLabel>
                  <Select
                    id="audioType"
                    name="audioType"
                    defaultValue={""}
                    {...register("audioType", {
                      required: {
                        value: true,
                        message: "This Field is required",
                      },
                    })}
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
                  <FormControl isInvalid={errors.key} isRequired>
                    <FormLabel>key</FormLabel>
                    <Select
                      id="key"
                      name="key"
                      defaultValue={""}
                      {...register("key", {
                        required: {
                          value: true,
                          message: "This Field is required",
                        },
                      })}
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
                    {...register("genre", {
                      required: {
                        value: true,
                        message: "This Field is required",
                      },
                    })}
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
                <FormControl isInvalid={errors.tempo} isRequired>
                  <FormLabel>Tempo</FormLabel>
                  <FormHelperText>{tempoValue}</FormHelperText>
                  <Slider
                    min={0}
                    max={300}
                    defaultValue={tempoValue}
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
                    Add Audio {packId && "to Pack"}
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

export { CreateLoop };
