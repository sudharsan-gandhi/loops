import { useRef } from 'react';

import { EditLoop } from 'components/audio/loop.edit';
import {
  deleteOneLoop,
  deleteOnePack,
  deleteOneVariable,
  Loop,
  MakeOptional,
  Pack,
  User,
} from 'queries';
import { FaFileAudio } from 'react-icons/fa';
import {
  FiEdit,
  FiPlay,
} from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IsOwn } from 'state/user';

import { useMutation } from '@apollo/client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

function labelAndValue(label, value) {
  return (
    <>
      <VStack
        justifyContent={"baseline"}
        display={{ base: "none", md: "flex" }}
      >
        <Box>
          <Badge colorScheme={"red"}>{label}</Badge>
        </Box>
        <Box>
          <Text isTruncated>{value}</Text>
        </Box>
      </VStack>
    </>
  );
}

function labelHorizontal(label, value) {
  return (
    <HStack pt={4} justifyContent={"baseline"}>
      <Box>
        <Badge colorScheme={"red"}>{label}</Badge>
      </Box>
      <Box>{value}</Box>
    </HStack>
  );
}

function deleteAlert(deleteRef, toDelete, closeDelete, deleteAudioFn) {
  return (
    <AlertDialog
      leastDestructiveRef={deleteRef}
      isOpen={toDelete}
      onClose={closeDelete}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Audio
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={closeDelete}>Cancel</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                closeDelete();
                deleteAudioFn();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

const EditModal: React.FC<{
  name: string;
  isEditOpen: any;
  closeEdit: any;
}> = ({ name, isEditOpen, closeEdit, children }) => {
  return (
    <Box w={"full"} position="relative">
      <Modal isOpen={isEditOpen} onClose={closeEdit} size={"full"}>
        <ModalOverlay />
        <ModalContent> 
          <ModalHeader>
            <Heading
              w="full"
              textAlign={"center"}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {name.toUpperCase()}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export const LoopCardWithPack: React.FC<{
  pack: Pack;
  packId: string;
  refetch: any;
  user?: MakeOptional<User, keyof User>;
}> = ({ pack, packId, refetch, user }) => {
  const {
    isOpen: isAudioModalOpen,
    onOpen: openAudioModal,
    onClose: closeAudioModal,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: OpenEdit,
    onClose: closeEdit,
  } = useDisclosure();
  const {
    isOpen: toDelete,
    onOpen: openDelete,
    onClose: closeDelete,
  } = useDisclosure();
  const {
    audio: { edges: audioList },
  } = pack;
  const audio = audioList[0].node;
  const [deletePack] = useMutation<{ deleteOnePack: Pack }>(deleteOnePack);
  const [deleteAudio] = useMutation<{ deleteOneLoop: Loop }>(deleteOneLoop);
  const deleteRef = useRef();
  const toast = useToast();

  const deleteAudioFn = async () => {
    try {
      const {
        data: { deleteOneLoop: deleted },
      } = await deleteAudio(deleteOneVariable(audio.id));
      const {
        data: { deleteOnePack: deletedPack },
      } = await deletePack(deleteOneVariable(packId));
      toast({
        title: "Successfully deleted audio",
        description: deletedPack.name,
        status: "success",
        variant: "left-accent",
        position: "top",
      });
      refetch();
    } catch (e) {
      toast({
        title: "Error deleting audio",
        description: e.message,
        status: "error",
        variant: "left-accent",
        position: "top",
      });
      console.log(e);
    }
  };

  function showPrice(pack) {
    return (
      <>
        {pack?.price > 0 ? (
          <VStack justifyContent={"baseline"}>
            <Box>
              <Badge colorScheme={"red"} fontSize={"lg"} px={3} py={2}>
                $ {pack.price}
              </Badge>
            </Box>
            {/* <Box fontWeight={"bold"} color={"green.800"}></Box> */}
          </VStack>
        ) : (
          <VStack justifyContent={"baseline"}>
            <Box>
              <Badge
                colorScheme={"red"}
                fontSize={"lg"}
                px={3}
                py={2}
                borderRadius={"2px"}
              >
                Free
              </Badge>
            </Box>
            {/* <Box fontWeight={"bold"} color={"green.800"}></Box> */}
          </VStack>
        )}
      </>
    );
  }

  return (
    <>
      <Box
        border={"1px solid"}
        borderColor={"red.200"}
        borderRadius={4}
        p="5"
        m="5"
        boxShadow="2xl"
        w="100%"
      >
        <HStack justifyContent="space-between" w="100%">
          <Center>
            <IconButton aria-label="play" icon={<FiPlay></FiPlay>}></IconButton>
          </Center>
          <VStack justifyContent={"baseline"} width="30%">
            <Box display={{ base: "none", lg: "flex" }}>
              <Badge colorScheme={"red"}>Name</Badge>
            </Box>
            <Box fontWeight={"bold"} textAlign="center" w="100%">
              <Text isTruncated>{audio.name.toUpperCase()}</Text>
            </Box>
          </VStack>
          {labelAndValue("BPM", audio.bpm)}
          {labelAndValue("Genre", audio.genre)}
          {labelAndValue("Tempo", audio.tempo)}
          {audio.key && labelAndValue("Note", audio.key)}
          {labelAndValue("Type", audio.audioType)}
          {showPrice(pack)}
          <Center>
            <IconButton
              variant={"ghost"}
              aria-label="extra"
              icon={<HiDotsVertical />}
              onClick={openAudioModal}
            />
          </Center>
        </HStack>
      </Box>
      <Drawer
        isOpen={isAudioModalOpen}
        placement="right"
        onClose={closeAudioModal}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack justifyContent="center" alignItems="baseline">
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {audio.name.toUpperCase()}{" "}
              </Text>
              {showPrice(pack)}
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack h="100%" alignItems={"start"}>
              {labelHorizontal("BPM", audio.bpm)}
              {labelHorizontal("Genre", audio.genre)}
              {labelHorizontal("Tempo", audio.tempo)}
              {audio.key && labelHorizontal("Note", audio.key)}
              {labelHorizontal("Type", audio.audioType)}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <IsOwn userId={user?.id}>
              <HStack w="100%" justifyContent={"center"}>
                <Box>
                  <Button
                    leftIcon={<FiEdit />}
                    onClick={() => {
                      closeAudioModal();
                      OpenEdit();
                    }}
                  >
                    Edit Audio
                  </Button>
                </Box>
                <Box>
                  <Button
                    leftIcon={<MdDeleteOutline />}
                    ref={deleteRef}
                    onClick={openDelete}
                  >
                    Delete Audio
                  </Button>
                </Box>
              </HStack>
            </IsOwn>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {audio && (
        <EditModal
          name={audio.name}
          isEditOpen={isEditOpen}
          closeEdit={closeEdit}
        >
          <EditLoop
            packId={packId}
            loop={audio}
            isLoop={true}
            refetch={refetch}
          />
        </EditModal>
      )}
      {deleteAlert(deleteRef, toDelete, closeDelete, deleteAudioFn)}
    </>
  );
};

export const LoopCard: React.FC<{
  audio: Loop;
  packId: string;
  user?: MakeOptional<User, keyof User>;
  showPackLink?: boolean;
  refetch: any;
}> = ({ audio, packId, refetch, user, showPackLink = false }) => {
  const {
    isOpen: isAudioModalOpen,
    onOpen: openAudioModal,
    onClose: closeAudioModal,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: OpenEdit,
    onClose: closeEdit,
  } = useDisclosure();
  const {
    isOpen: toDelete,
    onOpen: openDelete,
    onClose: closeDelete,
  } = useDisclosure();
  const [deleteAudio] = useMutation<{ deleteOneLoop: Loop }>(deleteOneLoop);
  const deleteRef = useRef();
  const toast = useToast();

  const deleteAudioFn = async () => {
    try {
      debugger;
      const {
        data: { deleteOneLoop: deleted },
      } = await deleteAudio(deleteOneVariable(audio.id));
      toast({
        title: "Successfully deleted audio",
        description: deleted.name,
        status: "success",
        variant: "left-accent",
        position: "top",
      });
      refetch();
    } catch (e) {
      toast({
        title: "Error deleting audio",
        description: e.message,
        status: "error",
        variant: "left-accent",
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        border={"1px solid"}
        borderColor={"red.200"}
        borderRadius={4}
        p="5"
        boxShadow="2xl"
        w={{ base: "sm", md: "lg", lg: "3xl" }}
      >
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Center>
            <IconButton aria-label="play" icon={<FiPlay></FiPlay>}></IconButton>
          </Center>
          <VStack justifyContent={"center"} w="30%">
            <Box display={{ base: "none", lg: "block" }}>
              <Badge colorScheme={"red"}>Name</Badge>
            </Box>
            <Box fontWeight={"bold"}>
              <Text isTruncated>{audio.name}</Text>
            </Box>
          </VStack>
          {labelAndValue("BPM", audio.bpm)}
          {labelAndValue("Genre", audio.genre)}
          {labelAndValue("Tempo", audio.tempo)}
          {audio.key && labelAndValue("Note", audio.key)}
          {labelAndValue("Type", audio.audioType)}
          <Center>
            <IconButton
              variant={"ghost"}
              aria-label="extra"
              icon={<HiDotsVertical />}
              onClick={openAudioModal}
            ></IconButton>
          </Center>
        </HStack>
      </Box>
      <Drawer
        isOpen={isAudioModalOpen}
        placement="right"
        onClose={closeAudioModal}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text fontSize={{ base: "sm", md: "xl" }} fontWeight={"bold"}>
              {audio.name.toUpperCase()}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack h="100%" alignItems={"start"}>
              {labelHorizontal("BPM", audio.bpm)}
              {labelHorizontal("Genre", audio.genre)}
              {labelHorizontal("Tempo", audio.tempo)}
              {audio.key && labelHorizontal("Note", audio.key)}
              {labelHorizontal("Type", audio.audioType)}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack w="100%" justifyContent={"center"}>
              {showPackLink && !audio.pack.isLoop && (
                <Box>
                  <Button
                    as={Link}
                    to={`/pack/${audio.packId || audio.pack.id}`}
                    leftIcon={<FaFileAudio />}
                    onClick={() => {
                      closeAudioModal();
                      OpenEdit();
                    }}
                  >
                    Go to Pack
                  </Button>
                </Box>
              )}
              <IsOwn userId={user?.id}>
                <>
                  <Box>
                    <Button
                      leftIcon={<FiEdit />}
                      onClick={() => {
                        closeAudioModal();
                        OpenEdit();
                      }}
                    >
                      Edit Audio
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      leftIcon={<MdDeleteOutline />}
                      ref={deleteRef}
                      onClick={openDelete}
                    >
                      Delete Audio
                    </Button>
                  </Box>
                </>
              </IsOwn>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {audio && (
        <EditModal
          name={audio.name}
          isEditOpen={isEditOpen}
          closeEdit={closeEdit}
        >
          <EditLoop
            packId={packId}
            loop={audio}
            isLoop={false}
            refetch={refetch}
          />
        </EditModal>
      )}
      {deleteAlert(deleteRef, toDelete, closeDelete, deleteAudioFn)}
    </>
  );
};
