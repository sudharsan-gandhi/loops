import {
  useContext,
  useEffect,
} from 'react';

import { LoopCard } from 'components/cards/loop.card';
import { AppContext } from 'index';
import {
  getPackWithAudiosById,
  getPackWithAudiosByIdVariables,
  Pack,
} from 'queries';
import {
  FiEdit,
  FiMusic,
} from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { IsOwn } from 'state/user';

import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { CreateLoop } from './loop.create';
import { EditPack } from './pack.edit';

export const ShowPack: React.FC = () => {
  const params = useParams();
  const { cookies } = useContext(AppContext);
  const userId = cookies.get("userId");
  const id = params.id;
  const { data, error, loading, refetch } = useQuery<{ pack: Pack }>(
    getPackWithAudiosById,
    getPackWithAudiosByIdVariables(id)
  );
  const theme = useColorModeValue("white", "gray.900");
  const headingTheme = useColorModeValue("gray.700", "white");
  const toast = useToast();
  const {
    isOpen: isModelOpen,
    onOpen: onModelOpen,
    onClose: onModelClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: OpenEdit,
    onClose: closeEdit,
  } = useDisclosure();

  useEffect(() => {
    if (error) {
      toast({
        title: `Error while fetching pack details`,
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  }, [error]);

  console.log("data", data);
  const pack = data?.pack;
  return (
    <>
      <Container maxW="container.xl">
        <Flex alignItems={"flex-start"} justifyContent={"center"} mt="2">
          <VStack>
            <VStack
              w={{
                base: "container",
                md: "container.sm",
                lg: "container.md",
                xl: "container.xl",
              }}
            >
              {loading && (
                <Stack>
                  <Skeleton height="100px" />
                </Stack>
              )}
              {error && (
                <Stack>
                  <Text>Cannot load pack. Please try again later</Text>
                </Stack>
              )}
              {pack && (
                <Box
                  w={"full"}
                  bg={theme}
                  boxShadow={"2xl"}
                  rounded={"md"}
                  p={6}
                  overflow={"hidden"}
                >
                  <Stack>
                    <HStack justifyContent={"space-between"}>
                      <Heading
                        color={headingTheme}
                        fontSize={"2xl"}
                        fontFamily={"body"}
                      >
                        {pack.name.toUpperCase()}
                      </Heading>
                      <Text>{pack.author.id}</Text>
                      <IsOwn userId={pack.author.id || pack.authorId}>
                        <>
                          <HStack display={{ base: "none", md: "block" }}>
                            <Button
                              aria-label="Edit Pack"
                              leftIcon={<FiEdit />}
                              onClick={OpenEdit}
                            >
                              {pack?.isLoop ? "Edit Loop" : "Edit Pack"}
                            </Button>
                            <Button
                              aria-label="add audio"
                              leftIcon={
                                <>
                                  <FiMusic />
                                  <sup>
                                    <MdAdd />
                                  </sup>
                                </>
                              }
                              onClick={onModelOpen}
                            >
                              Add Audio
                            </Button>
                          </HStack>
                          <HStack display={{ base: "block", md: "none" }}>
                            <IconButton
                              aria-label="add audio"
                              leftIcon={<FiEdit />}
                              onClick={onModelOpen}
                            />
                            <IconButton
                              aria-label="add audio"
                              leftIcon={
                                <>
                                  <FiMusic />
                                  <sup>
                                    <MdAdd />
                                  </sup>
                                </>
                              }
                              onClick={onModelOpen}
                            />
                          </HStack>
                        </>
                      </IsOwn>
                    </HStack>

                    <Text
                      color={"green.500"}
                      textTransform={"uppercase"}
                      fontWeight={800}
                      fontSize={"sm"}
                      letterSpacing={1.1}
                    >
                      {pack.price && pack.price > 0
                        ? `$ ${pack.price} CAD`
                        : "Free"}
                    </Text>

                    <Text color={"gray.500"}>{pack?.description}</Text>
                  </Stack>
                  <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                    <Avatar src={pack?.author?.image} alt={"Author"} />
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                      <Text fontWeight={600}>
                        {pack?.author?.name.toUpperCase()}
                      </Text>
                      <Text color={"gray.500"}>
                        role: {pack.author.role || "user"}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              )}
            </VStack>
            <VStack pt={10} justifyContent="center" w="100%">
              {pack?.audio?.edges.length === 0 ? (
                <Box>
                  <Text>No audio Found</Text>
                </Box>
              ) : (
                pack?.audio?.edges.map(({ node }) => (
                  <>
                    <LoopCard
                      audio={node}
                      key={node.id}
                      packId={pack?.id}
                      user={pack.author}
                      refetch={refetch}
                    />
                  </>
                ))
              )}
            </VStack>
          </VStack>
        </Flex>
      </Container>
      {pack && (
        <Box w={"full"} position="relative">
          <Modal isOpen={isModelOpen} onClose={onModelClose} size={"full"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Heading
                  w="full"
                  textAlign={"center"}
                  color={headingTheme}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  Add Audio - {pack.name.toUpperCase()}
                </Heading>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <CreateLoop packId={pack.id} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      )}
      {pack && (
        <Box w={"full"} position="relative">
          <Modal isOpen={isEditOpen} onClose={closeEdit} size={"full"}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Heading
                  w="full"
                  textAlign={"center"}
                  color={headingTheme}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {pack.name.toUpperCase()}
                </Heading>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <EditPack pack={pack} refetch={refetch} editClose={closeEdit} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
};
