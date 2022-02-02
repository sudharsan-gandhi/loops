import React from 'react';

import data from 'meta.json';
import {
  Pack,
  PacketType,
} from 'queries';
import { BsHash } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { TiUserOutline } from 'react-icons/ti';

import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

export const Cards: React.FC = () => {
  return (
    <SimpleGrid columns={4} spacing={10} px={20} py={10}>
      {(data?.plugins ?? []).map((plugin) => (
        <Box key={plugin.name}>
          <Heading fontSize={16} fontWeight="500" py={5}>
            {plugin.name}
          </Heading>
          <Text fontSize={14}>{plugin.description}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export const PackCard: React.FC<{ pack: Pack }> = ({ pack }) => {
  return (
    <Center py={12} key={pack.id}>
      <Box
        role={"group"}
        p={3}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box display={{ base: "flex", md: "none" }} w="100%">
          <Heading
            w="100%"
            color="#222"
            opacity="1"
            fontSize="md"
            fontFamily={"body"}
            fontWeight="bold"
          >
            {pack.name}
          </Heading>
        </Box>
        <Box
          rounded={"lg"}
          mt={{base: 2, md: -12}}
          pos={"relative"}
          width={"full"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Flex
            w="full"
            justifyContent={"space-between"}
            position={"absolute"}
            m={"0"}
            p="1"
          >
            <Text color="white" opacity={0.7}>
              <Box display={"inline-block"}>
                <BsHash />
              </Box>
              {pack?.audio?.edges?.length}
            </Text>
            <Text
              color="white"
              opacity={0.7}
              fontSize={"sm"}
              textTransform={"uppercase"}
              mb={2}
            >
              ${pack.type === PacketType.Paid ? pack.price : "FREE"}
            </Text>
          </Flex>
          <VStack
            justifyContent={"center"}
            position="absolute"
            w="full"
            h="full"
          >
            <Box fontSize={{ base: "lg", md: "xl", lg: "3xl" }}>
              <FaPlay color="white" />
            </Box>
            <Heading
              display={{ base: "none", md: "block" }}
              color="white"
              opacity="0.8"
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              fontFamily={"body"}
              fontWeight={{ base: "200", md: "bold" }}
              textShadow="1px 1px rgba(0,0,0,0.5)"
            >
              {pack.name}
            </Heading>
          </VStack>
          <Image
            rounded={"lg"}
            height={"auto"}
            width={"full"}
            objectFit={"cover"}
            src={IMAGE}
          />
        </Box>
        <HStack pt={2} justifyContent={"space-between"} alignItems={"flex-end"}>
          <Box display={{ base: "none", md: "flex" }}>
            <TiUserOutline />
          </Box>
          <Box display={{ base: "none", md: "flex" }}>
            <Text p="0" m="0" fontWeight={"thin"} fontSize={"xs"}>
              {pack?.author?.name}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Center>
  );
};
